import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showShowcasePopup, setShowShowcasePopup] = useState(false);
  const [showcaseFullImage, setShowcaseFullImage] = useState<string | null>(null);
  const [showcaseFullImageIdx, setShowcaseFullImageIdx] = useState<number>(0);

  const timelineItems = [
    {
      year: "2024 - 2026",
      title: "Master of Computer Applications (MCA)",
      company: "Santhigiri College - MG University",
      description: "Continuing my academic path to gain deeper insights into modern software systems and technology trends."
    },
    {
      year: "June - Nov, 2023",
      title: "Flutter App Development",
      company: "Luminar Technolab",
      description: "Learned in developing android apps using flutter, animated user interfaces with modern frameworks."
    },
    {
      year: "Oct 2022 | April 2023",
      title: "Project on PHP and Python",
      company: "ZION IT & LCC",
      description: "Learned Web Development by working on PHP & Python-based projects for emphasizing functionality, clarity, and performance."
    },
    {
      year: "2020 - 2023",
      title: "Bachelor of Computer Applications (BCA)",
      company: "Mangalam MC Vargheese College - MG University",
      description: "Started my journey in BCA, diving into programming languages, database systems, and software development best practices."
    },
  ];

  // Showcase cards data
  const showcaseCards = [
    {
      img: "Flutter.jpg",
      alt: "Flutter",
      title: "Flutter >"
    },
    {
      img: "PHP.jpg",
      alt: "PHP Project",
      title: "PHP Project"
    },
    {
      img: "Addon - Web Design.jpg",
      alt: "Addon - Web Design",
      title: "Addon - Web Design"
    },
    {
      img: "Python.jpg",
      alt: "Python",
      title: "Python Project"
    }
  ];

  const openFullImage = (img: string, idx: number) => {
    setShowcaseFullImage(img);
    setShowcaseFullImageIdx(idx);
  };

  const showPrevImage = () => {
    const prevIdx = (showcaseFullImageIdx - 1 + showcaseCards.length) % showcaseCards.length;
    setShowcaseFullImage(showcaseCards[prevIdx].img);
    setShowcaseFullImageIdx(prevIdx);
  };

  const showNextImage = () => {
    const nextIdx = (showcaseFullImageIdx + 1) % showcaseCards.length;
    setShowcaseFullImage(showcaseCards[nextIdx].img);
    setShowcaseFullImageIdx(nextIdx);
  };

  // Keyboard navigation for full image modal
  useEffect(() => {
    if (!showcaseFullImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'Escape') {
        setShowcaseFullImage(null); // Only close the image modal, not the main popup
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showcaseFullImage, showcaseFullImageIdx]);

  // Close showcase popup on Escape key press, but only if image modal is NOT open
  useEffect(() => {
    if (!showShowcasePopup || showcaseFullImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowShowcasePopup(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showShowcasePopup, showcaseFullImage]);

  return (
    <section ref={ref} className="py-20 px-6 relative overflow-hidden">
      {/* Background shapes */}
      <motion.div className="absolute top-10 left-0 z-0" initial={{ x: -60, opacity: 0 }} animate={isInView ? { x: 0, opacity: 0.5 } : {}} transition={{ duration: 1.2, ease: "easeOut" }}>
        <div className="w-24 h-24 rounded-full bg-cyan-400/30 blur-2xl" />
      </motion.div>
      <motion.div className="absolute bottom-10 right-0 z-0" initial={{ x: 60, opacity: 0 }} animate={isInView ? { x: 0, opacity: 0.5 } : {}} transition={{ duration: 1.2, ease: "easeOut" }}>
        <div className="w-20 h-20 bg-pink-400/30 rotate-12 blur-2xl" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* About Me */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-gradient-secondary">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
       Aspiring web developer who enjoys building simple, easy-to-use websites. Also into game development and love creating fun digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hello, I'm Gokul */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="glass p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-glow opacity-20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-primary">Hello, I'm Gokul!</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-justify max-w-xl mx-auto">
                  As a BCA graduate, pursuing MCA with a strong foundation in web development and a growing interest in game development. I specialize in building responsive, user-friendly websites using HTML, CSS, and JavaScript. Alongside web technologies, I am also exploring the fundamentals of game design and programming. Committed to continuous learning and clean coding practices, I aim to contribute to innovative, engaging digital experiences in both web and interactive media.
                </p>
                <div className="mb-8" /> {/* Added more space after the paragraph */}

                {/* Showcase Section under Gokul card */}
                <div className="mb-6">
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-background-secondary">
                    <div className="text-2xl font-bold text-primary">10+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background-secondary">
                    <div className="text-2xl font-bold text-secondary">2+</div>
                    <div className="text-sm text-muted-foreground">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="relative">
            <h3 className="text-2xl font-bold mb-8 text-accent">My Journey</h3>
            <div className="space-y-8">
              {timelineItems.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }} className="relative pl-8 border-l-2 border-primary/30">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-primary rounded-full shadow-glow" />
                  <div className="glass p-6 rounded-xl hover-glow hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-secondary mb-2">{item.company}</p>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Showcase Popup */}
        {showShowcasePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <div className="bg-zinc-900 rounded-2xl shadow-2xl p-12 max-w-7xl w-full relative">
              <button
                className="absolute top-4 right-4 text-white text-xl"
                onClick={() => setShowShowcasePopup(false)}
              >
                <span className="text-2xl font-bold">&times;</span>
              </button>
              <h3 className="text-2xl font-bold mb-8 text-accent text-center">Showcase</h3>
              <div className="flex gap-12 justify-center items-stretch flex-wrap">
                {showcaseCards.map((card, idx) => (
                  <img
                    key={idx}
                    src={card.img}
                    alt={card.alt}
                    className="transition-all duration-300 cursor-pointer hover:shadow-2xl"
                    style={{
                      aspectRatio: '2/3',
                      minWidth: '140px',
                      maxWidth: '180px',
                      minHeight: '180px',
                      maxHeight: '240px',
                      width: '100%',
                      height: '180px',
                      objectFit: 'contain',
                      background: 'transparent',
                      border: 'none',
                      boxShadow: 'none'
                    }}
                    onClick={() => openFullImage(card.img, idx)}
                  />
                ))}
              </div>
              {/* Full Image Modal with navigation (arrows slightly away from image) */}
              {showcaseFullImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
                  {/* Previous Button */}
                  <button
                    className="fixed left-0 top-1/2 -translate-y-1/2 text-white text-3xl px-4 py-2 z-50 rounded-full hover:bg-black/80"
                    style={{ 
                      transform: 'translateY(-50%)', 
                      left: '12vw',
                      background: 'rgba(0,0,0,0.5)', // 50% transparent background
                      opacity: 0.3 // 50% transparent button
                    }}
                    onClick={showPrevImage}
                    aria-label="Previous"
                  >
                    &#8592;
                  </button>
                  {/* Close button fixed above and outside the image area, centered horizontally */}
                  <button
                    className="fixed top-2 left-1/2 -translate-x-1/2 text-white text-3xl z-50 rounded-full hover:bg-black/80"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      opacity: 0.3
                    }}
                    onClick={() => setShowcaseFullImage(null)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <div className="relative flex items-center">
                    <img
                      src={showcaseFullImage}
                      alt="Full Showcase"
                      className="max-h-[80vh] max-w-[90vw] shadow-2xl"
                      style={{
                        objectFit: 'contain',
                        background: 'transparent',
                        border: 'none',
                        boxShadow: 'none'
                      }}
                    />
                  </div>
                  {/* Next Button */}
                  <button
                    className="fixed right-0 top-1/2 -translate-y-1/2 text-white text-3xl px-4 py-2 z-50 rounded-full hover:bg-black/80"
                    style={{ 
                      transform: 'translateY(-50%)', 
                      right: '12vw',
                      background: 'rgba(0,0,0,0.5)',
                      opacity: 0.3
                    }}
                    onClick={showNextImage}
                    aria-label="Next"
                  >
                    &#8594;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
