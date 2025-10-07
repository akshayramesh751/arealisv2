'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, ChartPie as PieChart, Percent } from 'lucide-react';

export default function FinancialDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">
            Financial Health Dashboard
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed px-2 sm:px-0">
            Comprehensive view of profitability, cash flow, and financial metrics
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Net Profit', value: '$847K', icon: DollarSign },
            { label: 'Profit Margin', value: '35.2%', icon: Percent },
            { label: 'Revenue Growth', value: '+18.5%', icon: TrendingUp },
            { label: 'Operating Ratio', value: '0.72', icon: PieChart },
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
            <CardTitle className="text-lg sm:text-xl">Cash Flow Analysis</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Monthly cash flow trends and projections
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="h-48 sm:h-64 lg:h-96 rounded-lg bg-gradient-to-br from-purple-500/10 to-violet-500/10 flex items-center justify-center">
              <DollarSign className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary/40" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Financial Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            <div className="prose max-w-none">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Profitability Overview</h3>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                Net profit margin of 35.2% significantly exceeds industry benchmarks, indicating
                strong operational efficiency and effective cost management. Revenue growth of
                18.5% YoY demonstrates robust market performance and successful scaling strategies.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mb-2">Cash Flow Health</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
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
