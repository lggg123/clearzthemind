'use client';
import { useState, useEffect } from 'react';
import { Brain, Activity, Zap, X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { NeuralPathway } from '@/types';
import styles from './NeuralPathwaysSidebar.module.css';

interface NeuralPathwaysSidebarProps {
  activeNodes?: any[];
  synapticConnections?: any[];
  currentEmotionalState?: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export default function NeuralPathwaysSidebar({ 
  activeNodes = [], 
  synapticConnections = [],
  currentEmotionalState = 'neutral',
  riskLevel = 'low'
}: NeuralPathwaysSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [pathways, setPathways] = useState<NeuralPathway[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pathways data
  useEffect(() => {
    const fetchPathways = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/neural-pathways');
        
        if (!response.ok) {
          throw new Error('Failed to fetch pathways');
        }
        
        const data = await response.json();
        setPathways(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching pathways:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setPathways([]); // Set empty array as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchPathways();
  }, []);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-500 border-red-500';
      case 'high': return 'text-orange-500 border-orange-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      default: return 'text-green-500 border-green-500';
    }
  };

  // Helper function to determine if a pathway is active
  const isPathwayActive = (pathway: NeuralPathway) => {
    return pathway.activation_frequency > 0;
  };

  // Helper function to get pathway strength as percentage
  const getPathwayStrength = (pathway: NeuralPathway) => {
    if (pathway.connections.length === 0) return 0;
    const avgStrength = pathway.connections.reduce((sum, conn) => sum + conn.strength, 0) / pathway.connections.length;
    return Math.round(avgStrength * 100);
  };

  // Helper function to get active synaptic connections count
  const getActiveSynapticCount = () => {
    return synapticConnections.filter(conn => conn.strength > 0.5).length;
  };

  // Helper function to get most active node
  const getMostActiveNode = () => {
    if (activeNodes.length === 0) return null;
    return activeNodes.reduce((max, node) => 
      node.activation_level > max.activation_level ? node : max
    );
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Toggle Button */}
      <button
        className={styles.sidebarToggle}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Neural Pathways Sidebar"
      >
        {isCollapsed ? <X className="w-6 h-6 text-gray-900" /> : <Brain className="w-6 h-6 text-gray-900" />}
      </button>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>
          <Brain className="w-5 h-5" />
          <span>Neural Pathways</span>
        </div>
      </div>

      {!isCollapsed && (
        <div className={styles.content}>
          {/* Current State Indicator */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-400">Emotional State:</span>
            <motion.span 
              className="text-sm font-medium text-blue-400 capitalize"
              key={currentEmotionalState}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {currentEmotionalState}
            </motion.span>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-400">Risk Level:</span>
            <motion.span 
              className={`text-sm font-medium capitalize ${getRiskLevelColor(riskLevel).split(' ')[0]}`}
              key={riskLevel}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {riskLevel}
            </motion.span>
          </div>

          {loading && (
            <div className="flex items-center justify-center p-4">
              <div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="p-4 text-red-400 text-sm">
              Error: {error}
            </div>
          )}

          {!loading && !error && pathways.length === 0 && (
            <div className="p-4 text-gray-400 text-sm">
              No neural pathways found
            </div>
          )}

          {!loading && !error && pathways.length > 0 && (
            <div className="space-y-3">
              {pathways.map((pathway) => {
                const isActive = isPathwayActive(pathway);
                const strength = getPathwayStrength(pathway);
                
                return (
                  <motion.div
                    key={pathway.id}
                    className={`bg-gray-800/50 rounded-lg p-3 border ${
                      isActive ? 'border-blue-500/50' : 'border-gray-700'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    layout
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        {pathway.name}
                      </span>
                      {isActive && (
                        <motion.div
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        />
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Strength: {strength}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Risk: {pathway.crisis_risk_level} | Emotion: {pathway.dominant_emotion}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Active Nodes Section */}
          {activeNodes.length > 0 && (
            <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-400/30">
              <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Active Nodes ({activeNodes.length})
              </h3>
              <div className="space-y-1 text-sm text-gray-300">
                {activeNodes.slice(0, 5).map((node, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>{node?.label || `Node ${index + 1}`}</span>
                  </div>
                ))}
                {activeNodes.length > 5 && (
                  <div className="text-gray-500 text-xs">
                    +{activeNodes.length - 5} more nodes
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Synaptic Connections Section */}
          {synapticConnections.length > 0 && (
            <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-400/30">
              <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Synaptic Activity ({synapticConnections.length})
              </h3>
              <div className="space-y-1 text-sm text-gray-300">
                {synapticConnections.slice(0, 3).map((connection, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span>
                      {connection?.source || 'Unknown'} → {connection?.target || 'Unknown'}
                    </span>
                  </div>
                ))}
                {synapticConnections.length > 3 && (
                  <div className="text-gray-500 text-xs">
                    +{synapticConnections.length - 3} more connections
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}