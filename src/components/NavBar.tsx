'use client';

import Link from 'next/link';
import { Brain, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NavigationBar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(180deg); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInItem {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Ensure no underlines anywhere */
        a, a:hover, a:focus, a:active, a:visited {
          text-decoration: none !important;
        }
        
        .nav-link {
          text-decoration: none !important;
        }
        
        .nav-link:hover {
          text-decoration: none !important;
        }
      `}</style>

      <nav 
        className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-xl" 
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
        }}
      >
        <div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 py-3 w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            width: '100%',
            padding: '0.75rem 1rem'
          }}
        >
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0 no-underline nav-link justify-self-start" style={{ textDecoration: 'none !important' }}>
            <div className="relative">
              <Brain 
                className="w-7 h-7 text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" 
                style={{ 
                  width: '1.75rem', 
                  height: '1.75rem',
                  color: '#22d3ee',
                  filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.4))'
                }}
              />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm group-hover:blur-md group-hover:bg-cyan-400/30 transition-all duration-300"></div>
            </div>
            <div className="flex items-center gap-2">
              <span 
                className="text-xl font-bold text-slate-900 group-hover:text-cyan-500 transition-all duration-300 no-underline"
                style={{ 
                  fontSize: '1.375rem',
                  fontWeight: '800',
                  color: '#0f172a',
                  textDecoration: 'none !important',
                  letterSpacing: '0.025em',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}
              >
                FRANK
              </span>
              <span 
                className="text-xs text-gray-600 font-medium hidden sm:block group-hover:text-cyan-500 transition-colors duration-300"
                style={{
                  fontSize: '0.75rem',
                  color: '#4b5563',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}
              >
                Robotics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="desktop-nav-links hidden md:flex gap-10 items-center justify-center">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const colorClasses = getColorClasses(item.color, isActive);
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`font-semibold transition-all duration-300 relative group px-4 py-3 rounded-xl ${colorClasses.text} ${colorClasses.glow} hover:scale-105 no-underline tracking-wide nav-link`}
                  style={{
                    ...colorClasses.style,
                    fontWeight: '600',
                    fontSize: '1rem',
                    letterSpacing: '0.025em',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none !important',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = item.color === 'cyan' ? '#22d3ee' :
                                                 item.color === 'blue' ? '#60a5fa' :
                                                 item.color === 'purple' ? '#c084fc' :
                                                 item.color === 'pink' ? '#f472b6' :
                                                 '#4ade80';
                    e.currentTarget.style.textShadow = `0 0 20px ${
                      item.color === 'cyan' ? 'rgba(34, 211, 238, 0.4)' :
                      item.color === 'blue' ? 'rgba(96, 165, 250, 0.4)' :
                      item.color === 'purple' ? 'rgba(192, 132, 252, 0.4)' :
                      item.color === 'pink' ? 'rgba(244, 114, 182, 0.4)' :
                      'rgba(74, 222, 128, 0.4)'
                    }`;
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#6b7280';
                      e.currentTarget.style.textShadow = 'none';
                    }
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  }}
                >
                  <span 
                    className="relative z-10 transition-all duration-300"
                    style={{
                      textDecoration: 'none !important',
                      display: 'inline-block',
                      textTransform: 'uppercase',
                      fontSize: '0.875rem',
                      letterSpacing: '0.05em',
                      fontWeight: '700'
                    }}
                  >
                    {item.label}
                  </span>
                  
                  {/* ...existing glow and particle effects... */}
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
                  
                  {isActive && (
                    <>
                      <div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full animate-pulse"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${
                            item.color === 'cyan' ? '#22d3ee' :
                            item.color === 'blue' ? '#60a5fa' :
                            item.color === 'purple' ? '#c084fc' :
                            item.color === 'pink' ? '#f472b6' :
                            '#4ade80'
                          }, transparent)`,
                          boxShadow: `0 0 12px ${
                            item.color === 'cyan' ? 'rgba(34, 211, 238, 0.8)' :
                            item.color === 'blue' ? 'rgba(96, 165, 250, 0.8)' :
                            item.color === 'purple' ? 'rgba(192, 132, 252, 0.8)' :
                            item.color === 'pink' ? 'rgba(244, 114, 182, 0.8)' :
                            'rgba(74, 222, 128, 0.8)'
                          }`
                        }}
                      />
                      <div 
                        className="absolute inset-0 rounded-xl border border-opacity-30 animate-pulse"
                        style={{
                          borderColor: item.color === 'cyan' ? '#22d3ee' :
                                     item.color === 'blue' ? '#60a5fa' :
                                     item.color === 'purple' ? '#c084fc' :
                                     item.color === 'pink' ? '#f472b6' :
                                     '#4ade80',
                          borderWidth: '1px',
                          borderStyle: 'solid'
                        }}
                      />
                    </>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button - Truly Centered */}
          <button
            className="mobile-menu-btn flex md:hidden items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 border border-cyan-200 hover:border-cyan-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group justify-self-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            style={{
              background: 'linear-gradient(135deg, rgba(236, 254, 255, 0.8) 0%, rgba(219, 234, 254, 0.8) 100%)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              boxShadow: '0 4px 12px rgba(34, 211, 238, 0.15)',
              position: 'relative'
            }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-200" />
            ) : (
              <Menu className="w-6 h-6 text-cyan-600 group-hover:text-cyan-700 transition-colors duration-200" />
            )}
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Empty space on right to balance the grid */}
          <div className="hidden md:block"></div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full Screen with opaque background */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[1100] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            animation: 'fadeIn 0.3s ease-out',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffffff',
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
          }}
        >
          <div 
            className="w-full h-full flex flex-col items-center justify-center transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'slideIn 0.3s ease-out',
              width: '100%',
              height: '100%',
              backgroundColor: '#ffffff',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border border-red-200 hover:border-red-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
              style={{
                background: 'linear-gradient(135deg, rgba(254, 226, 226, 0.8) 0%, rgba(252, 165, 165, 0.8) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)'
              }}
            >
              <X className="w-6 h-6 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
            </button>

            {/* Logo Section */}
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="w-12 h-12 text-cyan-500" style={{ filter: 'drop-shadow(0 0 12px rgba(34, 211, 238, 0.4))' }} />
                <span className="text-4xl font-black text-slate-900">FRANK</span>
              </div>
              <p className="text-gray-600 text-lg">Robotics</p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-center space-y-6 w-full max-w-sm px-8">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                const colorClasses = getColorClasses(item.color, isActive);
                
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`w-full text-center font-bold py-4 px-8 rounded-2xl transition-all duration-300 ${colorClasses.text} no-underline hover:scale-105 transform-gpu nav-link text-xl`}
                    style={{
                      ...colorClasses.style,
                      fontWeight: '700',
                      fontSize: '1.25rem',
                      letterSpacing: '0.025em',
                      textDecoration: 'none !important',
                      textTransform: 'uppercase',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                      backgroundColor: isActive ? `${item.color === 'cyan' ? 'rgba(34, 211, 238, 0.15)' : 
                                                  item.color === 'blue' ? 'rgba(96, 165, 250, 0.15)' :
                                                  item.color === 'purple' ? 'rgba(192, 132, 252, 0.15)' :
                                                  item.color === 'pink' ? 'rgba(244, 114, 182, 0.15)' :
                                                  'rgba(74, 222, 128, 0.15)'}` : 'rgba(255, 255, 255, 0.1)',
                      border: isActive ? `2px solid ${
                        item.color === 'cyan' ? '#22d3ee' :
                        item.color === 'blue' ? '#60a5fa' :
                        item.color === 'purple' ? '#c084fc' :
                        item.color === 'pink' ? '#f472b6' :
                        '#4ade80'
                      }` : '2px solid rgba(0, 0, 0, 0.1)',
                      boxShadow: isActive ? `0 8px 24px ${
                        item.color === 'cyan' ? 'rgba(34, 211, 238, 0.3)' :
                        item.color === 'blue' ? 'rgba(96, 165, 250, 0.3)' :
                        item.color === 'purple' ? 'rgba(192, 132, 252, 0.3)' :
                        item.color === 'pink' ? 'rgba(244, 114, 182, 0.3)' :
                        'rgba(74, 222, 128, 0.3)'
                      }` : '0 4px 12px rgba(0, 0, 0, 0.1)',
                      animation: `slideInItem 0.3s ease-out ${index * 0.1}s both`
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span style={{ textDecoration: 'none !important' }}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Text */}
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                Revolutionizing Mental Healthcare
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
