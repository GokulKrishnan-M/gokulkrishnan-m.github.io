import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Scene3D } from '../Scene3D';
import { ParticleBackground } from '../ParticleBackground';
import { Download, ArrowDown } from 'lucide-react';

export const HeroSection = () => {
  const [particleType, setParticleType] = useState(0);
  const handleParticleChange = () => setParticleType((prev) => (prev + 1) % 3);

  // Typing animation for "Design & Development"
  const fullText = "Design & Development";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    let typingInterval: NodeJS.Timeout;
    let restartTimeout: NodeJS.Timeout;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        setTypedText(fullText.slice(0, i + 1));
        i++;
        if (i > fullText.length) {
          clearInterval(typingInterval);
          restartTimeout = setTimeout(() => {
            i = 0;
            setTypedText("");
            startTyping();
          }, 5000); // Wait 5 seconds before restarting
        }
      }, 150);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(restartTimeout);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onClick={handleParticleChange}
    >
      <ParticleBackground type={particleType} />
      <Scene3D />

      <div className="relative z-20 max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start text-left">
        {/* Profile Picture */}
        <div className="flex justify-center md:justify-start mb-8 md:mb-0 md:mr-10 relative">
          {/* Animated layered profile image */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Outer animated glow layer */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ zIndex: 1 }}
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-56 h-56 rounded-full bg-cyan-400/30 blur-2xl" />
            </motion.div>
            {/* Middle animated ring layer */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: 2 }}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-52 h-52 rounded-full border-4 border-purple-400/60" />
            </motion.div>
            {/* Profile image */}
            <img
              src="/GM.png"
             
              className="w-48 h-48 rounded-full object-cover relative z-10 shadow-2xl"
              style={{ border: "none" }}
            />
          </motion.div>
        </div>
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-700 bg-clip-text text-transparent text-left whitespace-nowrap"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              Gokul Krishnan M
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-muted-foreground text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span>
                {typedText}
                <span className="border-r-2 border-primary animate-pulse">&nbsp;</span>
              </span>
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-start items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="glass hover-glow bg-gradient-primary text-primary-foreground hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
              >
                Explore Portfolio
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
                asChild
              >
                <a
                  href="/Gokul Krishnan M - CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        {/* Arrow stays centered at bottom */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-primary"
          >
            <ArrowDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 z-10" />
    </section>
  );
};