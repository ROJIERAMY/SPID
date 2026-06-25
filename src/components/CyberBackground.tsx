import { motion } from 'motion/react';

export default function CyberBackground() {
  // Generate random points for floating digital nodes
  const nodes = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * -20,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 1. Base Tech grid background */}
      <div className="absolute inset-0 cyber-grid opacity-[0.4]" />

      {/* 2. Slanted tech grid to give perspective / 3D feel */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, transparent 30%, #050505 80%), linear-gradient(rgba(0, 130, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 130, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-10%) scale(1.5)',
          transformOrigin: 'top center',
        }}
      />

      {/* 3. Catchy animated gradient glowing meshes (Vibrant Blue & Deep Red) */}
      <motion.div
        animate={{
          x: ['0%', '15%', '-10%', '0%'],
          y: ['0%', '-15%', '10%', '0%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-secondary/15 blur-[120px] mix-blend-screen"
      />

      <motion.div
        animate={{
          x: ['0%', '-20%', '15%', '0%'],
          y: ['0%', '20%', '-15%', '0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-primary/10 blur-[130px] mix-blend-screen"
      />

      <motion.div
        animate={{
          x: ['0%', '10%', '-15%', '0%'],
          y: ['0%', '15%', '-20%', '0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[40%] right-[15%] w-[35vw] h-[35vw] max-w-[400px] rounded-full bg-secondary/10 blur-[100px] mix-blend-screen"
      />

      {/* 4. Slow-floating holographic cyber nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          animate={{
            y: ['0%', '-15%', '15%', '0%'],
            x: ['0%', '10%', '-10%', '0%'],
            opacity: [0.2, 0.6, 0.4, 0.2],
          }}
          transition={{
            duration: node.duration,
            delay: node.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full bg-secondary shadow-[0_0_8px_rgba(0,130,255,0.8)]"
          style={{
            width: `${node.size}px`,
            height: `${node.size}px`,
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
        />
      ))}

      {/* 5. Additional light theme white visual mask */}
      <div className="absolute inset-0 bg-background/25 pointer-events-none mix-blend-overlay" />
    </div>
  );
}
