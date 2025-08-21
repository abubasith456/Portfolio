import React, { useEffect, useRef } from 'react';

const DeveloperBackground: React.FC = () => {
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

    // Matrix rain effect
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const matrixColumns: { x: number; y: number; speed: number; chars: string[] }[] = [];

    // Initialize matrix columns
    for (let i = 0; i < 50; i++) {
      matrixColumns.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2,
        chars: Array.from({ length: 20 }, () => matrixChars[Math.floor(Math.random() * matrixChars.length)])
      });
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '12px JetBrains Mono';
      ctx.fillStyle = '#06b6d4';

      matrixColumns.forEach(column => {
        column.chars.forEach((char, index) => {
          const y = column.y - (index * 20);
          const opacity = 1 - (index * 0.05);
          
          ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.fillText(char, column.x, y);
        });

        column.y += column.speed;
        if (column.y > canvas.height + 400) {
          column.y = -200;
          column.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="dev-background coding-bg">
      {/* Canvas for matrix effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ zIndex: -1 }}
      />
      
      {/* Floating code elements */}
      <div className="code-element">const developer = "Mohamed";</div>
      <div className="code-element">function create() {"{...}"}</div>
      <div className="code-element">if (passion) code();</div>
      <div className="code-element">npm install awesome</div>
      
      {/* Developer-themed floating elements */}
      <div className="dev-element" style={{ width: '80px', height: '80px', top: '15%', left: '8%', animationDelay: '0s' }} />
      <div className="dev-element" style={{ width: '60px', height: '60px', top: '25%', right: '12%', animationDelay: '2s' }} />
      <div className="dev-element" style={{ width: '100px', height: '100px', bottom: '20%', left: '18%', animationDelay: '4s' }} />
      <div className="dev-element" style={{ width: '40px', height: '40px', bottom: '30%', right: '25%', animationDelay: '6s' }} />
      
      {/* Terminal windows */}
      <div className="absolute top-1/4 left-1/4 terminal-window opacity-10" style={{ width: '200px', transform: 'rotate(-5deg)' }}>
        <div className="terminal-header">Terminal</div>
        <div className="terminal-content text-xs">
          <div>$ npm start</div>
          <div>Starting development server...</div>
          <div>✓ Ready on http://localhost:3000</div>
        </div>
      </div>
      
      <div className="absolute bottom-1/4 right-1/4 terminal-window opacity-10" style={{ width: '180px', transform: 'rotate(3deg)' }}>
        <div className="terminal-header">Git</div>
        <div className="terminal-content text-xs">
          <div>$ git commit -m "feat: amazing code"</div>
          <div>[main abc1234] feat: amazing code</div>
          <div>1 file changed, 42 insertions(+)</div>
        </div>
      </div>
      
      {/* Code brackets and symbols */}
      <div className="absolute top-1/3 right-1/3 text-4xl opacity-5 text-accent-secondary" style={{ transform: 'rotate(15deg)' }}>
        {'{'}
      </div>
      <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-5 text-accent-tertiary" style={{ transform: 'rotate(-10deg)' }}>
        {'}'}
      </div>
      <div className="absolute top-1/2 left-1/2 text-2xl opacity-5 text-accent-primary" style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}>
        {'</>'}
      </div>
    </div>
  );
};

export default DeveloperBackground;