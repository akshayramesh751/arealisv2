'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Package, DollarSign, ChartBar as BarChart3, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';

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
      description: 'Profit margins, cash flow, and financial health metrics',
      icon: DollarSign,
      href: '/dashboard/financial',
      preview: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
    },
  ];

  return (
    <DashboardLayout userInfo={userInfo}>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-foreground">Strategic Command Center</h1>
          <p className="text-muted-foreground text-lg">
            Your comprehensive overview of business intelligence across all key metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboards.map((dashboard, i) => (
            <Card
              key={i}
              className={`hover:shadow-lg transition-all hover:scale-[1.02] group ${
                isDark ? 'bg-black border-gray-800' : 'frosted-glass-light'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ background: dashboard.preview }}
                  >
                    <dashboard.icon className="w-8 h-8 text-white" />
                  </div>
                  <Link href={dashboard.href}>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <CardTitle className="text-2xl text-foreground">{dashboard.title}</CardTitle>
                <CardDescription className={`text-base ${isDark ? 'text-gray-300' : ''}`}>
                  {dashboard.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="h-24 rounded-lg opacity-50"
                  style={{ background: dashboard.preview }}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className={`bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 ${
          isDark ? 'bg-black' : ''
        }`}>
          <CardHeader>
            <CardTitle className="text-foreground">Ready to explore deeper insights?</CardTitle>
            <CardDescription className={isDark ? 'text-gray-300' : ''}>
              Click on any dashboard above to dive into detailed analysis, or explore our
              AI-powered growth recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/recommendations">
              <Button className="bg-primary hover:bg-primary/90 text-white">
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
