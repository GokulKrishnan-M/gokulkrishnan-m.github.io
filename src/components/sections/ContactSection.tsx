import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Twitter, Instagram, MessageCircle } from 'lucide-react'; // Add MessageCircle or any WhatsApp icon you prefer
import { useToast } from '@/hooks/use-toast';

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    
    setIsSubmitting(false);
  };

  // Update your socialLinks array with your actual LinkedIn and GitHub accounts:
  const socialLinks = [
    { icon: Github, href: "https://github.com/GokulKrishnan-M", label: "GitHub", color: "hover:text-primary" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/gokul-krishnan-m/", label: "LinkedIn", color: "hover:text-secondary" },
    { icon: Instagram, href: "https://instagram.com/gokul.krishnan.__", label: "Instagram", color: "hover:text-accent" },
    { 
      icon: Mail, 
      href: "mailto:gokulkrishnan242002@gmail.com", // <-- direct mailto link
      label: "Email", 
      color: "hover:text-primary" 
    }
  ];

  return (
    <section ref={ref} className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-gradient-secondary">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have something in mind? Let’s talk and make it happen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-primary">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Input
                      placeholder="First Name"
                      className="glass border-primary/20 focus:border-primary bg-background-secondary"
                      required
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Input
                      placeholder="Last Name"
                      className="glass border-primary/20 focus:border-primary bg-background-secondary"
                      required
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="glass border-primary/20 focus:border-primary bg-background-secondary"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Input
                    placeholder="Subject"
                    className="glass border-primary/20 focus:border-primary bg-background-secondary"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Textarea
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="glass border-primary/20 focus:border-primary bg-background-secondary"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="flex gap-2"
                >
                  {/* WhatsApp button on the left */}
                  <a
                    href="https://wa.me/917510367210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-black text-white font-semibold text-lg transition-all duration-300"
                    style={{ width: 48, height: 48 }}
                    title="Message me on WhatsApp"
                  >
                    {/* Minimal WhatsApp logo: only white speech bubble with handset, no green circle */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 32 32"
                      fill="none"
                      className="w-10 h-10"
                    >
                      <path
                        d="M16 7C11.03 7 7 11.03 7 16c0 1.23.25 2.41.73 3.53L7 25l5.47-.73A8.97 8.97 0 0 0 16 25c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-1.13 0-2.23-.22-3.27-.65l-.23-.1-3.07.41.41-3.07-.1-.23A7.01 7.01 0 1 1 16 23zm3.13-5.13c-.17-.09-1.01-.5-1.17-.56-.16-.06-.28-.09-.4.09-.12.17-.46.56-.56.67-.1.11-.21.13-.38.04-.17-.09-.72-.27-1.37-.84-.51-.45-.85-1-.95-1.17-.1-.17-.01-.26.08-.35.09-.09.2-.23.29-.31.1-.08.13-.17.19-.28.06-.11.03-.21-.01-.3-.04-.09-.36-.87-.5-1.19-.13-.32-.27-.27-.37-.28-.09-.01-.21-.01-.33-.01-.11 0-.29.04-.44.2-.15.16-.59.58-.59 1.41 0 .83.6 1.63.68 1.75.08.12 1.18 1.87 2.98 2.56.41.16.73.25.98.32.41.13.78.11 1.07.07.33-.05 1.01-.41 1.15-.8.14-.39.14-.72.1-.79-.04-.07-.15-.11-.32-.2z"
                        fill="#fff"
                      />
                    </svg>
                  </a>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-primary hover:scale-105 transition-all duration-300 text-lg py-6"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-secondary">Get in Touch</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  I'm always open to discussing new opportunities, creative projects, 
                  or just having a chat about technology and design.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>gokulkrishnan242002@gmail.com</span><br></br>
                    </div>
                      <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 text-secondary text-center">📞</span>
                    <span>+917510367210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 text-secondary text-center">📍</span>
                    <div>
                      <span className="text-base">Kottayam, Kerala</span>
                      <br />
                      <span className="text-base text-white">India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-accent">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className={`flex items-center space-x-3 p-4 rounded-lg bg-background-secondary hover-glow transition-all duration-300 ${link.color}`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};