'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Package, DollarSign, ChartBar as BarChart3, ArrowRight, ExternalLink, Users } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';

export default function DashboardPage() {
  const [userInfo, setUserInfo] = useState<{ firstName: string; lastName: string; company: string; } | undefined>(undefined);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }
  }, []);

  const dashboards = [
    {
      title: 'Sales Dashboard',
      description: 'Regional performance, revenue trends, and customer insights',
      icon: TrendingUp,
      href: '/dashboard/sales',
      primaryColor: 'orange',
      glassBg: isDark 
        ? 'bg-gradient-to-br from-orange-500/20 via-orange-400/15 to-orange-600/25' 
        : 'bg-gradient-to-br from-orange-400/30 via-orange-300/20 to-orange-500/35',
      borderColor: 'border-orange-500/40',
      graphComponent: (isHovered: boolean) => (
        <div className="relative h-32 w-full rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <div className="relative z-10 h-full flex items-end justify-center p-3">
            <div className="flex items-end gap-2">
              {[
                { height: 6, hoverHeight: 15 }, // rises
                { height: 10, hoverHeight: 4 }, // falls
                { height: 8, hoverHeight: 18 }, // rises
                { height: 12, hoverHeight: 3 }  // falls
              ].map((bar, idx) => (
                <div
                  key={idx}
                  className={`w-6 rounded-t-md transition-all duration-700 ease-out ${
                    idx === 0 ? 'bg-orange-600 shadow-lg' : 
                    idx === 1 ? 'bg-orange-700 shadow-lg' : 
                    idx === 2 ? 'bg-orange-800 shadow-lg' : 
                    'bg-orange-900 shadow-lg'
                  }`}
                  style={{
                    height: isHovered ? `${bar.hoverHeight * 3}px` : `${bar.height * 3}px`,
                    transitionDelay: `${idx * 150}ms`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Product Category Dashboard',
      description: 'Category analysis, top performers, and market positioning',
      icon: BarChart3,
      href: '/dashboard/products',
      primaryColor: 'green',
      glassBg: isDark 
        ? 'bg-gradient-to-br from-green-500/20 via-green-400/15 to-emerald-600/25' 
        : 'bg-gradient-to-br from-green-400/30 via-green-300/20 to-emerald-500/35',
      borderColor: 'border-green-500/40',
      graphComponent: (isHovered: boolean) => (
        <div className="relative h-32 w-full rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className={`relative w-24 h-24 transition-transform duration-500 ${isHovered ? 'scale-110 rotate-12' : 'scale-100'}`}>
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Complete pie chart segments */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="15"
                  strokeDasharray="65.97 0"
                  className="transition-all duration-500"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="15"
                  strokeDasharray="41.23 24.74"
                  strokeDashoffset="-65.97"
                  className="transition-all duration-500"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="15"
                  strokeDasharray="31.42 109.55"
                  strokeDashoffset="-107.20"
                  className="transition-all duration-500"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth="15"
                  strokeDasharray="81.68 58.29"
                  strokeDashoffset="-138.62"
                  className="transition-all duration-500"
                />
              </svg>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Inventory Report Dashboard',
      description: 'Stock levels, turnover rates, and supply chain efficiency',
      icon: Package,
      href: '/dashboard/inventory',
      primaryColor: 'blue',
      glassBg: isDark 
        ? 'bg-gradient-to-br from-blue-500/20 via-blue-400/15 to-cyan-600/25' 
        : 'bg-gradient-to-br from-blue-400/30 via-blue-300/20 to-cyan-500/35',
      borderColor: 'border-blue-500/40',
      graphComponent: (isHovered: boolean) => (
        <div className="relative h-32 w-full rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <div className="relative z-10 h-full flex items-center justify-center p-3">
            <svg className="w-full h-full" viewBox="0 0 200 60">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e40af" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              
              {/* Line appears on hover */}
              {isHovered && (
                <polyline
                  points="20,45 40,15 60,30 80,10 100,25 120,8 140,22 160,18 180,30"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-[drawLine_1.5s_ease-in-out_forwards]"
                  style={{
                    strokeDasharray: "300",
                    strokeDashoffset: "300",
                    animation: "drawLine 1.5s ease-in-out forwards"
                  }}
                />
              )}
              
              {/* Points are always visible */}
              {[
                { x: 20, y: 45 },
                { x: 40, y: 15 },
                { x: 60, y: 30 },
                { x: 80, y: 10 },
                { x: 100, y: 25 },
                { x: 120, y: 8 },
                { x: 140, y: 22 },
                { x: 160, y: 18 },
                { x: 180, y: 30 }
              ].map((point, idx) => (
                <circle
                  key={idx}
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? "5" : "4"}
                  fill="#1e40af"
                  className="transition-all duration-500"
                  style={{ 
                    transitionDelay: `${idx * 100}ms`
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      )
    },
    {
      title: 'Financial Dashboard',
      description: 'Profit margins, cash flow, and financial health metrics overview',
      icon: DollarSign,
      href: '/dashboard/financial',
      primaryColor: 'purple',
      glassBg: isDark 
        ? 'bg-gradient-to-br from-purple-500/20 via-purple-400/15 to-violet-600/25' 
        : 'bg-gradient-to-br from-purple-400/30 via-purple-300/20 to-violet-500/35',
      borderColor: 'border-purple-500/40',
      graphComponent: (isHovered: boolean) => (
        <div className="relative h-32 w-full rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <div className="relative z-10 h-full flex items-end justify-center p-3">
          <div className="flex items-end gap-1">
              {[
                { height: 6, hoverHeight: 12 }, // rises
                { height: 8, hoverHeight: 4 },  // falls
                { height: 10, hoverHeight: 16 }, // rises
                { height: 12, hoverHeight: 6 },  // falls
                { height: 15, hoverHeight: 20 }, // rises
                { height: 11, hoverHeight: 5 },  // falls
                { height: 8, hoverHeight: 14 },  // rises
                { height: 13, hoverHeight: 7 }   // falls
              ].map((height, idx) => (
                <div
                  key={idx}
                  className="w-3 bg-gradient-to-t from-purple-800 to-purple-600 rounded-t-sm transition-all duration-700 ease-out"
                  style={{
                    height: isHovered ? `${height.hoverHeight * 2}px` : `${height.height * 2}px`,
                    transitionDelay: `${idx * 100}ms`
                  }}
                ></div>
              ))}
            </div>
          <div className={`absolute top-2 right-2 transition-all duration-500 ${
            isHovered ? 'scale-125 text-purple-300' : 'text-purple-400'
          }`}>
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>
      )
    },
  ];

  return (
    <DashboardLayout userInfo={userInfo}>
      <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left px-2 sm:px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">Strategic Command Center</h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            Your comprehensive overview of business intelligence across all key metrics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-2 sm:px-4">
          {dashboards.map((dashboard, i) => (
            <div 
              key={i} 
              className="group"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className={`
                relative h-80 overflow-hidden cursor-pointer transition-all duration-500 ease-out
                ${hoveredCard === i ? 'scale-105 shadow-2xl shadow-black/20 -translate-y-2' : 'scale-100'}
                ${dashboard.glassBg}
                backdrop-blur-xl border-2 ${dashboard.borderColor}
                hover:shadow-xl rounded-2xl p-1
                active:scale-[1.02] active:transition-transform active:duration-150
              `}>
                {/* Glass overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl"></div>
                <div className="absolute inset-0 backdrop-blur-md opacity-50 rounded-2xl"></div>
                
                {/* Inner card with additional padding */}
                <div className="relative h-full rounded-xl overflow-hidden">
                  {/* Explore Button */}
                  <div className="absolute top-4 right-4 z-20">
                    <Link href={dashboard.href}>
                      <Button 
                        size="sm" 
                        className={`
                          transition-all duration-300 ease-out
                          bg-white/90 hover:bg-white text-gray-900 
                          border border-white/30 hover:border-white/50
                          backdrop-blur-sm shadow-lg
                          text-xs font-medium px-3 py-1.5 h-7
                          ${hoveredCard === i ? 'scale-110 shadow-xl' : 'scale-100'}
                          hover:shadow-xl hover:shadow-white/20
                          rounded-lg font-semibold
                        `}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        explore
                      </Button>
                    </Link>
                  </div>

                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Graph Section */}
                    <div className="flex-1 p-6">
                      {dashboard.graphComponent(hoveredCard === i)}
                    </div>

                    {/* Title and Description Section - Uniform height */}
                    <div className={`
                      h-24 p-4 border-t-4 ${dashboard.borderColor}
                      backdrop-blur-lg
                      transition-all duration-300
                      rounded-b-xl flex flex-col justify-center
                     `}>
                       <h3 className={`font-bold text-base mb-1.5 transition-colors duration-300 drop-shadow-lg ${
                      isDark ? 'text-white' : 'text-black'
                       }`}>
                         {dashboard.title}
                       </h3>
                      <p className={`text-xs leading-relaxed transition-colors duration-300 drop-shadow ${
                         isDark ? 'text-white/90' : 'text-black/80'
                       }`}>
                         {dashboard.description}
                       </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="px-2 sm:px-4">
          <Card className={`
            bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 backdrop-blur-xl
            ${isDark ? 'bg-black/20 border-white/10' : 'bg-white/20 border-white/30'}
            transition-all duration-300 hover:shadow-lg
            rounded-2xl border-2
          `}>
            <CardHeader className="pb-3 sm:pb-4 px-6 sm:px-8">
              <CardTitle className="text-foreground text-lg sm:text-xl lg:text-2xl">Ready to explore deeper insights?</CardTitle>
              <CardDescription className={`text-xs sm:text-sm lg:text-base ${isDark ? 'text-gray-300' : ''}`}>
                Click on any dashboard above to dive into detailed analysis, or explore our
                AI-powered growth recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 px-6 sm:px-8">
              <Link href="/recommendations">
                <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto text-sm sm:text-base transition-all duration-300 hover:scale-105 rounded-lg px-6 py-3">
                  View Growth Recommendations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
