import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedBackground } from '@/components/animated-background';
import { Network, TrendingUp, Target } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="dark-theme min-h-screen relative">
      <AnimatedBackground />

      <header className="relative z-10 flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10">
            <Image 
              src="/logos/foresight flow logo.jpeg" 
              alt="ForesightFlow Logo" 
              width={40} 
              height={40} 
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">ForesightFlow</span>
        </div>
        <Link href="/signup">
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs sm:text-sm lg:text-base px-2 sm:px-4 lg:px-6 py-1.5 sm:py-2">
            Sign Up
          </Button>
        </Link>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 lg:px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 lg:space-y-12">
          <div className="space-y-4 sm:space-y-6 animate-slide-in-up">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full frosted-glass">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow"></span>
              <span className="text-xs sm:text-sm text-white/90">AI-Powered Strategic Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Transform Data Into
              <br />
              <span className="text-primary">Strategic Foresight</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Unlock the power of advanced business intelligence with AI-driven analysis
              that reveals hidden opportunities and strategic pathways to growth.
            </p>
          </div>

          <Link href="/signup">
          <Button
            size="lg"
             className="bg-primary hover:bg-primary/90 text-white font-semibold px-3 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8 h-auto rounded-lg sm:rounded-xl shadow-2xl shadow-primary/20 transition-all hover:scale-105 mt-4 sm:mt-5 w-full sm:w-auto max-w-xs sm:max-w-md lg:max-w-none"
          >
            <span className="text-center leading-tight text-xs sm:text-sm lg:text-base">
             Explore Advanced Business Intelligence
            </span>
          </Button>
           </Link>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-8 sm:mt-12 lg:mt-16 max-w-4xl mx-auto">
            {[
              { icon: TrendingUp, title: 'Predictive Analytics', desc: 'Forecast trends before they happen' },
              { icon: Target, title: 'Strategic Insights', desc: 'Data-driven recommendations' },
              { icon: Network, title: 'Market Intelligence', desc: 'Comprehensive competitive analysis' }
            ].map((feature, i) => (
              <div
                key={i}
                className="frosted-glass rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 lg:space-y-4 hover:bg-white/20 transition-all animate-slide-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary mx-auto" />
                <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-white leading-tight">{feature.title}</h3>
                <p className="text-white/70 text-xs sm:text-xs lg:text-sm leading-tight">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Footer section */}
          <div className="mt-8 sm:mt-12 lg:mt-16 pt-4 sm:pt-6 lg:pt-8 border-t border-white/10 text-center space-y-1 sm:space-y-2">
            <p className="text-xs sm:text-sm text-white/80">A Product by Jay Shah Consultancy</p>
            <p className="text-xs text-primary">Developed by Arealis</p>
          </div>
        </div>
        <div className="h-4 sm:h-6 lg:h-8"></div>
      </main>
    </div>
  );
}
