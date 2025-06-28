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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const MotionComponent = motion[as] as React.ComponentType<MotionProps & { className?: string }>;

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

  // Render with motion after hydration
  return (
    <MotionComponent className={className} {...motionProps}>
      {children}
    </MotionComponent>
  );
}
