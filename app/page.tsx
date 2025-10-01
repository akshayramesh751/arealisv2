import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedBackground } from '@/components/animated-background';
import { Network, TrendingUp, Target } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="dark-theme min-h-screen relative">
      <AnimatedBackground />

      <header className="relative z-10 flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <Network className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-bold text-white">ForesightFlow</span>
        </div>
        <Link href="/signup">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
            Sign Up
          </Button>
        </Link>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6 animate-slide-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full frosted-glass">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow"></span>
              <span className="text-sm text-white/90">AI-Powered Strategic Intelligence</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Transform Data Into
              <br />
              <span className="text-primary">Strategic Foresight</span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Unlock the power of advanced business intelligence with AI-driven analysis
              that reveals hidden opportunities and strategic pathways to growth.
            </p>
          </div>

          <Link href="/signup">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-12 py-8 h-auto rounded-xl shadow-2xl shadow-primary/20 transition-all hover:scale-105"
            >
              Explore the Most Advanced Business Strategy Intelligence Model
            </Button>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { icon: TrendingUp, title: 'Predictive Analytics', desc: 'Forecast trends before they happen' },
              { icon: Target, title: 'Strategic Insights', desc: 'Data-driven recommendations' },
              { icon: Network, title: 'Market Intelligence', desc: 'Comprehensive competitive analysis' }
            ].map((feature, i) => (
              <div
                key={i}
                className="frosted-glass rounded-2xl p-6 space-y-4 hover:bg-white/20 transition-all animate-slide-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <feature.icon className="w-10 h-10 text-primary mx-auto" />
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
