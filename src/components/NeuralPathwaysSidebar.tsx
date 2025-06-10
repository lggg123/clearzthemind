'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, X } from 'lucide-react';
import styles from './NeuralPathwaysSidebar.module.css';
import { NeuralNode, SynapticConnection, NeuralPathway } from '@/types';

interface Props {
  activeNodes?: NeuralNode[];
  synapticConnections?: SynapticConnection[];
  currentEmotionalState?: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
}

const NeuralPathwaysSidebar: React.FC<Props> = ({ 
  activeNodes = [],
  synapticConnections = [],
  currentEmotionalState = 'neutral',
  riskLevel = 'low'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pathways, setPathways] = useState<NeuralPathway[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pathways data client-side
  useEffect(() => {
    const fetchPathways = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/neural-pathways');
        if (!response.ok) {
          throw new Error('Failed to fetch neural pathways');
        }
        const data = await response.json();
        setPathways(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching pathways:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setPathways([]); // Fallback to empty array
      } finally {
        setIsLoading(false);
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
    <>
      {/* Toggle Button */}
      <button
        className={styles.sidebarToggle}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Toggle Neural Pathways Sidebar"
      >
        {isVisible ? <X className="w-6 h-6 text-gray-900" /> : <Brain className="w-6 h-6 text-gray-900" />}
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isVisible ? styles.visible : ''}`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <motion.h2 
            className="text-xl font-bold text-white flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Brain className="w-6 h-6 text-blue-400" />
            Neural Pathways
          </motion.h2>
          
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
        </div>

        {/* Active Pathways */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Active Pathways</h3>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              <span className="ml-2 text-sm text-gray-400">Loading pathways...</span>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <div className="text-sm text-red-400 mb-2">⚠️ Unable to load pathways</div>
              <div className="text-xs text-gray-500">{error}</div>
            </div>
          ) : (
            <ul className="space-y-2">
              <AnimatePresence>
                {pathways.length > 0 ? pathways.map((pathway) => {
                  const isActive = isPathwayActive(pathway);
                  const strength = getPathwayStrength(pathway);
                  
                  return (
                    <motion.li 
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
                  </motion.li>                  );
                }) : (
                  <li className="text-center py-4 text-gray-500 text-sm">
                    No pathways available
                  </li>
                )}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {/* Network Status */}
        <div className="p-4 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Network Status</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-800/30 p-2 rounded">
              <div className="text-gray-400">Total Pathways</div>
              <div className="text-white font-bold">{pathways.length}</div>
            </div>
            <div className="bg-gray-800/30 p-2 rounded">
              <div className="text-gray-400">Active</div>
              <div className="text-white font-bold">
                {pathways.filter(p => isPathwayActive(p)).length}
              </div>
            </div>
            <div className="bg-gray-800/30 p-2 rounded">
              <div className="text-gray-400">Active Nodes</div>
              <div className="text-white font-bold">{activeNodes.length}</div>
            </div>
            <div className="bg-gray-800/30 p-2 rounded">
              <div className="text-gray-400">Synaptic Links</div>
              <div className="text-white font-bold">{getActiveSynapticCount()}</div>
            </div>
          </div>
        </div>

        {/* Active Neural Nodes */}
        {activeNodes.length > 0 && (
          <div className="p-4 border-t border-gray-700">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Active Neural Nodes</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {activeNodes.slice(0, 5).map((node) => (
                <motion.div
                  key={node.id}
                  className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded p-2 border border-purple-500/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-purple-300">{node.type}</span>
                    <div className="flex items-center gap-1">
                      <motion.div
                        className="w-1.5 h-1.5 bg-purple-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1], 
                          opacity: [0.5, 1, 0.5] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1 + (node.activation_level * 0.5) 
                        }}
                      />
                      <span className="text-xs text-purple-200">
                        {Math.round(node.activation_level * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Position: ({node.position.x.toFixed(1)}, {node.position.y.toFixed(1)})
                  </div>
                </motion.div>
              ))}
              {activeNodes.length > 5 && (
                <div className="text-xs text-gray-500 text-center">
                  +{activeNodes.length - 5} more nodes
                </div>
              )}
            </div>
            
            {/* Most Active Node Highlight */}
            {getMostActiveNode() && (
              <div className="mt-3 p-2 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded border border-yellow-500/30">
                <div className="text-xs font-semibold text-yellow-300 mb-1">Most Active Node</div>
                <div className="text-xs text-yellow-200">
                  {getMostActiveNode()?.type} ({Math.round((getMostActiveNode()?.activation_level || 0) * 100)}%)
                </div>
              </div>
            )}
          </div>
        )}

        {/* Synaptic Connections */}
        {synapticConnections.length > 0 && (
          <div className="p-4 border-t border-gray-700">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Synaptic Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Total Connections:</span>
                <span className="text-white font-medium">{synapticConnections.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Strong Links ({'>'}50%):</span>
                <span className="text-green-400 font-medium">{getActiveSynapticCount()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Avg Strength:</span>
                <span className="text-blue-400 font-medium">
                  {synapticConnections.length > 0 
                    ? Math.round((synapticConnections.reduce((sum, conn) => sum + conn.strength, 0) / synapticConnections.length) * 100)
                    : 0}%
                </span>
              </div>
              
              {/* Connection Strength Visualization */}
              <div className="mt-3">
                <div className="text-xs text-gray-400 mb-2">Connection Strength Distribution</div>
                <div className="flex gap-1 h-2">
                  {Array.from({ length: 10 }, (_, i) => {
                    const threshold = (i + 1) / 10;
                    const count = synapticConnections.filter(conn => 
                      conn.strength >= threshold - 0.1 && conn.strength < threshold
                    ).length;
                    const height = count > 0 ? Math.max(count / synapticConnections.length * 100, 10) : 0;
                    
                    return (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-sm"
                        style={{ height: `${height}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default NeuralPathwaysSidebar;