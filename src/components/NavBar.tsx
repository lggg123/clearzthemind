'use client';

import Link from 'next/link';
import { Brain } from 'lucide-react';
import { usePathname } from 'next/navigation';

const NavigationBar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', id: 'home', color: 'cyan' },
    { href: '/showcase', label: 'Demo', id: 'product', color: 'blue' },
    { href: '/pitch', label: 'Pitch', id: 'pitch', color: 'purple' },
    { href: '/financials', label: 'Financials', id: 'financials', color: 'pink' },
    { href: '/contact', label: 'Contact', id: 'contact', color: 'green' }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      cyan: {
        text: isActive ? 'text-cyan-500' : 'text-gray-600 hover:text-cyan-500',
        glow: 'hover:shadow-cyan-500/25',
        border: 'bg-cyan-500',
        style: { 
          color: isActive ? '#22d3ee' : '#6b7280',
          transition: 'color 0.3s ease'
        }
      },
      blue: {
        text: isActive ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500',
        glow: 'hover:shadow-blue-500/25',
        border: 'bg-blue-500',
        style: { 
          color: isActive ? '#60a5fa' : '#6b7280',
          transition: 'color 0.3s ease'
        }
      },
      purple: {
        text: isActive ? 'text-purple-500' : 'text-gray-600 hover:text-purple-500',
        glow: 'hover:shadow-purple-500/25',
        border: 'bg-purple-500',
        style: { 
          color: isActive ? '#c084fc' : '#6b7280',
          transition: 'color 0.3s ease'
        }
      },
      pink: {
        text: isActive ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500',
        glow: 'hover:shadow-pink-500/25',
        border: 'bg-pink-500',
        style: { 
          color: isActive ? '#f472b6' : '#6b7280',
          transition: 'color 0.3s ease'
        }
      },
      green: {
        text: isActive ? 'text-green-500' : 'text-gray-600 hover:text-green-500',
        glow: 'hover:shadow-green-500/25',
        border: 'bg-green-500',
        style: { 
          color: isActive ? '#4ade80' : '#6b7280',
          transition: 'color 0.3s ease'
        }
      }
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-xl" 
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
      }}
    >
      <div 
        className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center w-full"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '0.75rem 1.5rem'
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative">
            <Brain 
              className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-all duration-300" 
              style={{ 
                width: '1.5rem', 
                height: '1.5rem',
                color: '#22d3ee'
              }}
            />
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
          </div>
          <div className="flex items-center gap-2">
            <span 
              className="text-xl font-bold text-gray-900 group-hover:text-cyan-500 transition-all duration-300"
              style={{ 
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#111827'
              }}
            >
              FRANK
            </span>
            <span 
              className="text-xs text-gray-600 font-medium hidden sm:block group-hover:text-cyan-500 transition-colors duration-300"
              style={{
                fontSize: '0.75rem',
                color: '#4b5563'
              }}
            >
              Robotics
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div 
          className="flex gap-8 items-center justify-center flex-1"
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1'
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const colorClasses = getColorClasses(item.color, isActive);
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`font-medium transition-all duration-300 relative group px-3 py-2 rounded-lg ${colorClasses.text} ${colorClasses.glow} hover:scale-105`}
                style={{
                  ...colorClasses.style,
                  fontWeight: '500',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = item.color === 'cyan' ? '#22d3ee' :
                                               item.color === 'blue' ? '#60a5fa' :
                                               item.color === 'purple' ? '#c084fc' :
                                               item.color === 'pink' ? '#f472b6' :
                                               '#4ade80';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#6b7280';
                  }
                }}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Enhanced Glow background on hover with multiple layers */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                     style={{ 
                       background: `radial-gradient(ellipse at center, ${
                         item.color === 'cyan' ? 'rgba(34, 211, 238, 0.15)' :
                         item.color === 'blue' ? 'rgba(96, 165, 250, 0.15)' :
                         item.color === 'purple' ? 'rgba(192, 132, 252, 0.15)' :
                         item.color === 'pink' ? 'rgba(244, 114, 182, 0.15)' :
                         'rgba(74, 222, 128, 0.15)'
                       }, transparent 70%)`,
                       boxShadow: `
                         0 0 20px ${
                           item.color === 'cyan' ? 'rgba(34, 211, 238, 0.3)' :
                           item.color === 'blue' ? 'rgba(96, 165, 250, 0.3)' :
                           item.color === 'purple' ? 'rgba(192, 132, 252, 0.3)' :
                           item.color === 'pink' ? 'rgba(244, 114, 182, 0.3)' :
                           'rgba(74, 222, 128, 0.3)'
                         },
                         0 0 40px ${
                           item.color === 'cyan' ? 'rgba(34, 211, 238, 0.2)' :
                           item.color === 'blue' ? 'rgba(96, 165, 250, 0.2)' :
                           item.color === 'purple' ? 'rgba(192, 132, 252, 0.2)' :
                           item.color === 'pink' ? 'rgba(244, 114, 182, 0.2)' :
                           'rgba(74, 222, 128, 0.2)'
                         }
                       `
                     }} />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-50 group-hover:opacity-100 transition-all duration-1000"
                      style={{
                        background: item.color === 'cyan' ? '#22d3ee' :
                                   item.color === 'blue' ? '#60a5fa' :
                                   item.color === 'purple' ? '#c084fc' :
                                   item.color === 'pink' ? '#f472b6' :
                                   '#4ade80',
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                        animation: `float ${2 + i * 0.5}s ease-in-out infinite`
                      }}
                    />
                  ))}
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 rounded-full"
                    style={{
                      background: item.color === 'cyan' ? '#22d3ee' :
                                 item.color === 'blue' ? '#60a5fa' :
                                 item.color === 'purple' ? '#c084fc' :
                                 item.color === 'pink' ? '#f472b6' :
                                 '#4ade80',
                      boxShadow: `0 0 8px ${
                        item.color === 'cyan' ? 'rgba(34, 211, 238, 0.6)' :
                        item.color === 'blue' ? 'rgba(96, 165, 250, 0.6)' :
                        item.color === 'purple' ? 'rgba(192, 132, 252, 0.6)' :
                        item.color === 'pink' ? 'rgba(244, 114, 182, 0.6)' :
                        'rgba(74, 222, 128, 0.6)'
                      }`
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;