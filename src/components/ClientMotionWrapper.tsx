'use client';

import { useEffect, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ClientMotionWrapperProps extends MotionProps {
  children: React.ReactNode;
  as?: keyof typeof motion;
  className?: string;
}

export default function ClientMotionWrapper({ 
  children, 
  as = 'div', 
  className,
  ...motionProps 
}: ClientMotionWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure all hydration is complete
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50); // Increased delay slightly
    
    return () => clearTimeout(timer);
  }, []);

  // Error boundary fallback
  if (hasError) {
    if (as === 'div') {
      return <div className={className}>{children}</div>;
    }
    if (as === 'section') {
      return <section className={className}>{children}</section>;
    }
    if (as === 'h1') {
      return <h1 className={className}>{children}</h1>;
    }
    if (as === 'h2') {
      return <h2 className={className}>{children}</h2>;
    }
    if (as === 'h3') {
      return <h3 className={className}>{children}</h3>;
    }
    if (as === 'p') {
      return <p className={className}>{children}</p>;
    }
    return <div className={className}>{children}</div>;
  }

  if (!isMounted) {
    // Render a static version during SSR and initial hydration
    if (as === 'div') {
      return <div className={className}>{children}</div>;
    }
    if (as === 'section') {
      return <section className={className}>{children}</section>;
    }
    if (as === 'h1') {
      return <h1 className={className}>{children}</h1>;
    }
    if (as === 'h2') {
      return <h2 className={className}>{children}</h2>;
    }
    if (as === 'h3') {
      return <h3 className={className}>{children}</h3>;
    }
    if (as === 'p') {
      return <p className={className}>{children}</p>;
    }
    // Default fallback
    return <div className={className}>{children}</div>;
  }

  try {
    const MotionComponent = motion[as] as React.ComponentType<MotionProps & { className?: string }>;

    // Create a safe version of motionProps to prevent re-rendering on deployment
    const safeMotionProps = {
      ...motionProps,
      // Ensure viewport props are properly set
      ...(motionProps.whileInView && {
        viewport: { once: true, amount: 0.2 }
      })
    };

    // Render with motion after hydration
    return (
      <MotionComponent className={className} {...safeMotionProps}>
        {children}
      </MotionComponent>
    );
  } catch (error) {
    console.warn('Motion component error, falling back to static:', error);
    setHasError(true);
    
    // Immediate fallback
    if (as === 'div') {
      return <div className={className}>{children}</div>;
    }
    if (as === 'section') {
      return <section className={className}>{children}</section>;
    }
    if (as === 'h1') {
      return <h1 className={className}>{children}</h1>;
    }
    if (as === 'h2') {
      return <h2 className={className}>{children}</h2>;
    }
    if (as === 'h3') {
      return <h3 className={className}>{children}</h3>;
    }
    if (as === 'p') {
      return <p className={className}>{children}</p>;
    }
    return <div className={className}>{children}</div>;
  }
}
