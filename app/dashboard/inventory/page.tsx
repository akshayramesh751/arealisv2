'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TriangleAlert as AlertTriangle, TrendingUp, Clock } from 'lucide-react';

export default function InventoryDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-foreground">Inventory Management Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Real-time insights into stock levels and supply chain efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total SKUs', value: '487', icon: Package },
            { label: 'Low Stock Items', value: '23', icon: AlertTriangle },
            { label: 'Turnover Rate', value: '6.2x', icon: TrendingUp },
            { label: 'Avg. Lead Time', value: '12 days', icon: Clock },
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
            <CardTitle>Stock Level Overview</CardTitle>
            <CardDescription>Current inventory status across all categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
              <Package className="w-16 h-16 text-primary/40" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">Efficiency Metrics</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Inventory turnover rate of 6.2x indicates healthy stock movement, slightly above
                industry average of 5.8x. This efficiency translates to reduced carrying costs and
                improved cash flow management.
              </p>

              <h3 className="text-lg font-semibold mb-2">Stock Alerts</h3>
              <p className="text-muted-foreground leading-relaxed">
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
