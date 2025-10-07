'use client';

interface AnimatedPreviewProps {
  gradient: string;
  className?: string;
}

export function AnimatedPreview({ gradient, className = '' }: AnimatedPreviewProps) {
  // Generate random path points for sharp graph-like turns
  const generatePath = () => {
    const points = [];
    const width = 200;
    const height = 70;
    const segments = 12; // Reduced segments for more dramatic turns
    
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      // Create more dramatic Y variations with sharp changes
      let y;
      if (i === 0) {
        y = height * 0.6; // Start point
      } else {
        const prevY = points[i - 1].y;
        // Create sharp turns with bigger jumps
        const variation = (Math.random() - 0.5) * height * 0.6;
        y = Math.max(height * 0.1, Math.min(height * 0.9, prevY + variation));
      }
      points.push({ x, y });
    }
    return points;
  };

  const pathPoints = generatePath();
  
  // Create SVG path string with straight lines (no curves)
  const createPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      // Use straight lines instead of curves for sharp turns
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  const pathString = createPath(pathPoints);

  // Create data points for dots
  const createDataPoints = () => {
    return pathPoints.map((point, index) => (
      <circle
        key={index}
        cx={point.x}
        cy={point.y}
        r="1.5"
        fill="white"
        filter="url(#glow)"
        className="animate-chart-dots"
        style={{
          animationDelay: `${index * 0.1}s`
        }}
      />
    ));
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ background: gradient }}
    >
      {/* Animated sharp line chart */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 70"
        preserveAspectRatio="xMidYMid meet"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Sharp line graph */}
        <path
          d={pathString}
          stroke="white"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          strokeLinejoin="miter" // Sharp corners
          strokeLinecap="square"  // Sharp line ends
          className="animate-chart-streak"
        />
        
        {/* Intense glow effect */}
        <path
          d={pathString}
          stroke="white"
          strokeWidth="1"
          fill="none"
          filter="url(#strongGlow)"
          strokeLinejoin="miter"
          strokeLinecap="square"
          className="animate-chart-pulse"
        />
        
        {/* Data points */}
        {createDataPoints()}
      </svg>
    </div>
  );
}