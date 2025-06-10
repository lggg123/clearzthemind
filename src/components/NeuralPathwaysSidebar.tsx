'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Activity, Zap, AlertTriangle } from 'lucide-react';
import styles from './NeuralPathwaysSidebar.module.css';
import { NeuralNode, SynapticConnection, NeuralPathway } from '@/types';

interface Props {
  pathways: NeuralPathway[];
  activeNodes?: NeuralNode[];
  synapticConnections?: SynapticConnection[];
  currentEmotionalState?: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
}

const NeuralPathwaysSidebar: React.FC<Props> = ({ 
  pathways, 
  activeNodes = [],
  synapticConnections = [],
  currentEmotionalState = 'neutral',
  riskLevel = 'low'
}) => {
  const [animatingNodes, setAnimatingNodes] = useState<string[]>([]);
  const [synapticActivity, setSynapticActivity] = useState<{ [key: string]: number }>({});

  // Simulate neural activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Animate random nodes
      const randomNode = activeNodes[Math.floor(Math.random() * activeNodes.length)];
      if (randomNode) {
        setAnimatingNodes(prev => [...prev, randomNode.id]);
        setTimeout(() => {
          setAnimatingNodes(prev => prev.filter(id => id !== randomNode.id));
        }, 1000);
      }

      // Update synaptic activity
      synapticConnections.forEach(connection => {
        setSynapticActivity(prev => ({
          ...prev,
          [connection.id]: Math.random() * 100
        }));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [activeNodes, synapticConnections]);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-500 border-red-500';
      case 'high': return 'text-orange-500 border-orange-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      default: return 'text-green-500 border-green-500';
    }
  };

  const getNodeTypeIcon = (nodeType: string) => {
    switch (nodeType) {
      case 'emotion': return <Brain className="w-4 h-4" />;
      case 'memory': return <Activity className="w-4 h-4" />;
      case 'trigger': return <AlertTriangle className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
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

  // Helper function to find node labels for synaptic connections
  const getNodeLabel = (nodeId: string) => {
    const node = activeNodes.find(n => n.id === nodeId);
    return node ? node.label : 'Unknown';
  };

  return (
    <aside className={`${styles.sidebar} bg-gray-900/95 backdrop-blur-sm border-l border-gray-700`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <motion.h2 
          className={`${styles.animatedTitle} text-xl font-bold text-white flex items-center gap-2`}
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
        <ul className={`${styles.pathwayList} space-y-2`}>
          <AnimatePresence>
            {pathways.map((pathway) => {
              const isActive = isPathwayActive(pathway);
              const strength = getPathwayStrength(pathway);
              
              return (
                <motion.li 
                  key={pathway.id} 
                  className={`${styles.pathwayItem} bg-gray-800/50 rounded-lg p-3 border ${
                    isActive ? 'border-blue-500/50' : 'border-gray-700'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  layout
                >
                  <div className="flex items-center justify-between">
                    <span className={`${styles.pathwayLabel} text-sm font-medium text-white`}>
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
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      {/* Active Neural Nodes */}
      {activeNodes.length > 0 && (
        <div className="p-4 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Active Nodes</h3>
          <div className="space-y-2">
            <AnimatePresence>
              {activeNodes.map((node: NeuralNode) => (
                <motion.div
                  key={node.id}
                  className={`flex items-center gap-2 p-2 rounded-lg bg-gray-800/30 border ${
                    animatingNodes.includes(node.id) ? 'border-yellow-500/50' : 'border-gray-700/50'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: animatingNodes.includes(node.id) ? 1.05 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`${animatingNodes.includes(node.id) ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {getNodeTypeIcon(node.type)}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white">{node.label}</div>
                    <div className="text-xs text-gray-400">
                      Activation: {Math.round(node.activation_level * 100)}%
                    </div>
                  </div>
                  {animatingNodes.includes(node.id) && (
                    <motion.div
                      className="w-1 h-1 bg-yellow-400 rounded-full"
                      animate={{ 
                        scale: [1, 2, 1], 
                        opacity: [1, 0.3, 1] 
                      }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Synaptic Connections */}
      {synapticConnections.length > 0 && (
        <div className="p-4 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Synaptic Activity</h3>
          <div className="space-y-2">
            <AnimatePresence>
              {synapticConnections.map((connection: SynapticConnection) => (
                <motion.div
                  key={connection.id}
                  className="p-2 rounded-lg bg-gray-800/30 border border-gray-700/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-300">
                      {getNodeLabel(connection.source_node_id)} → {getNodeLabel(connection.target_node_id)}
                    </span>
                    <span className="text-purple-400 font-medium">
                      {Math.round(synapticActivity[connection.id] || 0)}%
                    </span>
                  </div>
                  <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${synapticActivity[connection.id] || 0}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Strength: {Math.round(connection.strength * 100)}% | Weight: {connection.weight.toFixed(2)} | Type: {connection.pathway_type}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Neural Network Visualization */}
      <div className="p-4 border-t border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Network Status</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-800/30 p-2 rounded">
            <div className="text-gray-400">Total Nodes</div>
            <div className="text-white font-bold">{activeNodes.length}</div>
          </div>
          <div className="bg-gray-800/30 p-2 rounded">
            <div className="text-gray-400">Connections</div>
            <div className="text-white font-bold">{synapticConnections.length}</div>
          </div>
          <div className="bg-gray-800/30 p-2 rounded">
            <div className="text-gray-400">Active Pathways</div>
            <div className="text-white font-bold">
              {pathways.filter(p => isPathwayActive(p)).length}
            </div>
          </div>
          <div className="bg-gray-800/30 p-2 rounded">
            <div className="text-gray-400">Network Load</div>
            <div className="text-white font-bold">
              {activeNodes.length > 0 
                ? Math.round(activeNodes.reduce((sum, node) => sum + (node.activation_level * 100), 0) / activeNodes.length) 
                : 0}%
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default NeuralPathwaysSidebar;