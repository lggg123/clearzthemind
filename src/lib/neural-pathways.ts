import { NeuralNode, SynapticConnection, NeuralPathway, PathwayActivation, BrainNetworkSnapshot } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export function createNeuralNode(params: {
  type: NeuralNode['type'];
  label: string;
  position: { x: number; y: number; z?: number };
}): NeuralNode {
  const now = new Date().toISOString();
  
  return {
    id: uuidv4(),
    type: params.type,
    label: params.label,
    activation_level: 0,
    position: params.position,
    created_at: now,
    last_activated: now
  };
}

export function createSynapticConnection(
  sourceNodeId: string,
  targetNodeId: string,
  params: {
    strength: number;
    weight: number;
  }
): SynapticConnection {
  const now = new Date().toISOString();
  
  // Determine pathway type based on weight
  let pathwayType: 'strengthening' | 'weakening' | 'neutral';
  if (params.weight > 0.3) {
    pathwayType = 'strengthening';
  } else if (params.weight < -0.3) {
    pathwayType = 'weakening';
  } else {
    pathwayType = 'neutral';
  }

  return {
    id: uuidv4(),
    source_node_id: sourceNodeId,
    target_node_id: targetNodeId,
    strength: params.strength,
    weight: params.weight,
    activation_count: 0,
    last_fired: now,
    pathway_type: pathwayType
  };
}

export function activatePathway(
  pathway: NeuralPathway,
  triggerType: 'message' | 'mood_entry' | 'external_event',
  triggerContent: string
): PathwayActivation {
  const now = new Date().toISOString();
  const firedNodes: string[] = [];
  const strengthChanges: Array<{
    connection_id: string;
    old_strength: number;
    new_strength: number;
  }> = [];

  // Fire nodes in sequence
  pathway.nodes.forEach(node => {
    // Increase activation level
    const oldActivation = node.activation_level;
    node.activation_level = Math.min(1, node.activation_level + 0.1);
    node.last_activated = now;
    firedNodes.push(node.id);
  });

  // Strengthen connections through Hebbian learning
  pathway.connections.forEach(connection => {
    const oldStrength = connection.strength;
    // Strengthen connections that fire together
    const strengthIncrease = 0.05 * connection.weight;
    connection.strength = Math.min(1, Math.max(0, connection.strength + strengthIncrease));
    connection.activation_count += 1;
    connection.last_fired = now;

    if (oldStrength !== connection.strength) {
      strengthChanges.push({
        connection_id: connection.id,
        old_strength: oldStrength,
        new_strength: connection.strength
      });
    }
  });

  // Update pathway metadata
  pathway.last_activated = now;
  pathway.activation_frequency += 1;

  return {
    id: uuidv4(),
    pathway_id: pathway.id,
    trigger_type: triggerType,
    trigger_content: triggerContent,
    nodes_fired: firedNodes,
    strength_changes: strengthChanges,
    created_at: now
  };
}

export function updatePathwayStrength(pathway: NeuralPathway, strengthDelta: number): void {
  pathway.connections.forEach(connection => {
    connection.strength = Math.min(1, Math.max(0, connection.strength + strengthDelta));
  });
}

export class NeuralPathwayEngine {
  private userId: string;
  private nodes: Map<string, NeuralNode> = new Map();
  private connections: Map<string, SynapticConnection> = new Map();
  private pathways: Map<string, NeuralPathway> = new Map();

  constructor(userId: string) {
    this.userId = userId;
  }

  getUserId(): string {
    return this.userId;
  }

  getNodes(): NeuralNode[] {
    return Array.from(this.nodes.values());
  }

  getConnections(): SynapticConnection[] {
    return Array.from(this.connections.values());
  }

  getPathways(): NeuralPathway[] {
    return Array.from(this.pathways.values());
  }

  addNode(params: {
    type: NeuralNode['type'];
    label: string;
    position: { x: number; y: number; z?: number };
  }): NeuralNode {
    const node = createNeuralNode(params);
    this.nodes.set(node.id, node);
    return node;
  }

  connectNodes(
    sourceNodeId: string,
    targetNodeId: string,
    params: { strength: number; weight: number }
  ): SynapticConnection {
    const connection = createSynapticConnection(sourceNodeId, targetNodeId, params);
    this.connections.set(connection.id, connection);
    return connection;
  }

  createPathway(name: string, nodes: NeuralNode[]): NeuralPathway {
    const now = new Date().toISOString();
    const pathwayConnections = Array.from(this.connections.values()).filter(
      conn => nodes.some(n => n.id === conn.source_node_id) && 
               nodes.some(n => n.id === conn.target_node_id)
    );

    const pathway: NeuralPathway = {
      id: uuidv4(),
      user_id: this.userId,
      name,
      nodes: [...nodes],
      connections: pathwayConnections,
      dominant_emotion: this.calculateDominantEmotion(nodes),
      crisis_risk_level: this.calculateCrisisRisk(nodes, pathwayConnections),
      activation_frequency: 0,
      created_at: now,
      last_activated: now
    };

    this.pathways.set(pathway.id, pathway);
    return pathway;
  }

  assessCrisisRisk(): 'low' | 'medium' | 'high' | 'critical' {
    const pathways = this.getPathways();
    let highRiskCount = 0;
    let criticalRiskCount = 0;

    pathways.forEach(pathway => {
      const hasHarmfulNodes = pathway.nodes.some(node => 
        node.label.includes('self-harm') || 
        node.label.includes('suicide') ||
        node.label.includes('hopelessness') ||
        node.label.includes('worthless')
      );

      if (hasHarmfulNodes) {
        const averageStrength = pathway.connections.reduce((sum, conn) => sum + conn.strength, 0) / pathway.connections.length;
        
        if (averageStrength > 0.8 && pathway.activation_frequency > 3) {
          criticalRiskCount++;
        } else if (averageStrength > 0.6) {
          highRiskCount++;
        }
      }
    });

    if (criticalRiskCount > 0) return 'critical';
    if (highRiskCount > 2) return 'high';
    if (highRiskCount > 0) return 'medium';
    return 'low';
  }

  getProtectivePathways(): NeuralPathway[] {
    return this.getPathways().filter(pathway => {
      const hasPositiveNodes = pathway.nodes.some(node =>
        node.label.includes('coping') ||
        node.label.includes('breathing') ||
        node.label.includes('calm') ||
        node.label.includes('support') ||
        node.label.includes('help')
      );

      return hasPositiveNodes && pathway.activation_frequency > 0;
    });
  }

  calculateNeuralPlasticity(): number {
    const totalPathways = this.getPathways().length;
    if (totalPathways === 0) return 0;

    // Measure diversity of emotional pathways
    const emotionTypes = new Set();
    const responseTypes = new Set();

    this.getPathways().forEach(pathway => {
      pathway.nodes.forEach(node => {
        if (node.type === 'emotion') {
          emotionTypes.add(node.label);
        } else if (node.type === 'response') {
          responseTypes.add(node.label);
        }
      });
    });

    // Plasticity score based on diversity and balanced activation
    const diversityScore = (emotionTypes.size + responseTypes.size) / (totalPathways * 2);
    const balanceScore = this.calculateActivationBalance();
    
    return Math.min(1, (diversityScore + balanceScore) / 2);
  }

  suggestHealthyPathways(): Array<{
    suggested_nodes: Array<{ type: string; label: string }>;
    rationale: string;
  }> {
    const suggestions = [];
    
    // Analyze current negative patterns
    const negativePathways = this.getPathways().filter(pathway =>
      pathway.crisis_risk_level === 'high' || pathway.crisis_risk_level === 'critical'
    );

    if (negativePathways.length > 0) {
      suggestions.push({
        suggested_nodes: [
          { type: 'trigger', label: 'stress recognition' },
          { type: 'response', label: 'deep breathing' },
          { type: 'emotion', label: 'calm' }
        ],
        rationale: 'Creating healthy coping pathways to counter stress responses'
      });

      suggestions.push({
        suggested_nodes: [
          { type: 'trigger', label: 'negative thought' },
          { type: 'response', label: 'thought challenging' },
          { type: 'emotion', label: 'balanced perspective' }
        ],
        rationale: 'Developing cognitive restructuring pathways for better thought patterns'
      });
    }

    return suggestions;
  }

  private calculateDominantEmotion(nodes: NeuralNode[]): string {
    const emotionNodes = nodes.filter(node => node.type === 'emotion');
    if (emotionNodes.length === 0) return 'neutral';
    
    // Return the emotion with highest activation
    const dominantEmotion = emotionNodes.reduce((prev, current) =>
      current.activation_level > prev.activation_level ? current : prev
    );
    
    return dominantEmotion.label;
  }

  private calculateCrisisRisk(nodes: NeuralNode[], connections: SynapticConnection[]): 'low' | 'medium' | 'high' | 'critical' {
    const hasHarmfulContent = nodes.some(node =>
      node.label.includes('self-harm') ||
      node.label.includes('suicide') ||
      node.label.includes('hopelessness')
    );

    if (!hasHarmfulContent) return 'low';

    const averageStrength = connections.length > 0 
      ? connections.reduce((sum, conn) => sum + conn.strength, 0) / connections.length
      : 0;

    if (averageStrength > 0.8) return 'critical';
    if (averageStrength > 0.6) return 'high';
    return 'medium';
  }

  private calculateActivationBalance(): number {
    const pathways = this.getPathways();
    if (pathways.length === 0) return 0;

    const activationVariance = this.calculateVariance(
      pathways.map(p => p.activation_frequency)
    );
    
    // Lower variance = better balance
    return Math.max(0, 1 - (activationVariance / 10));
  }

  private calculateVariance(values: number[]): number {
    if (values.length === 0) return 0;
    
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDifferences = values.map(val => Math.pow(val - mean, 2));
    return squaredDifferences.reduce((sum, val) => sum + val, 0) / values.length;
  }
}
