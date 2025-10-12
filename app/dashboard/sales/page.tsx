'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, MapPin, Users,IndianRupee,} from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import Link from 'next/link';

export default function SalesDashboardPage() {
  const [dataView, setDataView] = useState<'your-data' | 'market' | 'comparison'>('your-data');
  const { isDark } = useTheme();

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">Sales Intelligence Dashboard</h1>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg px-2 sm:px-0">
              Comprehensive analysis of regional performance and revenue trends
            </p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <div className={`flex rounded-lg p-1 gap-1 ${
              isDark ? 'bg-gray-800' : 'bg-secondary'
            }`}>
              <Button
                variant={dataView === 'your-data' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDataView('your-data')}
                className={`px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                  dataView === 'your-data' 
                    ? 'bg-primary text-white shadow-sm' 
                    : isDark 
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                      : 'hover:bg-secondary-foreground/10'
                }`}
              >
                Your Data
              </Button>
              <Button
                variant={dataView === 'market' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDataView('market')}
                className={`px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                  dataView === 'market' 
                    ? 'bg-primary text-white shadow-sm' 
                    : isDark 
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                      : 'hover:bg-secondary-foreground/10'
                }`}
              >
                Market Data
              </Button>
              <Button
                variant={dataView === 'comparison' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDataView('comparison')}
                className={`px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                  dataView === 'comparison' 
                    ? 'bg-primary text-white shadow-sm' 
                    : isDark 
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                      : 'hover:bg-secondary-foreground/10'
                }`}
              >
                Comparison
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Total Revenue', value: '₹24 Lakhs', change: '+12.5%', icon: IndianRupee },
            { label: 'Active Customers', value: '1,234', change: '+8.2%', icon: Users },
            { label: 'Avg. Order Value', value: '₹1,947', change: '+5.1%', icon: TrendingUp },
            { label: 'Top Region', value: 'Northeast', change: '38% share', icon: MapPin },
          ].map((stat, i) => (
            <Card key={i} className="min-h-[100px] sm:min-h-[120px]">
              <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs sm:text-sm leading-tight">{stat.label}</CardDescription>
                  <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-primary mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Regional Sales Performance</CardTitle>
            <CardDescription className="text-sm sm:text-base">Revenue distribution across geographical markets</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="h-48 sm:h-64 lg:h-96 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto text-primary/40" />
                <p className="text-muted-foreground text-xs sm:text-sm">Interactive map visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">In-Depth Analysis & Key Observations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            <div className="prose max-w-none">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Regional Performance Insights</h3>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                The Northeast region continues to dominate with 38% of total revenue, driven by
                strong Q4 performance in metropolitan markets. Growth rates indicate a 12.5%
                year-over-year increase, outpacing industry averages by 3.2 percentage points.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mb-2">Customer Acquisition Trends</h3>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                Customer base expansion shows healthy momentum with 8.2% growth. The average order
                value increase of 5.1% suggests successful upselling strategies and improved
                product mix optimization.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mb-2">Strategic Implications</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Current trajectory positions the business well for continued expansion. Focus areas
                include replicating Northeast success patterns in emerging markets and maintaining
                customer retention rates above 85%.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg sm:text-xl">Revenue Trend</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Monthly revenue over the past 12 months</CardDescription>
                </div>
                <Link href="/dashboard/sales/revenue-trend">
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-white text-xs px-3 py-1.5 h-auto flex-shrink-0"
                  >
                    Explore
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="h-48 sm:h-56 lg:h-64 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                <TrendingUp className="w-12 h-12 sm:w-14 sm:h-14 text-primary/40" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg sm:text-xl">Customer Segments</CardTitle>
                  <CardDescription className="text-sm sm:text-base">Distribution by customer type</CardDescription>
                </div>
                <Link href="/dashboard/sales/customer-segment">
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-white text-xs px-3 py-1.5 h-auto flex-shrink-0"
                  >
                    Explore
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="h-48 sm:h-56 lg:h-64 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
                <Users className="w-12 h-12 sm:w-14 sm:h-14 text-primary/40" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
