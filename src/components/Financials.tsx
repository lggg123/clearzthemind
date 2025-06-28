'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Target, DollarSign, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Financials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger bar animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    { 
      value: 80, 
      suffix: '%', 
      label: 'Gross Margin', 
      detail: 'Industry-leading margins', 
      color: 'cyan',
      icon: BarChart3
    },
    { 
      value: 3, 
      suffix: 'mo', 
      label: 'Payback Period', 
      detail: 'vs 12-18mo industry avg', 
      color: 'pink',
      icon: TrendingUp
    },
    { 
      value: 87, 
      suffix: 'x', 
      label: 'LTV:CAC Ratio', 
      detail: '$175k LTV / $2k CAC', 
      color: 'purple',
      icon: Target
    },
    { 
      value: 14.2, 
      prefix: '$', 
      suffix: 'B', 
      label: 'TAM', 
      detail: 'US market alone', 
      color: 'green',
      icon: DollarSign
    }
  ];

  const revenueCards = [
    { label: 'Unit Cost', value: '$15,000', detail: 'Manufacturing cost per unit', barWidth: '25%' },
    { label: 'Monthly Revenue', value: '$5,000', detail: 'Per unit subscription', barWidth: '50%' },
    { label: 'Annual Revenue', value: '$75,000', detail: 'Per unit yearly total', barWidth: '75%' },
    { label: '3-Year LTV', value: '$175,000', detail: 'Total lifetime value', barWidth: '100%' }
  ];

  const revenueData = [
    { 
      year: 'Year 1', 
      value: '$6M', 
      height: 80, 
      style: { 
        background: 'linear-gradient(to top, #22d3ee, #06b6d4)',
        border: '1px solid rgba(6, 182, 212, 0.3)'
      },
      glowColor: 'rgba(34, 211, 238, 0.6)'
    },
    { 
      year: 'Year 2', 
      value: '$30M', 
      height: 160, 
      style: { 
        background: 'linear-gradient(to top, #60a5fa, #3b82f6)',
        border: '1px solid rgba(59, 130, 246, 0.3)'
      },
      glowColor: 'rgba(96, 165, 250, 0.6)'
    },
    { 
      year: 'Year 3', 
      value: '$120M', 
      height: 240, 
      style: { 
        background: 'linear-gradient(to top, #c084fc, #a855f7)',
        border: '1px solid rgba(168, 85, 247, 0.3)'
      },
      glowColor: 'rgba(192, 132, 252, 0.6)'
    },
    { 
      year: 'Year 4', 
      value: '$300M', 
      height: 320, 
      style: { 
        background: 'linear-gradient(to top, #f472b6, #ec4899)',
        border: '1px solid rgba(236, 72, 153, 0.3)'
      },
      glowColor: 'rgba(244, 114, 182, 0.6)'
    },
    { 
      year: 'Year 5', 
      value: '$600M', 
      height: 360, 
      style: { 
        background: 'linear-gradient(to top, #34d399, #10b981)',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      },
      glowColor: 'rgba(52, 211, 153, 0.6)'
    }
  ];

  const colorClasses = {
    cyan: { 
      text: 'text-cyan-500', 
      bg: 'bg-cyan-50', 
      border: 'hover:border-cyan-200',
      style: { color: '#06b6d4' } // Inline style backup
    },
    pink: { 
      text: 'text-pink-500', 
      bg: 'bg-pink-50', 
      border: 'hover:border-pink-200',
      style: { color: '#ec4899' }
    },
    purple: { 
      text: 'text-purple-500', 
      bg: 'bg-purple-50', 
      border: 'hover:border-purple-200',
      style: { color: '#a855f7' }
    },
    green: { 
      text: 'text-green-500', 
      bg: 'bg-green-50', 
      border: 'hover:border-green-200',
      style: { color: '#22c55e' }
    }
  };

  return (
      <section className="pt-24 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-black mb-6 text-gray-900">Financial Metrics</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            FRANK combines SaaS-like unit economics with hardware defensibility, 
            creating a venture-scale business addressing a massive humanitarian crisis.
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const colors = colorClasses[metric.color as keyof typeof colorClasses];
            
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center hover:shadow-xl ${colors.border} transition-all duration-300 group`}
              >
                <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`w-8 h-8 ${colors.text}`} />
                </div>
                <div className={`text-5xl font-black mb-3 ${colors.text}`} style={colors.style}>
                  {metric.prefix}{metric.value}{metric.suffix}
                </div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                  {metric.label}
                </div>
                <div className="text-gray-600 text-sm">{metric.detail}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Revenue Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4 text-gray-900">Unit Economics</h2>
            <p className="text-xl text-gray-600">SaaS-like margins with hardware defensibility</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {revenueCards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-sky-200 transition-all duration-300 group text-center"
              >
                <div className="text-4xl font-black text-sky-500 mb-4 group-hover:scale-110 transition-transform text-center" style={{ color: '#0ea5e9' }}>
                  {card.value}
                </div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 text-center">
                  {card.label}
                </div>
                
                {/* Light Blue Progress Bar - Centered */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden mx-auto">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: card.barWidth }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    className="h-full bg-gradient-to-r from-sky-300 to-sky-500 rounded-full"
                  />
                </div>
                
                <div className="text-gray-600 text-sm text-center leading-relaxed">{card.detail}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Revenue Chart - FIXED VERSION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4 text-gray-900">Path to $600M Revenue</h2>
            <p className="text-xl text-gray-600">100x growth in 5 years through exponential unit deployment</p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
            {/* Bar Chart Container */}
            <div className="h-96 bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <div className="h-full flex items-end justify-around gap-4">
                {revenueData.map((bar, index) => (
                  <div key={bar.year} className="flex flex-col items-center group relative cursor-pointer flex-1 max-w-32">
                    {/* Revenue Value Label */}
                    <div className="font-black text-lg text-gray-900 mb-2">
                      {bar.value}
                    </div>
                    
                    {/* Animated Bar - THICK WITH NEON GLOW */}
                    <motion.div
                      initial={{ height: 0, scaleY: 0 }}
                      animate={isVisible ? { 
                        height: `${bar.height}px`,
                        scaleY: 1
                      } : { height: 0, scaleY: 0 }}
                      transition={{ 
                        duration: 1.5, 
                        delay: index * 0.3,
                        ease: "easeOut"
                      }}
                      className="w-24 rounded-t-3xl relative group-hover:scale-105 transition-all duration-300"
                      style={{ 
                        minHeight: isVisible ? '20px' : '0px',
                        transformOrigin: 'bottom',
                        ...bar.style,
                        boxShadow: `
                          0 0 20px ${bar.glowColor},
                          0 0 40px ${bar.glowColor?.replace('0.6', '0.4')},
                          0 0 60px ${bar.glowColor?.replace('0.6', '0.2')},
                          0 10px 30px rgba(0, 0, 0, 0.1)
                        `,
                        filter: 'brightness(1.1)',
                        border: '2px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {/* Inner glow effect */}
                      <div 
                        className="absolute inset-1 rounded-t-3xl opacity-50"
                        style={{
                          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3))'
                        }}
                      />
                      
                      {/* Tooltip on Hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap text-sm z-10 shadow-xl">
                        <div className="font-bold text-center">{bar.value} Revenue</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </motion.div>
                    
                    {/* Year Label */}
                    <div className="text-gray-600 font-medium text-center mt-3 text-sm">
                      {bar.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Below Chart */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8 border-t border-gray-200 bg-white">
              <div>
                <div className="text-3xl font-black mb-2" style={{ color: '#06b6d4' }}>10,000</div>
                <div className="text-gray-600">Units by Year 5</div>
              </div>
              <div>
                <div className="text-3xl font-black mb-2" style={{ color: '#06b6d4' }}>38%</div>
                <div className="text-gray-600">EBITDA Margin</div>
              </div>
              <div>
                <div className="text-3xl font-black mb-2" style={{ color: '#06b6d4' }}>Year 3</div>
                <div className="text-gray-600">Cash Flow Positive</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5K Units Colored Hovering Glow Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4 text-gray-900">Unit Deployment Milestones</h2>
            <p className="text-xl text-gray-600">5,000 units per major deployment phase</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                phase: 'Phase 1',
                units: '5K',
                year: '2024',
                title: 'Beta Launch',
                description: 'Initial hospital partnerships',
                color: 'cyan',
                glowColor: 'rgba(6, 182, 212, 0.4)',
                bgGradient: 'from-cyan-400 to-cyan-600',
                borderColor: 'border-cyan-200'
              },
              {
                phase: 'Phase 2', 
                units: '10K',
                year: '2025',
                title: 'Regional Scale',
                description: 'Multi-state deployment',
                color: 'blue',
                glowColor: 'rgba(59, 130, 246, 0.4)',
                bgGradient: 'from-blue-400 to-blue-600',
                borderColor: 'border-blue-200'
              },
              {
                phase: 'Phase 3',
                units: '25K', 
                year: '2026',
                title: 'National Growth',
                description: 'Coast-to-coast coverage',
                color: 'purple',
                glowColor: 'rgba(168, 85, 247, 0.4)',
                bgGradient: 'from-purple-400 to-purple-600',
                borderColor: 'border-purple-200'
              },
              {
                phase: 'Phase 4',
                units: '50K',
                year: '2027', 
                title: 'Market Leader',
                description: 'Dominant market position',
                color: 'pink',
                glowColor: 'rgba(236, 72, 153, 0.4)',
                bgGradient: 'from-pink-400 to-pink-600',
                borderColor: 'border-pink-200'
              },
              {
                phase: 'Phase 5',
                units: '100K',
                year: '2028',
                title: 'Global Vision',
                description: 'International expansion',
                color: 'emerald',
                glowColor: 'rgba(16, 185, 129, 0.4)', 
                bgGradient: 'from-emerald-400 to-emerald-600',
                borderColor: 'border-emerald-200'
              }
            ].map((milestone, index) => (
              <motion.div
                key={milestone.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10
                }}
                className={`bg-white p-6 rounded-3xl shadow-lg border ${milestone.borderColor} hover:shadow-2xl transition-all duration-300 group relative overflow-hidden cursor-pointer`}
                style={{
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 60px ${milestone.glowColor}, 0 0 40px ${milestone.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Animated Background Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    background: `radial-gradient(circle at center, ${milestone.glowColor}, transparent 70%)`,
                    filter: 'blur(20px)'
                  }}
                />
                
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Phase Badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4 bg-gradient-to-r ${milestone.bgGradient} group-hover:scale-110 transition-transform duration-300`}>
                    {milestone.phase}
                  </div>
                  
                  {/* Units Count - Large Display */}
                  <div className="text-center mb-4">
                    <motion.div 
                      className={`text-5xl font-black text-${milestone.color}-500 group-hover:scale-110 transition-transform duration-300`}
                      style={{ 
                        color: milestone.color === 'cyan' ? '#06b6d4' :
                               milestone.color === 'blue' ? '#3b82f6' :
                               milestone.color === 'purple' ? '#a855f7' :
                               milestone.color === 'pink' ? '#ec4899' :
                               '#10b981' // emerald
                      }}
                      whileHover={{
                        textShadow: `0 0 20px ${milestone.glowColor}`
                      }}
                    >
                      {milestone.units}
                    </motion.div>
                    <div className="text-sm text-gray-500 font-medium">UNITS</div>
                  </div>
                  
                  {/* Year */}
                  <div className="text-2xl font-bold text-gray-700 mb-2 text-center group-hover:text-gray-900 transition-colors">
                    {milestone.year}
                  </div>
                  
                  {/* Title */}
                  <div className="text-lg font-bold text-gray-900 mb-2 text-center">
                    {milestone.title}
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm text-gray-600 text-center">
                    {milestone.description}
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(index + 1) * 20}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                        className={`h-full rounded-full bg-gradient-to-r ${milestone.bgGradient} group-hover:animate-pulse`}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      {Math.round((index + 1) * 20)}% Complete by {milestone.year}
                    </div>
                  </div>
                </div>
                
                {/* Floating Particles Effect on Hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 bg-${milestone.color}-400 rounded-full opacity-0 group-hover:opacity-60`}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                        backgroundColor: milestone.color === 'cyan' ? '#22d3ee' :
                                       milestone.color === 'blue' ? '#60a5fa' :
                                       milestone.color === 'purple' ? '#c084fc' :
                                       milestone.color === 'pink' ? '#f472b6' :
                                       '#34d399' // emerald
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1.2, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Summary Stats Below Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-gray-50 to-cyan-50 rounded-3xl p-8 border border-gray-200"
          >
            <div className="text-center mb-6">
              <h3 className="text-3xl font-black text-gray-900 mb-2">5-Year Impact Projection</h3>
              <p className="text-gray-600">Cumulative lives saved through progressive deployment</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-6 rounded-2xl shadow-md border border-cyan-100">
                <div className="text-3xl font-black text-cyan-500 mb-2">190K+</div>
                <div className="text-gray-600 text-sm">Total Units Deployed</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
                <div className="text-3xl font-black text-emerald-500 mb-2">47,000</div>
                <div className="text-gray-600 text-sm">Lives Saved Annually</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-100">
                <div className="text-3xl font-black text-purple-500 mb-2">$14.25B</div>
                <div className="text-gray-600 text-sm">Market Value Created</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-100">
                <div className="text-3xl font-black text-pink-500 mb-2">85%</div>
                <div className="text-gray-600 text-sm">Crisis Prevention Rate</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Financials;