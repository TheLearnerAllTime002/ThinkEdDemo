import React from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useParallax';
import { useAnimationConfig } from '../../hooks/useReducedMotion';

const BackgroundEffects = ({ variant = 'default', className = '' }) => {
  const mouseParallax = useMouseParallax(0.02);
  const { getAnimationProps } = useAnimationConfig();

  const FloatingShape = ({ 
    size, 
    color, 
    position, 
    animationDelay = 0, 
    animationDuration = 6,
    shape = 'circle' 
  }) => {
    const floatVariants = getAnimationProps({
      animate: {
        y: [-20, 20, -20],
        rotate: [0, 5, 0],
        scale: [1, 1.1, 1]
      },
      transition: {
        duration: animationDuration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: animationDelay
      }
    });

    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-2xl',
      triangle: 'rounded-lg transform rotate-45',
      hexagon: 'rounded-3xl'
    };

    return (
      <motion.div
        className={`absolute ${shapeClasses[shape]} ${color} ${size} ${position} opacity-20 blur-sm`}
        style={{
          x: mouseParallax.x,
          y: mouseParallax.y
        }}
        {...floatVariants}
      />
    );
  };

  const GradientOrb = ({ size, position, colors, animationDelay = 0 }) => {
    const orbVariants = getAnimationProps({
      animate: {
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3]
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: animationDelay
      }
    });

    return (
      <motion.div
        className={`absolute ${size} ${position} rounded-full blur-3xl`}
        style={{
          background: `radial-gradient(circle, ${colors.join(', ')})`
        }}
        {...orbVariants}
      />
    );
  };

  const ParticleField = ({ count = 20 }) => {
    const particles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5
    }));

    return (
      <>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </>
    );
  };

  const renderVariant = () => {
    switch (variant) {
      case 'hero':
        return (
          <>
            {/* Large gradient orbs */}
            <GradientOrb
              size="w-96 h-96"
              position="top-10 -left-20"
              colors={['rgba(74, 155, 142, 0.3)', 'rgba(139, 92, 246, 0.2)', 'transparent']}
              animationDelay={0}
            />
            <GradientOrb
              size="w-80 h-80"
              position="bottom-20 -right-16"
              colors={['rgba(245, 158, 11, 0.3)', 'rgba(74, 155, 142, 0.2)', 'transparent']}
              animationDelay={2}
            />

            {/* Floating geometric shapes */}
            <FloatingShape
              size="w-20 h-20"
              color="bg-gradient-to-br from-primary/20 to-secondary/20"
              position="top-20 left-10"
              animationDelay={0}
              animationDuration={6}
              shape="circle"
            />
            <FloatingShape
              size="w-16 h-16"
              color="bg-gradient-to-br from-secondary/20 to-accent/20"
              position="top-40 right-20"
              animationDelay={1}
              animationDuration={8}
              shape="square"
            />
            <FloatingShape
              size="w-12 h-12"
              color="bg-gradient-to-br from-accent/20 to-primary/20"
              position="bottom-40 left-20"
              animationDelay={2}
              animationDuration={7}
              shape="triangle"
            />
            <FloatingShape
              size="w-24 h-24"
              color="bg-gradient-to-br from-primary/15 to-accent/15"
              position="bottom-20 right-10"
              animationDelay={3}
              animationDuration={9}
              shape="hexagon"
            />

            {/* Particle field */}
            <ParticleField count={30} />
          </>
        );

      case 'features':
        return (
          <>
            {/* Medium gradient orbs */}
            <GradientOrb
              size="w-64 h-64"
              position="top-0 left-0"
              colors={['rgba(139, 92, 246, 0.2)', 'rgba(74, 155, 142, 0.1)', 'transparent']}
              animationDelay={1}
            />
            <GradientOrb
              size="w-48 h-48"
              position="bottom-0 right-0"
              colors={['rgba(74, 155, 142, 0.2)', 'rgba(245, 158, 11, 0.1)', 'transparent']}
              animationDelay={3}
            />

            {/* Smaller floating shapes */}
            <FloatingShape
              size="w-8 h-8"
              color="bg-primary/10"
              position="top-10 left-1/4"
              animationDelay={0}
              animationDuration={10}
              shape="circle"
            />
            <FloatingShape
              size="w-6 h-6"
              color="bg-secondary/10"
              position="top-20 right-1/3"
              animationDelay={2}
              animationDuration={12}
              shape="square"
            />

            {/* Subtle particle field */}
            <ParticleField count={15} />
          </>
        );

      case 'minimal':
        return (
          <>
            {/* Single gradient orb */}
            <GradientOrb
              size="w-32 h-32"
              position="top-10 right-10"
              colors={['rgba(74, 155, 142, 0.1)', 'transparent']}
              animationDelay={0}
            />

            {/* Few floating shapes */}
            <FloatingShape
              size="w-4 h-4"
              color="bg-primary/5"
              position="top-1/4 left-1/4"
              animationDelay={1}
              animationDuration={15}
              shape="circle"
            />
            <FloatingShape
              size="w-3 h-3"
              color="bg-accent/5"
              position="bottom-1/4 right-1/4"
              animationDelay={3}
              animationDuration={18}
              shape="square"
            />
          </>
        );

      default:
        return (
          <>
            {/* Default background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
            
            {/* Simple gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
          </>
        );
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {renderVariant()}
      
      {/* Animated grid pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74, 155, 142, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 155, 142, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
};

export default BackgroundEffects;