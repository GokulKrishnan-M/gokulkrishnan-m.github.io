import { useEffect } from 'react';

export const CustomCursor = ({
  size = 36, // slightly larger for visibility
}: { size?: number }) => {
  useEffect(() => {
    // Normal state: blue gradient, dark edge
    const normalSvg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#60a5fa"/>
            <stop offset="100%" stop-color="#3b82f6"/>
          </linearGradient>
        </defs>
        <polygon points="4,4 ${size-4},${size/2} ${size/2},${size/2} ${size/2},${size-4} 4,4" fill="url(#grad)" stroke="#1e293b" stroke-width="2"/>
      </svg>`;

    // Active/selected/button-hover state: cyan gradient, neon edge
    const activeSvg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#67e8f9"/>
            <stop offset="100%" stop-color="#06b6d4"/>
          </linearGradient>
        </defs>
        <polygon points="4,4 ${size-4},${size/2} ${size/2},${size/2} ${size/2},${size-4} 4,4" fill="url(#grad)" stroke="#06b6d4" stroke-width="3"/>
      </svg>`;

    const setCursor = (svg: string) => {
      const encoded = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
      document.body.style.cursor = `url("${encoded}") 0 0, auto`;
    };

    // Set normal cursor by default
    setCursor(normalSvg);

    // Change cursor on button/interactive hover or mousedown
    const handlePointerDown = () => setCursor(activeSvg);
    const handlePointerUp = () => setCursor(normalSvg);

    // Change cursor on hover for all buttons and interactive elements
    const interactiveSelectors = 'button, a, [role="button"], input, textarea, select, label, [tabindex]:not([tabindex="-1"])';
    const interactiveElements = Array.from(document.querySelectorAll(interactiveSelectors));

    const handleMouseEnter = () => setCursor(activeSvg);
    const handleMouseLeave = () => setCursor(normalSvg);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [size]);

  return null;
};
