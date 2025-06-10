'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Heart, AlertTriangle, Activity } from 'lucide-react';

interface NeuralNode {
  id: string;
  x: number;
  y: number;
  type: 'emotion' | 'memory' | 'trigger' | 'response';
  label: string;
  activation: number;
  size: number;
}

interface NeuralConnection {
  from: string;
  to: string;
  strength: number;
  active: boolean;
}

export default function NeuralPathwayVisualization() {
  const [nodes, setNodes] = useState<NeuralNode[]>([]);
  const [connections, setConnections] = useState<NeuralConnection[]>([]);
  const [activePathway, setActivePathway] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Initialize neural network
    const initialNodes: NeuralNode[] = [
      { id: 'stress', x: 100, y: 150, type: 'trigger', label: 'Stress', activation: 0, size: 20 },
      { id: 'anxiety', x: 250, y: 100, type: 'emotion', label: 'Anxiety', activation: 0, size: 25 },
      { id: 'fear', x: 250, y: 200, type: 'emotion', label: 'Fear', activation: 0, size: 22 },
      { id: 'breathing', x: 400, y: 50, type: 'response', label: 'Deep Breathing', activation: 0, size: 18 },
      { id: 'overthinking', x: 400, y: 150, type: 'response', label: 'Overthinking', activation: 0, size: 24 },
      { id: 'isolation', x: 400, y: 250, type: 'response', label: 'Social Isolation', activation: 0, size: 20 },
      { id: 'calm', x: 550, y: 50, type: 'emotion', label: 'Calm', activation: 0, size: 22 },
      { id: 'memory_failure', x: 100, y: 300, type: 'memory', label: 'Past Failures', activation: 0, size: 19 },
    ];

    const initialConnections: NeuralConnection[] = [
      { from: 'stress', to: 'anxiety', strength: 0.8, active: false },
      { from: 'stress', to: 'fear', strength: 0.6, active: false },
      { from: 'anxiety', to: 'breathing', strength: 0.3, active: false },
      { from: 'anxiety', to: 'overthinking', strength: 0.9, active: false },
      { from: 'fear', to: 'isolation', strength: 0.7, active: false },
      { from: 'breathing', to: 'calm', strength: 0.8, active: false },
      { from: 'memory_failure', to: 'anxiety', strength: 0.5, active: false },
      { from: 'memory_failure', to: 'fear', strength: 0.4, active: false },
    ];

    setNodes(initialNodes);
    setConnections(initialConnections);
  }, []);

  useEffect(() => {
    // Draw neural network on canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    connections.forEach(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        
        if (conn.active) {
          ctx.strokeStyle = `rgba(59, 130, 246, ${conn.strength})`;
          ctx.lineWidth = Math.max(2, conn.strength * 4);
        } else {
          ctx.strokeStyle = `rgba(75, 85, 99, ${conn.strength * 0.3})`;
          ctx.lineWidth = 1;
        }
        
        ctx.stroke();

        // Draw arrow heads for active connections
        if (conn.active) {
          const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
          const headlen = 10;
          
          ctx.beginPath();
          ctx.moveTo(toNode.x, toNode.y);
          ctx.lineTo(
            toNode.x - headlen * Math.cos(angle - Math.PI / 6),
            toNode.y - headlen * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(toNode.x, toNode.y);
          ctx.lineTo(
            toNode.x - headlen * Math.cos(angle + Math.PI / 6),
            toNode.y - headlen * Math.sin(angle + Math.PI / 6)
          );
          ctx.stroke();
        }
      }
    });
  }, [nodes, connections]);

  const activatePathway = (pathwayName: string) => {
    setActivePathway(pathwayName);
    
    let nodesToActivate: string[] = [];
    let connectionsToActivate: string[] = [];

    switch (pathwayName) {
      case 'stress-anxiety':
        nodesToActivate = ['stress', 'anxiety', 'overthinking'];
        connectionsToActivate = ['stress->anxiety', 'anxiety->overthinking'];
        break;
      case 'stress-fear':
        nodesToActivate = ['stress', 'fear', 'isolation'];
        connectionsToActivate = ['stress->fear', 'fear->isolation'];
        break;
      case 'coping-pathway':
        nodesToActivate = ['stress', 'anxiety', 'breathing', 'calm'];
        connectionsToActivate = ['stress->anxiety', 'anxiety->breathing', 'breathing->calm'];
        break;
      case 'memory-trigger':
        nodesToActivate = ['memory_failure', 'anxiety', 'fear'];
        connectionsToActivate = ['memory_failure->anxiety', 'memory_failure->fear'];
        break;
    }

    // Reset all activations
    setNodes(prev => prev.map(node => ({ ...node, activation: 0 })));
    setConnections(prev => prev.map(conn => ({ ...conn, active: false })));

    // Activate pathway with animation delay
    nodesToActivate.forEach((nodeId, index) => {
      setTimeout(() => {
        setNodes(prev => prev.map(node => 
          node.id === nodeId ? { ...node, activation: 1 } : node
        ));
      }, index * 300);
    });

    // Activate connections
    setTimeout(() => {
      setConnections(prev => prev.map(conn => {
        const connKey = `${conn.from}->${conn.to}`;
        return connectionsToActivate.some(activeConn => 
          connKey === activeConn.replace('->', '->')) 
          ? { ...conn, active: true } 
          : conn;
      }));
    }, 500);

    // Reset after animation
    setTimeout(() => {
      setActivePathway(null);
      setNodes(prev => prev.map(node => ({ ...node, activation: 0 })));
      setConnections(prev => prev.map(conn => ({ ...conn, active: false })));
    }, 4000);
  };

  const getNodeColor = (node: NeuralNode) => {
    const baseColors = {
      emotion: 'rgb(239, 68, 68)', // red
      memory: 'rgb(168, 85, 247)', // purple
      trigger: 'rgb(245, 101, 101)', // orange-red
      response: 'rgb(34, 197, 94)' // green
    };

    const baseColor = baseColors[node.type];
    const intensity = node.activation;
    
    if (intensity > 0) {
      return `rgba(59, 130, 246, ${0.7 + intensity * 0.3})`; // Bright blue when active
    }
    
    return baseColor;
  };

  const pathways = [
    { id: 'stress-anxiety', name: 'Stress → Anxiety → Overthinking', type: 'negative', risk: 'high' },
    { id: 'stress-fear', name: 'Stress → Fear → Isolation', type: 'negative', risk: 'medium' },
    { id: 'coping-pathway', name: 'Stress → Breathing → Calm', type: 'positive', risk: 'low' },
    { id: 'memory-trigger', name: 'Past Memories → Current Fear', type: 'negative', risk: 'medium' },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-blue-900 p-6 rounded-2xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-8 h-8 text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Neural Pathway Visualization</h2>
            <p className="text-gray-400">Real-time brain activity patterns in FRANK's AI</p>
          </div>
        </div>

        <div className="flex flex-1 gap-6">
          {/* Neural Network Canvas */}
          <div className="flex-1 relative bg-black/30 rounded-xl border border-gray-700 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={700}
              height={400}
              className="absolute inset-0"
            />
            
            {/* Neural Nodes Overlay */}
            <div className="absolute inset-0">
              {nodes.map(node => (
                <motion.div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: node.x, top: node.y }}
                  animate={{
                    scale: node.activation > 0 ? 1.3 : 1,
                    opacity: node.activation > 0 ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="rounded-full border-2 border-white/30 flex items-center justify-center shadow-lg"
                    style={{
                      width: node.size,
                      height: node.size,
                      backgroundColor: getNodeColor(node),
                      boxShadow: node.activation > 0 ? '0 0 20px rgba(59, 130, 246, 0.6)' : undefined
                    }}
                  >
                    {node.type === 'emotion' && <Heart className="w-3 h-3 text-white" />}
                    {node.type === 'trigger' && <Zap className="w-3 h-3 text-white" />}
                    {node.type === 'response' && <Activity className="w-3 h-3 text-white" />}
                    {node.type === 'memory' && <Brain className="w-3 h-3 text-white" />}
                  </div>
                  
                  {/* Node Label */}
                  <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded whitespace-nowrap">
                    {node.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Activity Indicator */}
            {activePathway && (
              <div className="absolute top-4 right-4 bg-blue-500/20 border border-blue-500/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-blue-400">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-sm font-medium">Pathway Active</span>
                </div>
              </div>
            )}
          </div>

          {/* Pathway Controls */}
          <div className="w-80 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Mental Pathways</h3>
            
            {pathways.map(pathway => (
              <motion.button
                key={pathway.id}
                onClick={() => activatePathway(pathway.id)}
                disabled={activePathway !== null}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  activePathway === pathway.id
                    ? 'bg-blue-500/30 border-blue-500/50'
                    : pathway.type === 'positive'
                    ? 'bg-green-900/20 border-green-500/30 hover:border-green-500/50'
                    : 'bg-red-900/20 border-red-500/30 hover:border-red-500/50'
                } ${activePathway && activePathway !== pathway.id ? 'opacity-50' : ''}`}
                whileHover={{ scale: activePathway ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    pathway.type === 'positive' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {pathway.type === 'positive' ? 'Healthy' : 'Negative'}
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    pathway.risk === 'high' ? 'text-red-400' : 
                    pathway.risk === 'medium' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    <AlertTriangle className="w-3 h-3" />
                    {pathway.risk}
                  </div>
                </div>
                <div className="text-white font-medium text-sm">{pathway.name}</div>
                <div className="text-gray-400 text-xs mt-1">
                  {pathway.type === 'positive' ? 'Promotes wellbeing' : 'May increase distress'}
                </div>
              </motion.button>
            ))}

            {/* Neural Stats */}
            <div className="bg-black/30 border border-gray-700 rounded-xl p-4 mt-6">
              <h4 className="text-white font-medium mb-3">Neural Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Nodes</span>
                  <span className="text-blue-400">{nodes.filter(n => n.activation > 0).length}/8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Connection Strength</span>
                  <span className="text-purple-400">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Plasticity Score</span>
                  <span className="text-green-400">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Crisis Risk</span>
                  <span className="text-yellow-400">Medium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
