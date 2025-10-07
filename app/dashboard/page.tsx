'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Package, DollarSign, ChartBar as BarChart3, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { AnimatedPreview } from '@/components/animated-preview';

export default function DashboardPage() {
  const [userInfo, setUserInfo] = useState<{ firstName: string; lastName: string; company: string; } | undefined>(undefined);
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
      preview: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
    },
    {
      title: 'Product Category Dashboard',
      description: 'Category analysis, top performers, and market positioning',
      icon: BarChart3,
      href: '/dashboard/products',
      preview: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
    },
    {
      title: 'Inventory Report Dashboard',
      description: 'Stock levels, turnover rates, and supply chain efficiency',
      icon: Package,
      href: '/dashboard/inventory',
      preview: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    },
    {
      title: 'Financial Dashboard',
      description: 'Profit margins, cash flow, and financial health metrics overview',
      icon: DollarSign,
      href: '/dashboard/financial',
      preview: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
    },
  ];

  return (
    <DashboardLayout userInfo={userInfo}>
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">Strategic Command Center</h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            Your comprehensive overview of business intelligence across all key metrics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {dashboards.map((dashboard, i) => (
            <Link key={i} href={dashboard.href} className="block">
              <Card
                className={`hover:shadow-lg transition-all hover:scale-[1.02] group cursor-pointer ${
                  isDark ? 'bg-black border-gray-800' : 'frosted-glass-light'
                }`}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl flex items-center justify-center"
                      style={{ background: dashboard.preview }}
                    >
                      <dashboard.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl text-foreground leading-tight">
                    {dashboard.title}
                  </CardTitle>
                  <CardDescription className={`text-xs sm:text-sm lg:text-base leading-relaxed ${isDark ? 'text-gray-300' : ''}`}>
                    {dashboard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <AnimatedPreview 
                    gradient={dashboard.preview}
                    className="h-16 sm:h-20 lg:h-24 rounded-lg"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className={`bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 ${
          isDark ? 'bg-black' : ''
        }`}>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-foreground text-lg sm:text-xl lg:text-2xl">Ready to explore deeper insights?</CardTitle>
            <CardDescription className={`text-xs sm:text-sm lg:text-base ${isDark ? 'text-gray-300' : ''}`}>
              Click on any dashboard above to dive into detailed analysis, or explore our
              AI-powered growth recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Link href="/recommendations">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto text-sm sm:text-base">
                View Growth Recommendations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
