'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBar as BarChart3, Package, Star, TrendingDown } from 'lucide-react';

export default function ProductsDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-foreground">Product Category Intelligence</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive analysis of product performance and market positioning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Categories', value: '12', icon: Package },
            { label: 'Top Category', value: 'Electronics', icon: Star },
            { label: 'Avg. Margin', value: '32%', icon: BarChart3 },
            { label: 'Underperforming', value: '3', icon: TrendingDown },
          ].map((stat, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{stat.label}</CardDescription>
                  <stat.icon className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Category Performance Matrix</CardTitle>
            <CardDescription>Sales volume vs. profit margin analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
              <BarChart3 className="w-16 h-16 text-primary/40" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strategic Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">Top Performers</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Electronics category leads with 28% of total revenue and maintains a healthy 35%
                profit margin. Strong demand for premium products indicates opportunity for expanded
                product lines in this segment.
              </p>

              <h3 className="text-lg font-semibold mb-2">Growth Opportunities</h3>
              <p className="text-muted-foreground leading-relaxed">
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
