'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Activity, Zap, AlertTriangle, X, Menu } from 'lucide-react';
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
  const [isVisible, setIsVisible] = useState(false);
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
          <ul className="space-y-2">
            <AnimatePresence>
              {pathways.map((pathway) => {
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
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
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
          </div>
        </div>
      </aside>
    </>
  );
};

export default NeuralPathwaysSidebar;