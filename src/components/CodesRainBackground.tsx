import React, { useRef, useEffect } from "react";

const CODE_CHARS = ["{", "}", "(", ")", ";", "<", ">", "=", "+", "-", "*", "/", "[", "]", ":", ".", ",", "|", "&"];

const CodesRainBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    const fontSize = 26;
    let columns = Math.floor(w / fontSize);
    let drops: number[] = Array(columns).fill(0).map(() => Math.random() * h / fontSize);

    function setupCanvas() {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      columns = Math.floor(w / fontSize);
      drops = Array(columns).fill(0).map(() => Math.random() * h / fontSize);
    }

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < columns; i++) {
        const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize + fontSize / 2;

        ctx.save();
        ctx.font = `${fontSize}px 'Fira Mono', 'Consolas', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "hsl(200,100%,70%)";
        ctx.shadowBlur = 16;
        ctx.fillStyle = "hsl(200,100%,70%)";
        ctx.globalAlpha = 0.2; // More transparent codes
        ctx.fillText(char, x, y);
        ctx.restore();

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += 0.08 + Math.random() * 0.08; // Much slower speed
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    setupCanvas();
    draw();

    function handleResize() {
      setupCanvas();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100vh",
        display: "block",
        position: "absolute",
        inset: 0,
        zIndex: -1,
      }}
    />
  );
};

export default CodesRainBackground;