'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, ChartPie as PieChart, Percent } from 'lucide-react';

export default function FinancialDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Financial Health Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive view of profitability, cash flow, and financial metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Net Profit', value: '$847K', icon: DollarSign },
            { label: 'Profit Margin', value: '35.2%', icon: Percent },
            { label: 'Revenue Growth', value: '+18.5%', icon: TrendingUp },
            { label: 'Operating Ratio', value: '0.72', icon: PieChart },
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
            <CardTitle>Cash Flow Analysis</CardTitle>
            <CardDescription>Monthly cash flow trends and projections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 rounded-lg bg-gradient-to-br from-purple-500/10 to-violet-500/10 flex items-center justify-center">
              <DollarSign className="w-16 h-16 text-primary/40" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">Profitability Overview</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Net profit margin of 35.2% significantly exceeds industry benchmarks, indicating
                strong operational efficiency and effective cost management. Revenue growth of
                18.5% YoY demonstrates robust market performance and successful scaling strategies.
              </p>

              <h3 className="text-lg font-semibold mb-2">Cash Flow Health</h3>
              <p className="text-muted-foreground leading-relaxed">
                Operating cash flow remains positive with strong conversion ratios. Current
                liquidity position supports planned expansion initiatives while maintaining adequate
                reserves for operational stability.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
