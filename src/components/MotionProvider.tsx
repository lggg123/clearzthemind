'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionProviderProps {
  children: ReactNode;
}

export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig
        reducedMotion="user"
        transition={{
          type: "tween",
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
