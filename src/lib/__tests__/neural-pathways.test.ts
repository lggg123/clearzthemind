import { 
  NeuralPathwayEngine, 
  createNeuralNode, 
  createSynapticConnection,
  activatePathway,
  updatePathwayStrength 
} from '../neural-pathways';
import { NeuralNode, SynapticConnection, NeuralPathway } from '@/types';

describe('Neural Pathway Engine', () => {
  let engine: NeuralPathwayEngine;
  
  beforeEach(() => {
    engine = new NeuralPathwayEngine('test-user-id');
  });

  describe('createNeuralNode', () => {
    it('should create a new neural node with correct properties', () => {
      const node = createNeuralNode({
        type: 'emotion',
        label: 'anxiety',
        position: { x: 0, y: 0 }
      });

      expect(node).toHaveProperty('id');
      expect(node.type).toBe('emotion');
      expect(node.label).toBe('anxiety');
      expect(node.activation_level).toBe(0);
      expect(node.position).toEqual({ x: 0, y: 0 });
      expect(node).toHaveProperty('created_at');
      expect(node).toHaveProperty('last_activated');
    });

    it('should create nodes with unique IDs', () => {
      const node1 = createNeuralNode({ type: 'emotion', label: 'joy', position: { x: 0, y: 0 } });
      const node2 = createNeuralNode({ type: 'emotion', label: 'sadness', position: { x: 1, y: 1 } });
      
      expect(node1.id).not.toBe(node2.id);
    });
  });

  describe('createSynapticConnection', () => {
    it('should create a connection between two nodes', () => {
      const sourceNode = createNeuralNode({ type: 'trigger', label: 'work stress', position: { x: 0, y: 0 } });
      const targetNode = createNeuralNode({ type: 'emotion', label: 'anxiety', position: { x: 1, y: 0 } });
      
      const connection = createSynapticConnection(sourceNode.id, targetNode.id, {
        strength: 0.8,
        weight: 1
      });

      expect(connection).toHaveProperty('id');
      expect(connection.source_node_id).toBe(sourceNode.id);
      expect(connection.target_node_id).toBe(targetNode.id);
      expect(connection.strength).toBe(0.8);
      expect(connection.weight).toBe(1);
      expect(connection.activation_count).toBe(0);
      expect(connection.pathway_type).toBe('strengthening');
    });

    it('should set pathway_type based on weight', () => {
      const sourceNode = createNeuralNode({ type: 'memory', label: 'positive memory', position: { x: 0, y: 0 } });
      const targetNode = createNeuralNode({ type: 'emotion', label: 'happiness', position: { x: 1, y: 0 } });
      
      const positiveConnection = createSynapticConnection(sourceNode.id, targetNode.id, {
        strength: 0.5,
        weight: 0.8
      });
      
      const negativeConnection = createSynapticConnection(sourceNode.id, targetNode.id, {
        strength: 0.5,
        weight: -0.6
      });

      expect(positiveConnection.pathway_type).toBe('strengthening');
      expect(negativeConnection.pathway_type).toBe('weakening');
    });
  });

  describe('Neural Pathway Engine', () => {
    it('should initialize with empty pathways', () => {
      expect(engine.getPathways()).toHaveLength(0);
      expect(engine.getUserId()).toBe('test-user-id');
    });

    it('should add nodes to the network', () => {
      const node = engine.addNode({
        type: 'emotion',
        label: 'fear',
        position: { x: 0, y: 0 }
      });

      expect(engine.getNodes()).toContain(node);
      expect(engine.getNodes()).toHaveLength(1);
    });

    it('should create connections between nodes', () => {
      const triggerNode = engine.addNode({
        type: 'trigger',
        label: 'social situation',
        position: { x: 0, y: 0 }
      });
      
      const emotionNode = engine.addNode({
        type: 'emotion',
        label: 'social anxiety',
        position: { x: 1, y: 0 }
      });

      const connection = engine.connectNodes(triggerNode.id, emotionNode.id, {
        strength: 0.7,
        weight: 0.9
      });

      expect(engine.getConnections()).toContain(connection);
      expect(connection.source_node_id).toBe(triggerNode.id);
      expect(connection.target_node_id).toBe(emotionNode.id);
    });
  });

  describe('activatePathway', () => {
    it('should activate a pathway and increase connection strengths', () => {
      const triggerNode = engine.addNode({
        type: 'trigger',
        label: 'deadline pressure',
        position: { x: 0, y: 0 }
      });
      
      const emotionNode = engine.addNode({
        type: 'emotion',
        label: 'stress',
        position: { x: 1, y: 0 }
      });
      
      const responseNode = engine.addNode({
        type: 'response',
        label: 'procrastination',
        position: { x: 2, y: 0 }
      });

      const connection1 = engine.connectNodes(triggerNode.id, emotionNode.id, {
        strength: 0.5,
        weight: 0.8
      });
      
      const connection2 = engine.connectNodes(emotionNode.id, responseNode.id, {
        strength: 0.4,
        weight: 0.7
      });

      const pathway = engine.createPathway('stress-procrastination', [triggerNode, emotionNode, responseNode]);
      
      const activation = activatePathway(pathway, 'message', 'I have so much work to do');

      expect(activation.pathway_id).toBe(pathway.id);
      expect(activation.trigger_type).toBe('message');
      expect(activation.nodes_fired).toContain(triggerNode.id);
      expect(activation.nodes_fired).toContain(emotionNode.id);
      expect(activation.strength_changes).toHaveLength(2);
    });

    it('should increase activation levels of fired nodes', () => {
      const emotionNode = engine.addNode({
        type: 'emotion',
        label: 'anxiety',
        position: { x: 0, y: 0 }
      });

      const pathway = engine.createPathway('anxiety-spiral', [emotionNode]);
      const initialActivation = emotionNode.activation_level;

      activatePathway(pathway, 'mood_entry', 'Feeling anxious today');

      expect(emotionNode.activation_level).toBeGreaterThan(initialActivation);
    });
  });

  describe('Crisis Detection through Neural Networks', () => {
    it('should detect crisis patterns in neural pathways', () => {
      // Create a crisis-prone pathway
      const triggerNode = engine.addNode({
        type: 'trigger',
        label: 'rejection',
        position: { x: 0, y: 0 }
      });
      
      const emotionNode = engine.addNode({
        type: 'emotion',
        label: 'hopelessness',
        position: { x: 1, y: 0 }
      });
      
      const responseNode = engine.addNode({
        type: 'response',
        label: 'self-harm ideation',
        position: { x: 2, y: 0 }
      });

      engine.connectNodes(triggerNode.id, emotionNode.id, { strength: 0.9, weight: 1.0 });
      engine.connectNodes(emotionNode.id, responseNode.id, { strength: 0.8, weight: 1.0 });

      const pathway = engine.createPathway('crisis-pathway', [triggerNode, emotionNode, responseNode]);
      
      // Activate the pathway multiple times to strengthen it
      for (let i = 0; i < 5; i++) {
        activatePathway(pathway, 'message', 'Nobody cares about me');
      }

      const riskLevel = engine.assessCrisisRisk();
      expect(riskLevel).toBe('critical');
    });

    it('should identify protective pathways that reduce crisis risk', () => {
      const triggerNode = engine.addNode({
        type: 'trigger',
        label: 'negative thought',
        position: { x: 0, y: 0 }
      });
      
      const copingNode = engine.addNode({
        type: 'response',
        label: 'breathing exercise',
        position: { x: 1, y: 0 }
      });
      
      const emotionNode = engine.addNode({
        type: 'emotion',
        label: 'calm',
        position: { x: 2, y: 0 }
      });

      // Create a protective pathway
      engine.connectNodes(triggerNode.id, copingNode.id, { strength: 0.7, weight: 0.8 });
      engine.connectNodes(copingNode.id, emotionNode.id, { strength: 0.8, weight: 0.9 });

      const protectivePathway = engine.createPathway('coping-pathway', [triggerNode, copingNode, emotionNode]);
      
      // Strengthen the protective pathway
      for (let i = 0; i < 3; i++) {
        activatePathway(protectivePathway, 'mood_entry', 'Using coping strategies');
      }

      const protectivePathways = engine.getProtectivePathways();
      expect(protectivePathways).toContain(protectivePathway);
      expect(protectivePathways).toHaveLength(1);
    });
  });

  describe('Neural Plasticity', () => {
    it('should calculate neural plasticity score based on pathway diversity', () => {
      // Create diverse pathways
      const emotions = ['joy', 'sadness', 'anger', 'fear', 'surprise'];
      emotions.forEach((emotion, index) => {
        const emotionNode = engine.addNode({
          type: 'emotion',
          label: emotion,
          position: { x: index, y: 0 }
        });
        engine.createPathway(`${emotion}-pathway`, [emotionNode]);
      });

      const plasticityScore = engine.calculateNeuralPlasticity();
      expect(plasticityScore).toBeGreaterThan(0.5); // Good diversity
    });

    it('should suggest new pathway formations for better mental health', () => {
      // Create a problematic pathway
      const stressNode = engine.addNode({
        type: 'trigger',
        label: 'work stress',
        position: { x: 0, y: 0 }
      });
      
      const anxietyNode = engine.addNode({
        type: 'emotion',
        label: 'anxiety',
        position: { x: 1, y: 0 }
      });

      engine.connectNodes(stressNode.id, anxietyNode.id, { strength: 0.9, weight: 1.0 });
      engine.createPathway('stress-anxiety', [stressNode, anxietyNode]);

      const suggestions = engine.suggestHealthyPathways();
      
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions[0]).toHaveProperty('suggested_nodes');
      expect(suggestions[0]).toHaveProperty('rationale');
      expect(suggestions[0].rationale).toContain('healthy coping');
    });
  });
});
