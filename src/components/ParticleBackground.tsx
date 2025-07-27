import { useEffect, useRef } from "react";

export const ParticleBackground = ({ type = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Game-themed cell colors
    const colors = [
      "#ffcb05", // yellow (coin)
      "#3b4cca", // blue (power-up)
      "#e3350d", // red (enemy)
      "#7bcf5e", // green (health)
      "#f7b7a3", // pink (bonus)
      "#313131", // dark (obstacle)
    ];

    // Game cell shapes: circle (coin), square (block), triangle (power-up) with texture
    function drawCell(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, type: string, color: string) {
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
      ctx.fillStyle = color;

      // Draw main shape
      if (type === "coin") {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Add radial gradient texture
        const grad = ctx.createRadialGradient(x, y, size * 0.2, x, y, size);
        grad.addColorStop(0, "#fff6");
        grad.addColorStop(0.7, color);
        grad.addColorStop(1, "#0000");
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      } else if (type === "block") {
        ctx.beginPath();
        ctx.rect(x - size, y - size, size * 2, size * 2);
        ctx.fill();

        // Add grid texture
        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = "#fff";
        for (let i = -size; i < size; i += size / 2) {
          ctx.beginPath();
          ctx.moveTo(x - size, y + i);
          ctx.lineTo(x + size, y + i);
          ctx.moveTo(x + i, y - size);
          ctx.lineTo(x + i, y + size);
          ctx.stroke();
        }
      } else if (type === "powerup") {
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size, y + size);
        ctx.lineTo(x + size, y + size);
        ctx.closePath();
        ctx.fill();

        // Add triangle lines texture
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(x, y - size * 0.7);
        ctx.lineTo(x, y + size * 0.7);
        ctx.moveTo(x - size * 0.7, y + size * 0.7);
        ctx.lineTo(x + size * 0.7, y + size * 0.7);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Generate game cells
    const cellTypes = ["coin", "block", "powerup"];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      type: string;
    }> = [];

    for (let i = 0; i < 50; i++) {
      const type = cellTypes[i % cellTypes.length];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 12 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and animate game cells
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < -30) particle.x = canvas.width + 30;
        if (particle.x > canvas.width + 30) particle.x = -30;
        if (particle.y < -30) particle.y = canvas.height + 30;
        if (particle.y > canvas.height + 30) particle.y = -30;

        drawCell(ctx, particle.x, particle.y, particle.size, particle.type, particle.color);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Use the type prop to change style, color, shape, etc.
  // Example: switch between different configs
  if (type === 0) {
    // Render style 1
  } else if (type === 1) {
    // Render style 2
  } else {
    // Render style 3
  }
  // ...

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};