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
      emotion: 'linear-gradient(135deg, #f87171, #ef4444)', // Enhanced red gradient
      memory: 'linear-gradient(135deg, #a855f7, #9333ea)', // Enhanced purple gradient
      trigger: 'linear-gradient(135deg, #fb923c, #f97316)', // Enhanced orange gradient
      response: 'linear-gradient(135deg, #22c55e, #16a34a)' // Enhanced green gradient
    };

    const activeColors = {
      emotion: 'linear-gradient(135deg, #06b6d4, #0891b2)', // Cyan when active
      memory: 'linear-gradient(135deg, #06b6d4, #0891b2)', // Cyan when active
      trigger: 'linear-gradient(135deg, #06b6d4, #0891b2)', // Cyan when active
      response: 'linear-gradient(135deg, #06b6d4, #0891b2)' // Cyan when active
    };

    if (node.activation > 0) {
      return activeColors[node.type];
    }
    
    return baseColors[node.type];
  };

  const pathways = [
    { id: 'stress-anxiety', name: 'Stress → Anxiety → Overthinking', type: 'negative', risk: 'high' },
    { id: 'stress-fear', name: 'Stress → Fear → Isolation', type: 'negative', risk: 'medium' },
    { id: 'coping-pathway', name: 'Stress → Breathing → Calm', type: 'positive', risk: 'low' },
    { id: 'memory-trigger', name: 'Past Memories → Current Fear', type: 'negative', risk: 'medium' },
  ];

  return (
    <div className="neural-pathways-container h-full bg-gradient-to-br from-slate-900/95 via-cyan-900/80 to-blue-900/95 p-6 rounded-2xl relative overflow-hidden backdrop-blur-sm">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Neural connection lines background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]"></div>
        
        {/* Floating neural particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="flex flex-col h-full relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-purple-500/20 rounded-3xl border border-cyan-400/30 backdrop-blur-lg relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            boxShadow: '0 8px 32px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Animated background effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/20 to-purple-500/10"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl border-2 border-cyan-300/50 relative z-10"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.5)",
                "0 0 30px rgba(59, 130, 246, 0.6)", 
                "0 0 20px rgba(6, 182, 212, 0.5)"
              ] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Brain className="w-7 h-7 text-white drop-shadow-lg" />
          </motion.div>
          
          <div className="flex-1 relative z-10">
            <h2 
              className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 mb-2"
              style={{ 
                background: 'linear-gradient(to right, #67e8f9, #93c5fd, #c4b5fd)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Neural Pathway Visualization
            </h2>
            <p className="text-cyan-300/90 text-base font-semibold leading-relaxed">
              Real-time brain activity patterns in FRANK's AI neural network
            </p>
          </div>
          
          <motion.div 
            className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl border border-cyan-400/50 backdrop-blur-sm relative z-10"
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Activity className="w-5 h-5 text-cyan-300 animate-pulse" />
            <span className="text-sm font-bold text-cyan-200 tracking-wider">LIVE</span>
          </motion.div>
        </motion.div>

        <div className="flex flex-1 gap-6">
          {/* Enhanced Neural Network Canvas */}
          <motion.div 
            className="flex-1 relative bg-gradient-to-br from-slate-900/60 via-cyan-900/40 to-blue-900/60 rounded-2xl border-2 border-cyan-400/30 overflow-hidden backdrop-blur-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              boxShadow: '0 25px 50px rgba(6, 182, 212, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Canvas header */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-10"></div>
            
            <canvas
              ref={canvasRef}
              width={700}
              height={400}
              className="absolute inset-0 z-0"
            />
            
            {/* Enhanced Neural Nodes Overlay */}
            <div className="absolute inset-0 z-20">
              {nodes.map(node => (
                <motion.div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: node.x, top: node.y }}
                  animate={{
                    scale: node.activation > 0 ? 1.4 : 1,
                    opacity: node.activation > 0 ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <motion.div
                    className="rounded-full border-2 flex items-center justify-center shadow-2xl relative overflow-hidden"
                    style={{
                      width: node.size,
                      height: node.size,
                      background: getNodeColor(node),
                      borderColor: node.activation > 0 ? '#22d3ee' : 'rgba(255, 255, 255, 0.3)',
                      boxShadow: node.activation > 0 
                        ? '0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)' 
                        : '0 4px 20px rgba(0, 0, 0, 0.4)'
                    }}
                    animate={node.activation > 0 ? {
                      boxShadow: [
                        "0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)",
                        "0 0 40px rgba(59, 130, 246, 0.9), 0 0 80px rgba(6, 182, 212, 0.5)",
                        "0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)"
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* Animated ring for active nodes */}
                    {node.activation > 0 && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-cyan-300"
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    )}
                    
                    {/* Node icons with enhanced styling */}
                    <div className="relative z-10">
                      {node.type === 'emotion' && <Heart className="w-3 h-3 text-white drop-shadow-lg" />}
                      {node.type === 'trigger' && <Zap className="w-3 h-3 text-white drop-shadow-lg" />}
                      {node.type === 'response' && <Activity className="w-3 h-3 text-white drop-shadow-lg" />}
                      {node.type === 'memory' && <Brain className="w-3 h-3 text-white drop-shadow-lg" />}
                    </div>
                  </motion.div>
                  
                  {/* Enhanced Node Label */}
                  <motion.div 
                    className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-cyan-200 bg-gradient-to-r from-slate-900/90 to-cyan-900/90 px-3 py-1 rounded-full whitespace-nowrap border border-cyan-400/30 backdrop-blur-sm"
                    animate={{
                      opacity: node.activation > 0 ? 1 : 0.7,
                      scale: node.activation > 0 ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: node.activation > 0 
                        ? '0 4px 20px rgba(6, 182, 212, 0.4)' 
                        : '0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {node.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Activity Indicator */}
            {activePathway && (
              <motion.div 
                className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 rounded-2xl p-4 backdrop-blur-lg z-30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  boxShadow: '0 8px 32px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1, repeat: Infinity }
                    }}
                  >
                    <Activity className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-cyan-200 font-bold text-sm">Pathway Active</div>
                    <div className="text-cyan-300/70 text-xs">Processing neural signals</div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced Pathway Controls */}
          <motion.div 
            className="w-80 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-slate-900/80 via-cyan-900/60 to-blue-900/80 rounded-3xl p-6 border border-cyan-400/30 backdrop-blur-lg relative overflow-hidden"
              style={{
                boxShadow: '0 20px 40px rgba(6, 182, 212, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg border border-cyan-300/50"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Activity className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                  Mental Pathways
                </h3>
              </div>
              
              <div className="space-y-4 relative z-10">
                {pathways.map((pathway, index) => (
                  <button
                    key={pathway.id}
                    onClick={() => activatePathway(pathway.id)}
                    disabled={activePathway !== null}
                    className={`pathway-button w-full p-5 rounded-3xl border-2 text-left transition-all duration-300 relative overflow-hidden group ${
                      activePathway === pathway.id
                        ? 'active bg-gradient-to-r from-cyan-500/50 via-blue-500/40 to-purple-500/50 border-cyan-400/80 shadow-2xl'
                        : pathway.type === 'positive'
                        ? 'bg-gradient-to-r from-green-900/50 via-emerald-900/40 to-green-900/50 border-green-400/60 hover:border-green-400/80 hover:shadow-lg hover:from-green-900/60 hover:to-green-900/60'
                        : 'bg-gradient-to-r from-red-900/50 via-rose-900/40 to-red-900/50 border-red-400/60 hover:border-red-400/80 hover:shadow-lg hover:from-red-900/60 hover:to-red-900/60'
                    } ${activePathway && activePathway !== pathway.id ? 'opacity-50' : ''}`}
                    style={{
                      boxShadow: activePathway === pathway.id 
                        ? '0 20px 40px rgba(6, 182, 212, 0.4), 0 0 30px rgba(59, 130, 246, 0.3)'
                        : pathway.type === 'positive'
                        ? '0 8px 25px rgba(34, 197, 94, 0.2)'
                        : '0 8px 25px rgba(239, 68, 68, 0.2)'
                    }}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div 
                          className={`pathway-badge ${pathway.type === 'positive' ? 'positive' : 'negative'} px-4 py-2 rounded-2xl text-sm font-bold shadow-lg transition-transform duration-200 hover:scale-105`}
                        >
                          {pathway.type === 'positive' ? '✅ Healthy' : '⚠️ Negative'}
                        </div>
                        <div className={`pathway-badge risk-${pathway.risk} flex items-center gap-2 px-3 py-2 rounded-2xl text-sm font-bold shadow-lg`}>
                          <AlertTriangle className="w-4 h-4" />
                          {pathway.risk.toUpperCase()}
                        </div>
                      </div>
                      
                      {/* Centered and larger pathway title */}
                      <div className="text-center mb-4 px-4">
                        <div className="pathway-title text-xl mb-2 leading-tight font-black">
                          {pathway.name}
                        </div>
                        
                        <div className="pathway-description text-base font-semibold leading-relaxed">
                          {pathway.type === 'positive' ? '💚 Promotes mental wellbeing and emotional balance' : '💔 May increase emotional distress and anxiety'}
                        </div>
                      </div>
                      
                      {/* Progress indicator for active pathway */}
                      {activePathway === pathway.id && (
                        <motion.div 
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3.5, ease: "easeInOut" }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Neural Stats */}
            <motion.div 
              className="bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-slate-900/80 border border-purple-400/30 rounded-3xl p-6 backdrop-blur-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                boxShadow: '0 20px 40px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg border border-purple-300/50"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 6, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <h4 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                  Neural Activity
                </h4>
              </div>
              
              <div className="space-y-4 relative z-10">
                {[
                  { label: 'Active Nodes', value: `${nodes.filter(n => n.activation > 0).length}/8`, color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-400/30' },
                  { label: 'Connection Strength', value: '87%', color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-400/30' },
                  { label: 'Plasticity Score', value: 'High', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-400/30' },
                  { label: 'Crisis Risk', value: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-400/30' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className={`stats-card flex justify-between items-center p-5 rounded-2xl bg-gradient-to-r from-slate-800/60 to-slate-700/60 border ${stat.border} backdrop-blur-md relative overflow-hidden group`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    style={{
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    {/* Enhanced background glow effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: stat.color.includes('cyan') 
                          ? 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1), transparent 70%)'
                          : stat.color.includes('purple')
                          ? 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 70%)'
                          : stat.color.includes('green')
                          ? 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1), transparent 70%)'
                          : 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1), transparent 70%)'
                      }}
                    />
                    
                    <span className="stats-label text-slate-200 font-bold text-base tracking-wide relative z-10">{stat.label}</span>
                    <motion.div 
                      className={`stats-value-container flex items-center gap-2 px-5 py-3 rounded-xl ${stat.bg} border ${stat.border} backdrop-blur-sm relative z-10`}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className={`stats-value ${stat.color} font-black text-lg tracking-wider`}>{stat.value}</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
