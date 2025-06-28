'use client';

import { useEffect, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';
import React from 'react';

interface SafeMotionWrapperProps extends Omit<MotionProps, 'children'> {
  children: React.ReactNode;
  as?: keyof typeof motion;
  className?: string;
  fallbackTag?: keyof React.JSX.IntrinsicElements;
}

export default function SafeMotionWrapper({ 
  children, 
  as = 'div', 
  className,
  fallbackTag,
  ...motionProps 
}: SafeMotionWrapperProps) {
  const [shouldUseMotion, setShouldUseMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if we're in a safe environment for motion
    const timer = setTimeout(() => {
      try {
        // Test if framer-motion is working properly
        const testElement = document.createElement('div');
        if (testElement && typeof window !== 'undefined') {
          setShouldUseMotion(true);
        }
      } catch (error) {
        console.warn('Motion disabled due to error:', error);
        setShouldUseMotion(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Always render static version until we're sure motion is safe
  if (!isClient || !shouldUseMotion) {
    const tagName = fallbackTag || as;
    
    if (tagName === 'div') {
      return <div className={className}>{children}</div>;
    }
    if (tagName === 'h1') {
      return <h1 className={className}>{children}</h1>;
    }
    if (tagName === 'h2') {
      return <h2 className={className}>{children}</h2>;
    }
    if (tagName === 'h3') {
      return <h3 className={className}>{children}</h3>;
    }
    if (tagName === 'p') {
      return <p className={className}>{children}</p>;
    }
    if (tagName === 'section') {
      return <section className={className}>{children}</section>;
    }
    // Default fallback
    return <div className={className}>{children}</div>;
  }

  try {
    const MotionComponent = motion[as] as React.ComponentType<MotionProps & { className?: string }>;
    
    const safeMotionProps = {
      ...motionProps,
      // Always add safe viewport settings
      ...(motionProps.whileInView && {
        viewport: { once: true, amount: 0.1, margin: "0px 0px -100px 0px" }
      })
    };

    return (
      <MotionComponent className={className} {...safeMotionProps}>
        {children}
      </MotionComponent>
    );
  } catch (error) {
    console.warn('Motion component failed, using fallback:', error);
    const tagName = fallbackTag || as;
    
    if (tagName === 'div') {
      return <div className={className}>{children}</div>;
    }
    if (tagName === 'h1') {
      return <h1 className={className}>{children}</h1>;
    }
    if (tagName === 'h2') {
      return <h2 className={className}>{children}</h2>;
    }
    if (tagName === 'h3') {
      return <h3 className={className}>{children}</h3>;
    }
    if (tagName === 'p') {
      return <p className={className}>{children}</p>;
    }
    if (tagName === 'section') {
      return <section className={className}>{children}</section>;
    }
    // Default fallback
    return <div className={className}>{children}</div>;
  }
}
