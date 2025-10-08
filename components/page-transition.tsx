// components/page-transition.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PageTransitionProps {
  isTriggered: boolean;
  onComplete: () => void;
}

export function PageTransition({ isTriggered, onComplete }: PageTransitionProps) {
  const [phase, setPhase] = useState<'idle' | 'exit' | 'logo' | 'enter'>('idle');

  useEffect(() => {
    if (isTriggered) {
      // Phase 1: Exit animation (350ms)
      setPhase('exit');
      
      setTimeout(() => {
        // Phase 2: Logo animation (1000ms)
        setPhase('logo');
      }, 350);
      
      setTimeout(() => {
        // Phase 3: Enter animation (650ms) + navigation
        setPhase('enter');
        onComplete();
      }, 1350);
    }
  }, [isTriggered, onComplete]);

  if (phase === 'idle') return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Logo Interstitial */}
      <div className={`absolute inset-0 bg-black transition-all duration-300 ${
        phase === 'logo' ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Centered container that doesn't move */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`logo-animation-container ${phase === 'logo' ? 'animate' : ''}`}>
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-primary/20 flex items-center justify-center">
                <Image 
                  src="/logos/foresight flow logo.jpeg" 
                  alt="ForesightFlow Logo" 
                  width={80} 
                  height={80} 
                  className="rounded-lg sm:rounded-xl w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">ForesightFlow</h2>
                <p className="text-white/60 text-xs sm:text-sm">Preparing your experience...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}