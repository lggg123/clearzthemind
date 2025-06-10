import { 
  createNeuralNode, 
  createSynapticConnection, 
  activatePathway, 
  updatePathwayStrength,
  createBrainNetworkSnapshot,
  NeuralPathwayEngine 
} from '../neural-pathways';
import { NeuralNode, SynapticConnection, NeuralPathway } from '@/types';

describe('Neural Pathways', () => {
  describe('createNeuralNode', () => {
    it('creates a neural node with correct properties', () => {
      const params = {
        type: 'emotion' as const,
        label: 'anxiety',
        position: { x: 10, y: 20, z: 30 }
      };

      const node = createNeuralNode(params);

      expect(node.id).toBeDefined();
      expect(node.type).toBe('emotion');
      expect(node.label).toBe('anxiety');
      expect(node.activation_level).toBe(0);
      expect(node.position).toEqual({ x: 10, y: 20, z: 30 });
      expect(node.created_at).toBeDefined();
      expect(node.last_activated).toBeDefined();
    });
  });

  describe('createSynapticConnection', () => {
    it('creates a synaptic connection with correct properties', () => {
      const sourceId = 'node-1';
      const targetId = 'node-2';
      const params = { strength: 0.5, weight: 0.8 };

      const connection = createSynapticConnection(sourceId, targetId, params);

      expect(connection.id).toBeDefined();
      expect(connection.source_node_id).toBe(sourceId);
      expect(connection.target_node_id).toBe(targetId);
      expect(connection.strength).toBe(0.5);
      expect(connection.weight).toBe(0.8);
      expect(connection.activation_count).toBe(0);
      expect(connection.pathway_type).toBe('strengthening');
      expect(connection.last_fired).toBeDefined();
    });

    it('determines pathway type based on weight', () => {
      const strengthening = createSynapticConnection('a', 'b', { strength: 0.5, weight: 0.4 });
      expect(strengthening.pathway_type).toBe('strengthening');

      const weakening = createSynapticConnection('a', 'b', { strength: 0.5, weight: -0.4 });
      expect(weakening.pathway_type).toBe('weakening');

      const neutral = createSynapticConnection('a', 'b', { strength: 0.5, weight: 0.1 });
      expect(neutral.pathway_type).toBe('neutral');
    });
  });

  describe('activatePathway', () => {
    it('activates pathway and increases node activation levels', () => {
      const nodes: NeuralNode[] = [
        createNeuralNode({ type: 'trigger', label: 'stress', position: { x: 0, y: 0 } }),
        createNeuralNode({ type: 'emotion', label: 'anxiety', position: { x: 1, y: 1 } })
      ];

      const connections: SynapticConnection[] = [
        createSynapticConnection(nodes[0].id, nodes[1].id, { strength: 0.5, weight: 0.3 })
      ];

      const pathway: NeuralPathway = {
        id: 'pathway-1',
        user_id: 'user-1',
        name: 'stress-anxiety',
        nodes,
        connections,
        dominant_emotion: 'neutral',
        crisis_risk_level: 'low',
        activation_frequency: 0,
        created_at: new Date().toISOString(),
        last_activated: new Date().toISOString()
      };

      const activation = activatePathway(pathway, 'message', 'feeling stressed');

      expect(activation.pathway_id).toBe('pathway-1');
      expect(activation.trigger_type).toBe('message');
      expect(activation.trigger_content).toBe('feeling stressed');
      expect(activation.nodes_fired).toHaveLength(2);
      expect(pathway.nodes[0].activation_level).toBe(0.1);
      expect(pathway.nodes[1].activation_level).toBe(0.1);
      expect(pathway.activation_frequency).toBe(1);
    });
  });

  describe('updatePathwayStrength', () => {
    it('updates connection strengths within bounds', () => {
      const connections: SynapticConnection[] = [
        createSynapticConnection('a', 'b', { strength: 0.5, weight: 0.3 }),
        createSynapticConnection('b', 'c', { strength: 0.8, weight: 0.3 })
      ];

      const pathway: NeuralPathway = {
        id: 'pathway-1',
        user_id: 'user-1',
        name: 'test-pathway',
        nodes: [],
        connections,
        dominant_emotion: 'neutral',
        crisis_risk_level: 'low',
        activation_frequency: 0,
        created_at: new Date().toISOString(),
        last_activated: new Date().toISOString()
      };

      updatePathwayStrength(pathway, 0.3);

      expect(pathway.connections[0].strength).toBe(0.8);
      expect(pathway.connections[1].strength).toBe(1.0); // Capped at 1.0
    });
  });

  describe('createBrainNetworkSnapshot', () => {
    it('creates a network snapshot with correct metrics', () => {
      const nodes: NeuralNode[] = [
        createNeuralNode({ type: 'emotion', label: 'happy', position: { x: 0, y: 0 } }),
        createNeuralNode({ type: 'trigger', label: 'success', position: { x: 1, y: 1 } })
      ];
      nodes[0].activation_level = 0.8;
      nodes[1].activation_level = 0.6;

      const connections: SynapticConnection[] = [
        createSynapticConnection(nodes[0].id, nodes[1].id, { strength: 0.7, weight: 0.5 })
      ];

      const pathways: NeuralPathway[] = [{
        id: 'pathway-1',
        user_id: 'user-1',
        name: 'positive-pathway',
        nodes,
        connections,
        dominant_emotion: 'happy',
        crisis_risk_level: 'low',
        activation_frequency: 5,
        created_at: new Date().toISOString(),
        last_activated: new Date().toISOString()
      }];

      const snapshot = createBrainNetworkSnapshot('user-1', nodes, connections, pathways);

      expect(snapshot.user_id).toBe('user-1');
      expect(snapshot.total_nodes).toBe(2);
      expect(snapshot.total_connections).toBe(1);
      expect(snapshot.active_pathways).toBe(1);
      expect(snapshot.average_activation).toBe(0.7);
      expect(snapshot.dominant_emotion).toBe('happy');
      expect(snapshot.crisis_indicators).toHaveLength(0);
    });
  });

  describe('NeuralPathwayEngine', () => {
    let engine: NeuralPathwayEngine;

    beforeEach(() => {
      engine = new NeuralPathwayEngine('test-user');
    });

    it('initializes with user ID', () => {
      expect(engine.getUserId()).toBe('test-user');
      expect(engine.getNodes()).toHaveLength(0);
      expect(engine.getConnections()).toHaveLength(0);
      expect(engine.getPathways()).toHaveLength(0);
    });

    it('adds nodes and connections', () => {
      const node1 = engine.addNode({
        type: 'trigger',
        label: 'stress',
        position: { x: 0, y: 0 }
      });

      const node2 = engine.addNode({
        type: 'emotion',
        label: 'anxiety',
        position: { x: 1, y: 1 }
      });

      const connection = engine.connectNodes(node1.id, node2.id, {
        strength: 0.6,
        weight: 0.4
      });

      expect(engine.getNodes()).toHaveLength(2);
      expect(engine.getConnections()).toHaveLength(1);
      expect(connection.source_node_id).toBe(node1.id);
      expect(connection.target_node_id).toBe(node2.id);
    });

    it('creates pathways from nodes', () => {
      const node1 = engine.addNode({
        type: 'trigger',
        label: 'stress',
        position: { x: 0, y: 0 }
      });

      const node2 = engine.addNode({
        type: 'emotion',
        label: 'anxiety',
        position: { x: 1, y: 1 }
      });

      engine.connectNodes(node1.id, node2.id, { strength: 0.6, weight: 0.4 });

      const pathway = engine.createPathway('stress-anxiety', [node1, node2]);

      expect(engine.getPathways()).toHaveLength(1);
      expect(pathway.name).toBe('stress-anxiety');
      expect(pathway.nodes).toHaveLength(2);
      expect(pathway.connections).toHaveLength(1);
    });

    it('assesses crisis risk correctly', () => {
      // Add safe nodes first
      const safeNode = engine.addNode({
        type: 'emotion',
        label: 'calm',
        position: { x: 0, y: 0 }
      });

      let risk = engine.assessCrisisRisk();
      expect(risk).toBe('low');

      // Add harmful nodes
      const harmfulNode = engine.addNode({
        type: 'trigger',
        label: 'self-harm',
        position: { x: 1, y: 1 }
      });

      engine.connectNodes(safeNode.id, harmfulNode.id, { strength: 0.9, weight: 0.8 });
      engine.createPathway('harmful-pathway', [safeNode, harmfulNode]);

      risk = engine.assessCrisisRisk();
      expect(risk).toBeOneOf(['medium', 'high', 'critical']);
    });

    it('creates network snapshots', () => {
      const node = engine.addNode({
        type: 'emotion',
        label: 'happy',
        position: { x: 0, y: 0 }
      });

      const snapshot = engine.createNetworkSnapshot();

      expect(snapshot.user_id).toBe('test-user');
      expect(snapshot.total_nodes).toBe(1);
      expect(snapshot.total_connections).toBe(0);
    });

    it('calculates neural plasticity', () => {
      // Add diverse nodes
      engine.addNode({ type: 'emotion', label: 'happy', position: { x: 0, y: 0 } });
      engine.addNode({ type: 'emotion', label: 'sad', position: { x: 1, y: 1 } });
      engine.addNode({ type: 'response', label: 'coping', position: { x: 2, y: 2 } });
      engine.addNode({ type: 'response', label: 'breathing', position: { x: 3, y: 3 } });

      const plasticity = engine.calculateNeuralPlasticity();
      expect(plasticity).toBeGreaterThanOrEqual(0);
      expect(plasticity).toBeLessThanOrEqual(1);
    });

    it('suggests healthy pathways for negative patterns', () => {
      // Create a negative pathway
      const triggerNode = engine.addNode({
        type: 'trigger',
        label: 'self-harm',
        position: { x: 0, y: 0 }
      });

      const emotionNode = engine.addNode({
        type: 'emotion',
        label: 'hopelessness',
        position: { x: 1, y: 1 }
      });

      engine.connectNodes(triggerNode.id, emotionNode.id, { strength: 0.9, weight: 0.8 });
      engine.createPathway('negative-pathway', [triggerNode, emotionNode]);

      const suggestions = engine.suggestHealthyPathways();
      expect(suggestions).toHaveLength(2);
      expect(suggestions[0].suggested_nodes).toBeDefined();
      expect(suggestions[0].rationale).toContain('coping');
    });
  });
});