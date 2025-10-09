// components/welcome-background.tsx
'use client';

import { useEffect, useRef } from 'react';

export function WelcomeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Load the logo image
    const logoImage = new Image();
    logoImage.src = '/logos/no-bg-ff.png';

    // Floating nodes (same as animated-background)
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const nodeCount = window.innerWidth < 768 ? 30 : 50; // Reduce nodes on mobile

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Check if mobile view
    const isMobile = window.innerWidth < 768;

    // Floating charts data - responsive layout
    const charts = isMobile ? [
      // Mobile layout - 4 charts total (2 on each side of welcome message)
      {
        type: 'line',
        x: canvas.width * 0.15,  // Left side
        y: canvas.height * 0.45, // Middle height
        size: 50,                // Smaller size for mobile
        rotation: 0,
        rotationSpeed: 0.002,
        data: [20, 45, 28, 80, 99, 43, 75]
      },
      {
        type: 'pie',
        x: canvas.width * 0.85,  // Right side
        y: canvas.height * 0.48, // Middle height
        size: 45,                // Smaller size for mobile
        rotation: 0,
        rotationSpeed: 0.004,
        data: [30, 25, 20, 25]
      },
      {
        type: 'bar',
        x: canvas.width * 0.12,  // Left side, slightly different position
        y: canvas.height * 0.65, // Lower
        size: 55,                // Smaller size for mobile
        rotation: 0,
        rotationSpeed: 0.003,
        data: [45, 70, 25, 85, 60]
      },
      {
        type: 'area',
        x: canvas.width * 0.88,  // Right side
        y: canvas.height * 0.62, // Lower
        size: 50,                // Smaller size for mobile
        rotation: 0,
        rotationSpeed: 0.006,
        opacity: 0.5,
        data: [10, 25, 40, 35, 60, 55, 80]
      }
    ] : [
      // Desktop layout - original 7 charts
      {
        type: 'line',
        x: canvas.width * 0.12,
        y: canvas.height * 0.15,
        size: 80,
        rotation: 0,
        rotationSpeed: 0.002,
        data: [20, 45, 28, 80, 99, 43, 75]
      },
      {
        type: 'pie',
        x: canvas.width * 0.88,
        y: canvas.height * 0.18,
        size: 75,
        rotation: 0,
        rotationSpeed: 0.004,
        data: [30, 25, 20, 25]
      },
      {
        type: 'bar',
        x: canvas.width * 0.08,
        y: canvas.height * 0.55,
        size: 85,
        rotation: 0,
        rotationSpeed: 0.003,
        data: [45, 70, 25, 85, 60]
      },
      {
        type: 'gauge',
        x: canvas.width * 0.92,
        y: canvas.height * 0.58,
        size: 70,
        rotation: 0,
        rotationSpeed: -0.003,
        opacity: 0.65,
        value: 75
      },
      {
        type: 'area',
        x: canvas.width * 0.25,
        y: canvas.height * 0.88,
        size: 85,
        rotation: 0,
        rotationSpeed: 0.006,
        opacity: 0.5,
        data: [10, 25, 40, 35, 60, 55, 80]
      },
      {
        type: 'line',
        x: canvas.width * 0.75,
        y: canvas.height * 0.85,
        size: 90,
        rotation: 0,
        rotationSpeed: -0.002,
        data: [10, 30, 60, 40, 85, 55, 95]
      },
      {
        type: 'bar',
        x: canvas.width * 0.50,
        y: canvas.height * 0.92,
        size: 80,
        rotation: 0,
        rotationSpeed: -0.003,
        data: [30, 50, 80, 40, 90, 35]
      }
    ];

    const drawCenterLogo = () => {
      if (!logoImage.complete) return;

      ctx.save();
      
      // Position slightly above center to be behind welcome text
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - (canvas.height * (isMobile ? 0.40 : 0.40)); // Raised from 0.25 to 0.35 for mobile
      
      // Responsive logo size
      const logoSize = Math.min(canvas.width, canvas.height) * (isMobile ? 0.15 : 0.25);
      const logoRadius = logoSize / 2;
      
      // Create subtle glow effect behind logo (no shape, just glow)
      ctx.shadowColor = 'rgba(14, 165, 233, 0.4)';
      ctx.shadowBlur = isMobile ? 20 : 40;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Draw the logo image directly (no clipping)
      ctx.drawImage(
        logoImage,
        centerX - logoRadius,
        centerY - logoRadius,
        logoSize,
        logoSize
      );
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      
      // Add subtle enhancement with multiple glow layers for depth
      ctx.save();
      ctx.globalCompositeOperation = 'screen'; // Blend mode for glow
      
      // Inner glow
      ctx.shadowColor = 'rgba(14, 165, 233, 0.3)';
      ctx.shadowBlur = isMobile ? 10 : 20;
      ctx.drawImage(
        logoImage,
        centerX - logoRadius,
        centerY - logoRadius,
        logoSize,
        logoSize
      );
      
      // Outer glow
      ctx.shadowColor = 'rgba(14, 165, 233, 0.2)';
      ctx.shadowBlur = isMobile ? 30 : 60;
      ctx.drawImage(
        logoImage,
        centerX - logoRadius,
        centerY - logoRadius,
        logoSize,
        logoSize
      );
      
      ctx.restore();
      
      // Optional: Add a very subtle pulsing effect
      const time = Date.now() * 0.002;
      const pulseScale = 1 + Math.sin(time) * 0.02; // Very subtle pulse (2%)
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(pulseScale, pulseScale);
      ctx.globalAlpha = 0.1; // Very subtle
      ctx.shadowColor = 'rgba(14, 165, 233, 0.5)';
      ctx.shadowBlur = isMobile ? 40 : 80;
      
      ctx.drawImage(
        logoImage,
        -logoRadius,
        -logoRadius,
        logoSize,
        logoSize
      );
      
      ctx.restore();
    };

    const drawLineChart = (chart: any) => {
      ctx.save();
      ctx.translate(chart.x, chart.y);
      ctx.rotate(chart.rotation);
      
      const { data, size } = chart;
      const width = size;
      const height = size * 0.6;
      
      // Chart background - blue theme
      ctx.fillStyle = 'rgba(14, 165, 233, 0.05)';
      ctx.fillRect(-width/2, -height/2, width, height);
      
      // Chart border - blue theme
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(-width/2, -height/2, width, height);
      
      // Draw line - blue theme
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.8)';
      ctx.lineWidth = isMobile ? 1.5 : 2; // Thinner lines on mobile
      ctx.beginPath();
      
      data.forEach((value: number, index: number) => {
        const x = (-width/2) + (index / (data.length - 1)) * width;
        const y = (-height/2) + height - (value / 100) * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Draw points - blue theme
      ctx.fillStyle = 'rgba(14, 165, 233, 1)';
      data.forEach((value: number, index: number) => {
        const x = (-width/2) + (index / (data.length - 1)) * width;
        const y = (-height/2) + height - (value / 100) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, isMobile ? 1.5 : 2, 0, Math.PI * 2); // Smaller points on mobile
        ctx.fill();
      });
      
      ctx.restore();
    };

    const drawBarChart = (chart: any) => {
      ctx.save();
      ctx.translate(chart.x, chart.y);
      ctx.rotate(chart.rotation);
      
      const { data, size } = chart;
      const width = size;
      const height = size * 0.6;
      const barWidth = width / data.length * 0.8;
      
      // Chart background - blue theme
      ctx.fillStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.fillRect(-width/2, -height/2, width, height);
      
      // Chart border - blue theme
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(-width/2, -height/2, width, height);
      
      // Draw bars - blue theme gradients
      data.forEach((value: number, index: number) => {
        const x = (-width/2) + (index / data.length) * width + (width / data.length - barWidth) / 2;
        const barHeight = (value / 100) * height;
        const y = (-height/2) + height - barHeight;
        
        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.9)');
        gradient.addColorStop(1, 'rgba(14, 165, 233, 0.6)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Add subtle border to bars
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, barWidth, barHeight);
      });
      
      ctx.restore();
    };

    const drawPieChart = (chart: any) => {
      ctx.save();
      ctx.translate(chart.x, chart.y);
      ctx.rotate(chart.rotation);
      
      const { data, size } = chart;
      const radius = size / 2;
      const total = data.reduce((sum: number, val: number) => sum + val, 0);
      
      let currentAngle = 0;
      // Blue theme colors - different shades of blue
      const colors = [
        'rgba(14, 165, 233, 0.8)',   // Sky blue
        'rgba(59, 130, 246, 0.8)',   // Blue
        'rgba(37, 99, 235, 0.8)',    // Blue-600
        'rgba(29, 78, 216, 0.8)',    // Blue-700
        'rgba(30, 64, 175, 0.8)',    // Blue-800
        'rgba(30, 58, 138, 0.8)'     // Blue-900
      ];
      
      data.forEach((value: number, index: number) => {
        const sliceAngle = (value / total) * Math.PI * 2;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        
        // Add subtle border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        currentAngle += sliceAngle;
      });
      
      // Add center circle for donut effect
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fill();
      
      ctx.restore();
    };

    const drawAreaChart = (chart: any) => {
      ctx.save();
      ctx.translate(chart.x, chart.y);
      ctx.rotate(chart.rotation);
      
      const { data, size, opacity } = chart;
      const width = size;
      const height = size * 0.6;
      
      ctx.globalAlpha = opacity;
      
      // Create area gradient
      const gradient = ctx.createLinearGradient(0, -height/2, 0, height/2);
      gradient.addColorStop(0, 'rgba(14, 165, 233, 0.6)');
      gradient.addColorStop(1, 'rgba(14, 165, 233, 0.1)');
      
      // Draw area
      ctx.beginPath();
      ctx.moveTo(-width/2, height/2);
      
      data.forEach((value: number, index: number) => {
        const x = (-width/2) + (index / (data.length - 1)) * width;
        const y = (-height/2) + height - (value / 100) * height;
        ctx.lineTo(x, y);
      });
      
      ctx.lineTo(width/2, height/2);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw line on top
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.9)';
      ctx.lineWidth = isMobile ? 1.5 : 2;
      ctx.beginPath();
      
      data.forEach((value: number, index: number) => {
        const x = (-width/2) + (index / (data.length - 1)) * width;
        const y = (-height/2) + height - (value / 100) * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      ctx.restore();
    };

    const drawGauge = (chart: any) => {
      ctx.save();
      ctx.translate(chart.x, chart.y);
      ctx.rotate(chart.rotation);
      
      const { size, opacity, value } = chart;
      const radius = size / 2;
      
      ctx.globalAlpha = opacity;
      
      // Background arc
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = isMobile ? 3 : 4;
      ctx.beginPath();
      ctx.arc(0, 0, radius, Math.PI, 0);
      ctx.stroke();
      
      // Value arc
      const valueAngle = Math.PI * (value / 100);
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.9)';
      ctx.lineWidth = isMobile ? 3 : 4;
      ctx.beginPath();
      ctx.arc(0, 0, radius, Math.PI, Math.PI + valueAngle);
      ctx.stroke();
      
      // Center dot
      ctx.fillStyle = 'rgba(14, 165, 233, 1)';
      ctx.beginPath();
      ctx.arc(0, 0, isMobile ? 2 : 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 1)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 1)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw floating nodes (same as animated-background)
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, isMobile ? 1.5 : 2, 0, Math.PI * 2); // Smaller nodes on mobile
        ctx.fillStyle = 'rgba(14, 165, 233, 0.6)';
        ctx.fill();

        // Draw connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x;
          const dy = nodes[j].y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < (isMobile ? 100 : 150)) { // Shorter connections on mobile
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.2 * (1 - distance / (isMobile ? 100 : 150))})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      // Draw floating charts and financial indicators
      charts.forEach(chart => {
        chart.rotation += chart.rotationSpeed;
        
        // Add subtle floating animation (reduced on mobile)
        chart.y += Math.sin(Date.now() * 0.001 + chart.x * 0.01) * (isMobile ? 0.1 : 0.2);
        
        switch (chart.type) {
          case 'line':
            drawLineChart(chart);
            break;
          case 'bar':
            drawBarChart(chart);
            break;
          case 'pie':
            drawPieChart(chart);
            break;
          case 'area':
            drawAreaChart(chart);
            break;
          case 'gauge':
            drawGauge(chart);
            break;
        }
      });

      // Draw the center logo (on top of everything)
      drawCenterLogo();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="fixed inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}
      />
      
      {/* Additional overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />
    </div>
  );
}