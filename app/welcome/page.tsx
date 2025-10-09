// app/welcome/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { WelcomeBackground } from '@/components/welcome-background';
import { Network, Database, Lightbulb, Play, BarChart3, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function WelcomePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      setUserInfo(JSON.parse(userData));
    }
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Sequential animation timing - reduced delays
    const backgroundTimer = setTimeout(() => {
      setBackgroundLoaded(true);
    }, 100); // Reduced from 500ms to 100ms
    
    const welcomeTimer = setTimeout(() => {
      setWelcomeVisible(true);
    }, 600); // Reduced from 1200ms to 600ms
    
    const cardsTimer = setTimeout(() => {
      setCardsVisible(true);
    }, 1000); // Reduced from 1800ms to 1000ms

    return () => {
      clearTimeout(backgroundTimer);
      clearTimeout(welcomeTimer);
      clearTimeout(cardsTimer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: 'Take a Quick Tour',
      description: 'Learn how ForesightFlow transforms your data into strategic insights',
      action: 'Start Tour',
      onClick: () => {
        // Add tour logic later
        console.log('Starting tour...');
      }
    },
    {
      icon: Database,
      title: 'Connect Your Data',
      description: 'Upload your business reports to begin generating insights',
      action: 'Connect Now',
      onClick: () => {
        router.push('/connect-data');
      }
    },
    {
      icon: Lightbulb,
      title: 'Explore Use Cases',
      description: 'Discover how businesses like yours achieve strategic advantages',
      action: 'Learn More',
      onClick: () => {
        // Add use cases page later
        console.log('Exploring use cases...');
      }
    }
  ];

  return (
    <div className={`dark-theme relative ${isMobile ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
         style={{
           background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
         }}>
      
      {/* Immediate dark background to prevent white flash */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900" />
      
      {/* Animated background with fade-in */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        backgroundLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <WelcomeBackground />
      </div>

      <div className={`relative z-10 ${isMobile ? 'min-h-screen' : 'h-screen'} flex flex-col`}>
        {/* Header - Same for both mobile and desktop */}
        <header className={`flex justify-between items-center px-6 sm:px-8 lg:px-12 py-6 flex-shrink-0 transition-all duration-600 ease-out ${
          backgroundLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="flex items-center gap-4">
            <span className="text-white/70 text-sm cursor-pointer hover:text-white transition-colors">
              Help & Support
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push('/dashboard')}
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 text-sm"
            >
              Go to Dashboard
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-1 flex flex-col items-center px-6 sm:px-8 lg:px-12 ${
          isMobile ? 'py-8' : 'justify-center min-h-0'
        }`}>
          <div className={`max-w-4xl mx-auto text-center ${
            isMobile ? 'space-y-12' : 'space-y-8'
          }`}>
            
            {/* Welcome Message with fade-in animation */}
            <div className={`transition-all duration-800 ease-out ${
              welcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } ${isMobile ? 'space-y-6 pt-8' : 'space-y-4'}`}>
              <h1 className={`font-bold text-white ${
                isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl lg:text-5xl'
              }`}>
                Welcome, {userInfo?.firstName || 'Alex'}!
              </h1>
              <p className={`text-white/80 max-w-2xl mx-auto ${
                isMobile ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              }`}>
                Your Journey to Strategic Mastery Begins Now
              </p>
            </div>

            {/* Feature Cards with staggered fade-in animation */}
            <div className={`grid gap-4 lg:gap-6 ${
              isMobile ? 'grid-cols-1 space-y-4' : 'md:grid-cols-3'
            }`}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-black/30 hover:border-white/20 transition-all duration-300 cursor-pointer group ${
                    isMobile ? 'p-8' : 'p-6'
                  } ${
                    cardsVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    transitionDelay: cardsVisible ? `${index * 120}ms` : '0ms',
                    transitionDuration: '600ms',
                    transitionTimingFunction: 'ease-out'
                  }}
                  onClick={feature.onClick}
                >
                  <div className={`flex flex-col items-center text-center ${
                    isMobile ? 'space-y-6' : 'space-y-4'
                  }`}>
                    <div className={`bg-primary/20 rounded-2xl flex items-center justify-center group-hover:bg-primary/30 transition-colors ${
                      isMobile ? 'w-16 h-16' : 'w-12 h-12'
                    }`}>
                      <feature.icon className={`text-primary ${
                        isMobile ? 'w-8 h-8' : 'w-6 h-6'
                      }`} />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className={`font-bold text-white ${
                        isMobile ? 'text-xl' : 'text-lg'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`text-white/70 leading-relaxed ${
                        isMobile ? 'text-base' : 'text-sm'
                      }`}>
                        {feature.description}
                      </p>
                    </div>

                    <Button 
                      className={`bg-primary/20 hover:bg-primary text-white border border-primary/30 hover:border-primary transition-all ${
                        isMobile ? 'text-base px-6 py-3' : 'text-sm'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        feature.onClick();
                      }}
                    >
                      {feature.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}