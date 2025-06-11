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
        style: { color: isActive ? '#06b6d4' : undefined }
      },
      blue: {
        text: isActive ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500',
        glow: 'hover:shadow-blue-500/25',
        border: 'bg-blue-500',
        style: { color: isActive ? '#3b82f6' : undefined }
      },
      purple: {
        text: isActive ? 'text-purple-500' : 'text-gray-600 hover:text-purple-500',
        glow: 'hover:shadow-purple-500/25',
        border: 'bg-purple-500',
        style: { color: isActive ? '#a855f7' : undefined }
      },
      pink: {
        text: isActive ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500',
        glow: 'hover:shadow-pink-500/25',
        border: 'bg-pink-500',
        style: { color: isActive ? '#ec4899' : undefined }
      },
      green: {
        text: isActive ? 'text-green-500' : 'text-gray-600 hover:text-green-500',
        glow: 'hover:shadow-green-500/25',
        border: 'bg-green-500',
        style: { color: isActive ? '#22c55e' : undefined }
      }
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Brain className="w-8 h-8 text-cyan-500 group-hover:scale-110 transition-all duration-300 group-hover:rotate-12" />
            <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-md animate-pulse group-hover:blur-lg group-hover:bg-cyan-400/40"></div>
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl group-hover:blur-2xl"></div>
          </div>
          <div className="flex items-center gap-2">
            <span 
              className="text-2xl font-black text-gray-900 group-hover:text-cyan-500 transition-all duration-300 group-hover:drop-shadow-lg"
              style={{ 
                textShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
                filter: 'brightness(1.1)'
              }}
            >
              FRANK
            </span>
            <span className="text-sm text-gray-600 font-medium hidden sm:block group-hover:text-cyan-400 transition-colors duration-300">
              Robotics
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const colorClasses = getColorClasses(item.color, isActive);
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`font-semibold transition-all duration-300 relative group px-4 py-2 rounded-xl ${colorClasses.text} ${colorClasses.glow} hover:shadow-lg hover:scale-105 hover:bg-white/80`}
                style={colorClasses.style}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Enhanced Glow background on hover with multiple layers */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                     style={{ 
                       background: `radial-gradient(ellipse at center, ${
                         item.color === 'cyan' ? 'rgba(6, 182, 212, 0.15)' :
                         item.color === 'blue' ? 'rgba(59, 130, 246, 0.15)' :
                         item.color === 'purple' ? 'rgba(168, 85, 247, 0.15)' :
                         item.color === 'pink' ? 'rgba(236, 72, 153, 0.15)' :
                         'rgba(34, 197, 94, 0.15)'
                       }, transparent 70%)`,
                       boxShadow: `
                         0 0 20px ${
                           item.color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' :
                           item.color === 'blue' ? 'rgba(59, 130, 246, 0.3)' :
                           item.color === 'purple' ? 'rgba(168, 85, 247, 0.3)' :
                           item.color === 'pink' ? 'rgba(236, 72, 153, 0.3)' :
                           'rgba(34, 197, 94, 0.3)'
                         },
                         0 0 40px ${
                           item.color === 'cyan' ? 'rgba(6, 182, 212, 0.2)' :
                           item.color === 'blue' ? 'rgba(59, 130, 246, 0.2)' :
                           item.color === 'purple' ? 'rgba(168, 85, 247, 0.2)' :
                           item.color === 'pink' ? 'rgba(236, 72, 153, 0.2)' :
                           'rgba(34, 197, 94, 0.2)'
                         },
                         inset 0 0 10px ${
                           item.color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' :
                           item.color === 'blue' ? 'rgba(59, 130, 246, 0.1)' :
                           item.color === 'purple' ? 'rgba(168, 85, 247, 0.1)' :
                           item.color === 'pink' ? 'rgba(236, 72, 153, 0.1)' :
                           'rgba(34, 197, 94, 0.1)'
                         }
                       `
                     }} />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                      style={{
                        backgroundColor: item.color === 'cyan' ? '#22d3ee' :
                                       item.color === 'blue' ? '#60a5fa' :
                                       item.color === 'purple' ? '#c084fc' :
                                       item.color === 'pink' ? '#f472b6' :
                                       '#34d399',
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                        animationDelay: `${i * 0.2}s`,
                        animation: 'float 2s ease-in-out infinite'
                      }}
                    />
                  ))}
                </div>
                
                {/* Active indicator with enhanced design */}
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 ${colorClasses.border} rounded-full transition-all duration-300 ${
                  isActive ? 'w-8' : 'w-0 group-hover:w-6'
                }`} 
                     style={{
                       boxShadow: isActive ? `0 0 10px ${
                         item.color === 'cyan' ? 'rgba(6, 182, 212, 0.5)' :
                         item.color === 'blue' ? 'rgba(59, 130, 246, 0.5)' :
                         item.color === 'purple' ? 'rgba(168, 85, 247, 0.5)' :
                         item.color === 'pink' ? 'rgba(236, 72, 153, 0.5)' :
                         'rgba(34, 197, 94, 0.5)'
                       }` : 'none'
                     }} />
                
                {/* Enhanced glow effect for active state with pulsing animation */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 rounded-xl animate-pulse"
                         style={{ 
                           boxShadow: `0 0 30px ${
                             item.color === 'cyan' ? 'rgba(6, 182, 212, 0.4)' :
                             item.color === 'blue' ? 'rgba(59, 130, 246, 0.4)' :
                             item.color === 'purple' ? 'rgba(168, 85, 247, 0.4)' :
                             item.color === 'pink' ? 'rgba(236, 72, 153, 0.4)' :
                             'rgba(34, 197, 94, 0.4)'
                           }`
                         }} />
                    <div className="absolute inset-0 rounded-xl"
                         style={{ 
                           background: `linear-gradient(135deg, ${
                             item.color === 'cyan' ? 'rgba(6, 182, 212, 0.05)' :
                             item.color === 'blue' ? 'rgba(59, 130, 246, 0.05)' :
                             item.color === 'purple' ? 'rgba(168, 85, 247, 0.05)' :
                             item.color === 'pink' ? 'rgba(236, 72, 153, 0.05)' :
                             'rgba(34, 197, 94, 0.05)'
                           }, transparent)`
                         }} />
                  </>
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