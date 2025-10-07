'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBar as BarChart3, Package, Star, TrendingDown } from 'lucide-react';

export default function ProductsDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">
            Product Category Intelligence
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed px-2 sm:px-0">
            Comprehensive analysis of product performance and market positioning
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Total Categories', value: '12', icon: Package },
            { label: 'Top Category', value: 'Electronics', icon: Star },
            { label: 'Avg. Margin', value: '32%', icon: BarChart3 },
            { label: 'Underperforming', value: '3', icon: TrendingDown },
          ].map((stat, i) => (
            <Card key={i} className="min-h-[100px] sm:min-h-[120px]">
              <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs sm:text-sm leading-tight">
                    {stat.label}
                  </CardDescription>
                  <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Category Performance Matrix</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Sales volume vs. profit margin analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="h-48 sm:h-64 lg:h-96 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
              <BarChart3 className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary/40" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Strategic Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            <div className="prose max-w-none">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Top Performers</h3>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                Electronics category leads with 28% of total revenue and maintains a healthy 35%
                profit margin. Strong demand for premium products indicates opportunity for expanded
                product lines in this segment.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mb-2">Growth Opportunities</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Home & Garden shows emerging potential with 45% YoY growth rate despite currently
                representing only 8% of total sales. Strategic investment in this category could
                yield significant returns.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
