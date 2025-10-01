'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, MapPin, Users, DollarSign } from 'lucide-react';

export default function SalesDashboardPage() {
  const [dataView, setDataView] = useState<'your-data' | 'market' | 'comparison'>('your-data');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Sales Intelligence Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive analysis of regional performance and revenue trends
            </p>
          </div>
          <Tabs value={dataView} onValueChange={(v: any) => setDataView(v)}>
            <TabsList>
              <TabsTrigger value="your-data">Your Data</TabsTrigger>
              <TabsTrigger value="market">Market Data</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: '$2.4M', change: '+12.5%', icon: DollarSign },
            { label: 'Active Customers', value: '1,234', change: '+8.2%', icon: Users },
            { label: 'Avg. Order Value', value: '$1,947', change: '+5.1%', icon: TrendingUp },
            { label: 'Top Region', value: 'Northeast', change: '38% share', icon: MapPin },
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
                <p className="text-xs text-primary mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Regional Sales Performance</CardTitle>
            <CardDescription>Revenue distribution across geographical markets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-16 h-16 mx-auto text-primary/40" />
                <p className="text-muted-foreground">Interactive map visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In-Depth Analysis & Key Observations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">Regional Performance Insights</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Northeast region continues to dominate with 38% of total revenue, driven by
                strong Q4 performance in metropolitan markets. Growth rates indicate a 12.5%
                year-over-year increase, outpacing industry averages by 3.2 percentage points.
              </p>

              <h3 className="text-lg font-semibold mb-2">Customer Acquisition Trends</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Customer base expansion shows healthy momentum with 8.2% growth. The average order
                value increase of 5.1% suggests successful upselling strategies and improved
                product mix optimization.
              </p>

              <h3 className="text-lg font-semibold mb-2">Strategic Implications</h3>
              <p className="text-muted-foreground leading-relaxed">
                Current trajectory positions the business well for continued expansion. Focus areas
                include replicating Northeast success patterns in emerging markets and maintaining
                customer retention rates above 85%.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-primary/40" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>Distribution by customer type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
                <Users className="w-12 h-12 text-primary/40" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
