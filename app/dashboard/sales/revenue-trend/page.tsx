'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  BarChart3, 
  LineChart,
  ArrowLeft,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import Link from 'next/link';

export default function RevenueTrendPage() {
  const [viewType, setViewType] = useState<'monthly' | 'comparison' | 'custom'>('monthly');
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '12m' | 'custom'>('12m');
  const [fromMonth, setFromMonth] = useState('2024-01');
  const [toMonth, setToMonth] = useState('2024-12');
  const [comparisonPeriod, setComparisonPeriod] = useState<'previous-year' | 'previous-period' | 'custom'>('previous-year');
  const { isDark } = useTheme();

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-2 sm:px-0">
        {/* Header with Back Button */}
        <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Link href="/dashboard/sales">
              <Button 
                variant="outline" 
                size="sm"
                className={`flex items-center gap-2 w-full sm:w-auto ${
                  isDark ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' : ''
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sales
              </Button>
            </Link>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground">Revenue Trend Analysis</h1>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base mt-1">
                Detailed revenue patterns and performance insights
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm"
              className={`flex-1 sm:flex-none ${isDark ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' : ''}`}
            >
              <Download className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Export</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`flex-1 sm:flex-none ${isDark ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' : ''}`}
            >
              <RefreshCw className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <CardTitle className="text-base sm:text-lg">Analysis Controls</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
            {/* View Type Selection */}
            <div className="space-y-3">
              <Label className="text-xs sm:text-sm font-medium">Analysis Type</Label>
              <div className={`flex flex-col sm:flex-row rounded-lg p-1 gap-1 ${
                isDark ? 'bg-gray-800' : 'bg-secondary'
              }`}>
                <Button
                  variant={viewType === 'monthly' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewType('monthly')}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all w-full sm:w-auto ${
                    viewType === 'monthly' 
                      ? 'bg-primary text-white shadow-sm' 
                      : isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'hover:bg-secondary-foreground/10'
                  }`}
                >
                  Monthly Trend
                </Button>
                <Button
                  variant={viewType === 'comparison' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewType('comparison')}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all w-full sm:w-auto ${
                    viewType === 'comparison' 
                      ? 'bg-primary text-white shadow-sm' 
                      : isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'hover:bg-secondary-foreground/10'
                  }`}
                >
                  Period Comparison
                </Button>
                <Button
                  variant={viewType === 'custom' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewType('custom')}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all w-full sm:w-auto ${
                    viewType === 'custom' 
                      ? 'bg-primary text-white shadow-sm' 
                      : isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'hover:bg-secondary-foreground/10'
                  }`}
                >
                  Custom Range
                </Button>
              </div>
            </div>

            {/* Time Range Selection */}
            {viewType === 'monthly' && (
              <div className="space-y-3">
                <Label className="text-xs sm:text-sm font-medium">Time Range</Label>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {[
                    { value: '3m', label: 'Last 3 Months' },
                    { value: '6m', label: 'Last 6 Months' },
                    { value: '12m', label: 'Last 12 Months' },
                    { value: 'custom', label: 'Custom Range' }
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={timeRange === option.value ? 'default' : (isDark ? 'secondary' : 'outline')}
                      size="sm"
                      onClick={() => setTimeRange(option.value as any)}
                      className={`text-xs sm:text-sm ${timeRange === option.value ? 'bg-primary text-white' : ''}`}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Date Range */}
            {(viewType === 'custom' || timeRange === 'custom') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromMonth" className="text-xs sm:text-sm font-medium">From Month</Label>
                  <Input
                    id="fromMonth"
                    type="month"
                    value={fromMonth}
                    onChange={(e) => setFromMonth(e.target.value)}
                    className={`text-sm ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white [color-scheme:dark]' 
                        : 'bg-background border-border'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toMonth" className="text-xs sm:text-sm font-medium">To Month</Label>
                  <Input
                    id="toMonth"
                    type="month"
                    value={toMonth}
                    onChange={(e) => setToMonth(e.target.value)}
                    className={`text-sm ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white [color-scheme:dark]' 
                        : 'bg-background border-border'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Comparison Options */}
            {viewType === 'comparison' && (
              <div className="space-y-3">
                <Label className="text-xs sm:text-sm font-medium">Compare Against</Label>
                <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
                  {[
                    { value: 'previous-year', label: 'Previous Year' },
                    { value: 'previous-period', label: 'Previous Period' },
                    { value: 'custom', label: 'Custom Period' }
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={comparisonPeriod === option.value ? 'default' : (isDark ? 'secondary' : 'outline')}
                      size="sm"
                      onClick={() => setComparisonPeriod(option.value as any)}
                      className={`text-xs sm:text-sm ${comparisonPeriod === option.value ? 'bg-primary text-white' : ''}`}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { 
              label: 'Period Revenue', 
              value: '₹18.4 Lakhs', 
              change: '+12.5%', 
              trend: 'up',
              icon: TrendingUp 
            },
            { 
              label: 'Average Monthly', 
              value: '₹1.53 Lakhs', 
              change: '+8.2%', 
              trend: 'up',
              icon: BarChart3 
            },
            { 
              label: 'Growth Rate', 
              value: '15.2%', 
              change: '+2.1%', 
              trend: 'up',
              icon: LineChart 
            },
            { 
              label: 'Peak Month', 
              value: 'Dec 2024', 
              change: '₹2.1L', 
              trend: 'neutral',
              icon: Calendar 
            },
          ].map((metric, i) => (
            <Card key={i}>
              <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs">{metric.label}</CardDescription>
                  <metric.icon className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="pt-0 px-3 sm:px-6">
                <div className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold">{metric.value}</div>
                <div className={`text-xs flex items-center gap-1 mt-1 ${
                  metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 
                  metric.trend === 'down' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {metric.trend === 'up' && <TrendingUp className="w-2 h-2 sm:w-3 sm:h-3" />}
                  {metric.trend === 'down' && <TrendingDown className="w-2 h-2 sm:w-3 sm:h-3" />}
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Chart Visualization */}
        <Card>
          <CardHeader className="px-3 sm:px-6">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
              <div>
                <CardTitle className="text-base sm:text-lg lg:text-xl">
                  {viewType === 'monthly' ? 'Monthly Revenue Trend' :
                   viewType === 'comparison' ? 'Period Comparison Analysis' :
                   'Custom Range Analysis'}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-1">
                  {viewType === 'monthly' ? `Revenue performance over selected time period` :
                   viewType === 'comparison' ? `Comparative revenue analysis between periods` :
                   `Revenue analysis from ${fromMonth} to ${toMonth}`}
                </CardDescription>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant={isDark ? 'secondary' : 'outline'} 
                  size="sm"
                  className={`flex-1 sm:flex-none text-xs sm:text-sm ${isDark ? 'border-gray-700' : ''}`}
                >
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Bar Chart
                </Button>
                <Button 
                  variant={isDark ? 'secondary' : 'outline'} 
                  size="sm"
                  className={`flex-1 sm:flex-none text-xs sm:text-sm ${isDark ? 'border-gray-700' : ''}`}
                >
                  <LineChart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Line Chart
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="h-64 sm:h-80 lg:h-96 xl:h-[500px] rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center border-2 border-dashed border-primary/20">
              <div className="text-center space-y-3 sm:space-y-4 px-4">
                <div className="flex justify-center">
                  {viewType === 'monthly' && <LineChart className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40" />}
                  {viewType === 'comparison' && <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40" />}
                  {viewType === 'custom' && <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40" />}
                </div>
                <div>
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground">
                    {viewType === 'monthly' ? 'Monthly Revenue Trend Visualization' :
                     viewType === 'comparison' ? 'Period Comparison Chart' :
                     'Custom Range Analysis Chart'}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    Interactive chart will be displayed here based on selected filters
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Insights */}
        {viewType === 'comparison' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="px-3 sm:px-6">
                <CardTitle className="text-base sm:text-lg">Performance Comparison</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Key metrics comparison between periods</CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="h-48 sm:h-56 lg:h-64 rounded-lg bg-gradient-to-br from-blue-500/5 to-cyan-500/5 flex items-center justify-center border border-blue-200/20">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-primary/40 mb-2" />
                    <p className="text-xs sm:text-sm text-muted-foreground">Comparison Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="px-3 sm:px-6">
                <CardTitle className="text-base sm:text-lg">Growth Analysis</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Month-over-month growth patterns</CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="h-48 sm:h-56 lg:h-64 rounded-lg bg-gradient-to-br from-green-500/5 to-emerald-500/5 flex items-center justify-center border border-green-200/20">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-primary/40 mb-2" />
                    <p className="text-xs sm:text-sm text-muted-foreground">Growth Rate Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Detailed Insights */}
        <Card>
          <CardHeader className="px-3 sm:px-6">
            <CardTitle className="text-base sm:text-lg">Revenue Trend Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-3 sm:px-6">
            <div className="prose max-w-none">
              <h3 className="text-sm sm:text-base font-semibold mb-2">Key Observations</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Performance Highlights</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Consistent month-over-month growth of 12.5%</li>
                    <li>December shows peak performance at ₹2.1L</li>
                    <li>Q4 outperformed Q3 by 18.3%</li>
                    <li>Year-over-year growth rate of 15.2%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Strategic Recommendations</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Capitalize on December momentum for Q1 planning</li>
                    <li>Investigate factors behind Q4 performance surge</li>
                    <li>Consider seasonal adjustments in forecasting</li>
                    <li>Maintain current growth trajectory strategies</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}