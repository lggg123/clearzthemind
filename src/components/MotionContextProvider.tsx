'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MotionContextType {
  isMotionEnabled: boolean;
  disableMotion: () => void;
  enableMotion: () => void;
}

const MotionContext = createContext<MotionContextType>({
  isMotionEnabled: true,
  disableMotion: () => {},
  enableMotion: () => {}
});

export const useMotionContext = () => useContext(MotionContext);

interface MotionContextProviderProps {
  children: ReactNode;
}

export default function MotionContextProvider({ children }: MotionContextProviderProps) {
  const [isMotionEnabled, setIsMotionEnabled] = useState(false);

  useEffect(() => {
    // Start with motion disabled and enable only after everything is mounted
    const timer = setTimeout(() => {
      try {
        // Test if motion is safe to enable
        if (typeof window !== 'undefined' && document.body) {
          setIsMotionEnabled(true);
        }
      } catch (error) {
        console.warn('Motion remains disabled due to error:', error);
      }
    }, 200);

    // Global error handler to disable motion on any motion-related errors
    const handleError = (event: ErrorEvent) => {
      if (event.error?.message?.includes('motion') || 
          event.error?.message?.includes('framer') ||
          event.error?.message?.includes('invariant')) {
        console.warn('Motion error detected, disabling motion:', event.error);
        setIsMotionEnabled(false);
      }
    };

    window.addEventListener('error', handleError);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('error', handleError);
    };
  }, []);

  const disableMotion = () => setIsMotionEnabled(false);
  const enableMotion = () => setIsMotionEnabled(true);

  return (
    <MotionContext.Provider value={{ isMotionEnabled, disableMotion, enableMotion }}>
      {children}
    </MotionContext.Provider>
  );
}
