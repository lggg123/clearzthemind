export interface Profile {
    id: string;
    email: string;
    full_name: string;
    risk_level: 'low' | 'medium' | 'high' | 'critical';
    created_at: string;
    updated_at: string;
}

export interface MoodEntry {
    id: string;
    user_id: string;
    mood_score: number;
    emotions: string[];
    notes: string;
    created_at: string;
}

export interface Message {
    id: string;
    user_id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    crisis_indicators: string[];
    sentiment_score: number;
    created_at: string;
}

export interface CrisisEvent {
    id: string;
    user_id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    indicators: string[];
    intervention_type: string;
    resolved: boolean;
    created_at: string;
    resolved_at?: string;
}

export interface NeuralNode {
    id: string;
    type: 'emotion' | 'memory' | 'trigger' | 'response' | 'pattern';
    label: string;
    activation_level: number; // 0-1 scale
    position: { x: number; y: number; z?: number };
    created_at: string;
    last_activated: string;
}

export interface SynapticConnection {
    id: string;
    source_node_id: string;
    target_node_id: string;
    strength: number; // 0-1 scale, how strong the connection is
    weight: number; // -1 to 1, positive or negative influence
    activation_count: number;
    last_fired: string;
    pathway_type: 'strengthening' | 'weakening' | 'neutral';
}

export type NeuralPathway = {
  crisis_risk_level: 'low' | 'medium' | 'high' | 'critical';
  activation_frequency: number;
  id: string;
  user_id: string;
  nodes: NeuralNode[];
  connections: SynapticConnection[];
  dominant_emotion: string;
  created_at: string;
  updated_at: string;
  last_activated: string;
  name: string;
  label: string;
  visual_color?: string;
  activity_level?: number;
  tags?: string[];
  description?: string;
  is_active?: boolean;
};

export interface BrainNetworkSnapshot {
    id: string;
    user_id: string;
    timestamp: string;
    total_nodes: number;
    total_connections: number;
    active_pathways: number;
    network_density: number;
    average_activation: number;
    average_connection_strength: number;
    dominant_emotion: string;
    crisis_risk_level: 'low' | 'medium' | 'high' | 'critical';
    crisis_indicators: string[];
    plasticity_score: number;
    created_at: string;
}

export interface PathwayActivation {
    id: string;
    pathway_id: string;
    trigger_type: 'message' | 'mood_entry' | 'external_event';
    trigger_content: string;
    nodes_fired: string[];
    strength_changes: Array<{
        connection_id: string;
        old_strength: number;
        new_strength: number;
    }>;
    created_at: string;
}