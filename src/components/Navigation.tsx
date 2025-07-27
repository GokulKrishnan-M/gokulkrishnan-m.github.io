import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Maximize2, Minimize2 } from 'lucide-react'; // Remove Zap if not needed

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            <img
              src="/GMz.png"
              alt="Gokul Logo"
              className="h-10 w-10 object-contain"
              style={{ display: 'inline-block' }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Fullscreen/Minimize Icon Button */}
          <button
            className="absolute top-2 right-6 z-50 p-3 rounded-lg bg-transparent shadow-none border-none hover:scale-110 transition-all group"
            style={{ position: "absolute", opacity: 0.3 }}
            title={isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
            onClick={() => {
              const el = document.documentElement;
              if (isFullscreen) {
                if (document.exitFullscreen) {
                  document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                  document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                  document.msExitFullscreen();
                }
              } else {
                if (el.requestFullscreen) {
                  el.requestFullscreen();
                } else if (el.webkitRequestFullscreen) {
                  el.webkitRequestFullscreen();
                } else if (el.mozRequestFullScreen) {
                  el.mozRequestFullScreen();
                } else if (el.msRequestFullscreen) {
                  el.msRequestFullscreen();
                }
              }
            }}
            type="button"
          >
            {/* Use Maximize2/Minimize2 for fullscreen/minimize */}
            {isFullscreen ? (
              <Minimize2 className="w-7 h-7 text-blue-400 drop-shadow-[0_0_16px_rgba(0,180,255,0.9)]" />
            ) : (
              <Maximize2 className="w-7 h-7 text-muted-foreground group-hover:text-blue-400 group-active:text-blue-400 transition-colors drop-shadow-[0_0_16px_rgba(0,180,255,0.9)]" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-primary"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-4 py-2 text-lg font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="px-4 pt-4"
            >
             
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};