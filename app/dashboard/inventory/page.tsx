'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TriangleAlert as AlertTriangle, TrendingUp, Clock } from 'lucide-react';

export default function InventoryDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground">
            Inventory Management Dashboard
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed px-2 sm:px-0">
            Real-time insights into stock levels and supply chain efficiency
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Total SKUs', value: '487', icon: Package },
            { label: 'Low Stock Items', value: '23', icon: AlertTriangle },
            { label: 'Turnover Rate', value: '6.2x', icon: TrendingUp },
            { label: 'Avg. Lead Time', value: '12 days', icon: Clock },
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
            <CardTitle className="text-lg sm:text-xl">Stock Level Overview</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Current inventory status across all categories
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="h-48 sm:h-64 lg:h-96 rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
              <Package className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary/40" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Inventory Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6">
            <div className="prose max-w-none">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Efficiency Metrics</h3>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                Inventory turnover rate of 6.2x indicates healthy stock movement, slightly above
                industry average of 5.8x. This efficiency translates to reduced carrying costs and
                improved cash flow management.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mb-2">Stock Alerts</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                23 SKUs currently showing low stock levels require immediate attention. Automated
                reorder triggers are recommended for high-velocity items to prevent stockouts during
                peak demand periods.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
