'use client';

import Link from 'next/link';
import { Brain } from 'lucide-react';
import { usePathname } from 'next/navigation';

const NavigationBar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/showcase', label: 'Demo', id: 'product' },
    { href: '/pitch', label: 'Pitch', id: 'pitch' },
    { href: '/financials', label: 'Financials', id: 'financials' },
    { href: '/contact', label: 'Contact', id: 'contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Brain className="w-8 h-8 text-cyan-500 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900 group-hover:text-cyan-500 transition-colors duration-300">
              FRANK
            </span>
            <span className="text-sm text-gray-600 font-medium hidden sm:block">
              Robotics
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`font-medium transition-all duration-300 relative group ${
                pathname === item.href
                  ? 'text-cyan-500'
                  : 'text-gray-600 hover:text-cyan-500'
              }`}
            >
              {item.label}
              {/* Active indicator */}
              <div className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${
                pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;