'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  User, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3,
  ArrowLeft,
  Filter,
  Download,
  RefreshCw,
  Target,
  ShoppingCart,
  Calendar,
  MapPin
} from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import Link from 'next/link';

export default function CustomerSegmentPage() {
  const [segmentType, setSegmentType] = useState<'demographics' | 'behavior' | 'geographic'>('demographics');
  const [ageRange, setAgeRange] = useState<'all' | '18-25' | '26-35' | '36-45' | '46-60' | '60+'>('all');
  const [gender, setGender] = useState<'all' | 'male' | 'female' | 'other'>('all');
  const [customerType, setCustomerType] = useState<'all' | 'new' | 'returning' | 'loyal' | 'churned'>('all');
  const [purchaseBehavior, setPurchaseBehavior] = useState<'all' | 'frequent' | 'occasional' | 'seasonal'>('all');
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '12m'>('6m');
  const { isDark } = useTheme();

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
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground">Customer Segment Analysis</h1>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base mt-1">
                Deep insights into customer demographics and behavior patterns
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
              <CardTitle className="text-base sm:text-lg">Segmentation Controls</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
            {/* Segment Type Selection */}
            <div className="space-y-3">
              <Label className="text-xs sm:text-sm font-medium">Segmentation Type</Label>
              <div className={`flex flex-col sm:flex-row rounded-lg p-1 gap-1 ${
                isDark ? 'bg-gray-800' : 'bg-secondary'
              }`}>
                <Button
                  variant={segmentType === 'demographics' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSegmentType('demographics')}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all w-full sm:w-auto ${
                    segmentType === 'demographics' 
                      ? 'bg-primary text-white shadow-sm' 
                      : isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'hover:bg-secondary-foreground/10'
                  }`}
                >
                  Demographics
                </Button>
                <Button
                  variant={segmentType === 'behavior' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSegmentType('behavior')}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all w-full sm:w-auto ${
                    segmentType === 'behavior' 
                      ? 'bg-primary text-white shadow-sm' 
                      : isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'hover:bg-secondary-foreground/10'
                  }`}
                >
                  Behavior
                </Button>
                <Button
                  variant={segmentType === 'geographic' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSegmentType('geographic')}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all w-full sm:w-auto ${
                    segmentType === 'geographic' 
                      ? 'bg-primary text-white shadow-sm' 
                      : isDark 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'hover:bg-secondary-foreground/10'
                  }`}
                >
                  Geographic
                </Button>
              </div>
            </div>

            {/* Time Range Selection */}
            <div className="space-y-3">
              <Label className="text-xs sm:text-sm font-medium">Analysis Period</Label>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                {[
                  { value: '1m', label: 'Last Month' },
                  { value: '3m', label: 'Last 3 Months' },
                  { value: '6m', label: 'Last 6 Months' },
                  { value: '12m', label: 'Last Year' }
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

            {/* Demographics Filters */}
            {segmentType === 'demographics' && (
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <Label className="text-xs sm:text-sm font-medium">Age Range</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'All Ages' },
                      { value: '18-25', label: '18-25' },
                      { value: '26-35', label: '26-35' },
                      { value: '36-45', label: '36-45' },
                      { value: '46-60', label: '46-60' },
                      { value: '60+', label: '60+' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={ageRange === option.value ? 'default' : (isDark ? 'secondary' : 'outline')}
                        size="sm"
                        onClick={() => setAgeRange(option.value as any)}
                        className={`text-xs ${ageRange === option.value ? 'bg-primary text-white' : ''}`}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs sm:text-sm font-medium">Gender</Label>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={gender === option.value ? 'default' : (isDark ? 'secondary' : 'outline')}
                        size="sm"
                        onClick={() => setGender(option.value as any)}
                        className={`text-xs sm:text-sm ${gender === option.value ? 'bg-primary text-white' : ''}`}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Behavior Filters */}
            {segmentType === 'behavior' && (
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <Label className="text-xs sm:text-sm font-medium">Customer Type</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'All Customers' },
                      { value: 'new', label: 'New' },
                      { value: 'returning', label: 'Returning' },
                      { value: 'loyal', label: 'Loyal' },
                      { value: 'churned', label: 'Churned' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={customerType === option.value ? 'default' : (isDark ? 'secondary' : 'outline')}
                        size="sm"
                        onClick={() => setCustomerType(option.value as any)}
                        className={`text-xs ${customerType === option.value ? 'bg-primary text-white' : ''}`}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs sm:text-sm font-medium">Purchase Behavior</Label>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'All Types' },
                      { value: 'frequent', label: 'Frequent' },
                      { value: 'occasional', label: 'Occasional' },
                      { value: 'seasonal', label: 'Seasonal' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={purchaseBehavior === option.value ? 'default' : (isDark ? 'secondary' : 'outline')}
                        size="sm"
                        onClick={() => setPurchaseBehavior(option.value as any)}
                        className={`text-xs sm:text-sm ${purchaseBehavior === option.value ? 'bg-primary text-white' : ''}`}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Geographic Filters */}
            {segmentType === 'geographic' && (
              <div className="space-y-3">
                <Label className="text-xs sm:text-sm font-medium">Geographic Filters</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-xs">Country</Label>
                    <select 
                      id="country"
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                      }`}
                    >
                      <option>All Countries</option>
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-xs">State/Region</Label>
                    <select 
                      id="region"
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                      }`}
                    >
                      <option>All Regions</option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-xs">City</Label>
                    <select 
                      id="city"
                      className={`w-full px-3 py-2 rounded-md border text-sm ${
                        isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                      }`}
                    >
                      <option>All Cities</option>
                      <option>Mumbai</option>
                      <option>Pune</option>
                      <option>Bangalore</option>
                      <option>Chennai</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { 
              label: 'Total Customers', 
              value: '4,892', 
              change: '+156', 
              trend: 'up',
              icon: Users 
            },
            { 
              label: 'Avg. Customer Value', 
              value: '₹3,760', 
              change: '+18.2%', 
              trend: 'up',
              icon: Target 
            },
            { 
              label: 'Customer Retention', 
              value: '78.4%', 
              change: '+5.1%', 
              trend: 'up',
              icon: ShoppingCart 
            },
            { 
              label: 'New Acquisitions', 
              value: '892', 
              change: '+24.3%', 
              trend: 'up',
              icon: TrendingUp 
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

        {/* Main Visualization */}
        <Card>
          <CardHeader className="px-3 sm:px-6">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
              <div>
                <CardTitle className="text-base sm:text-lg lg:text-xl">
                  {segmentType === 'demographics' ? 'Customer Demographics Distribution' :
                   segmentType === 'behavior' ? 'Customer Behavior Analysis' :
                   'Geographic Customer Distribution'}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-1">
                  {segmentType === 'demographics' ? `Age and gender-based customer segmentation` :
                   segmentType === 'behavior' ? `Purchase behavior and loyalty patterns` :
                   `Regional customer distribution and preferences`}
                </CardDescription>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant={isDark ? 'secondary' : 'outline'} 
                  size="sm"
                  className={`flex-1 sm:flex-none text-xs sm:text-sm ${isDark ? 'border-gray-700' : ''}`}
                >
                  <PieChart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Pie Chart
                </Button>
                <Button 
                  variant={isDark ? 'secondary' : 'outline'} 
                  size="sm"
                  className={`flex-1 sm:flex-none text-xs sm:text-sm ${isDark ? 'border-gray-700' : ''}`}
                >
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Bar Chart
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="h-64 sm:h-80 lg:h-96 xl:h-[500px] rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center border-2 border-dashed border-primary/20">
              <div className="text-center space-y-3 sm:space-y-4 px-4">
                <div className="flex justify-center">
                  {segmentType === 'demographics' && <Users className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40" />}
                  {segmentType === 'behavior' && <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40" />}
                  {segmentType === 'geographic' && <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-primary/40" />}
                </div>
                <div>
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground">
                    {segmentType === 'demographics' ? 'Customer Demographics Visualization' :
                     segmentType === 'behavior' ? 'Behavior Pattern Analysis' :
                     'Geographic Distribution Map'}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    Interactive visualization will be displayed here based on selected filters
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="px-3 sm:px-6">
              <CardTitle className="text-base sm:text-lg">Segment Performance</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Revenue and conversion by customer segment</CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="h-48 sm:h-56 lg:h-64 rounded-lg bg-gradient-to-br from-blue-500/5 to-cyan-500/5 flex items-center justify-center border border-blue-200/20">
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-primary/40 mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground">Performance Metrics Chart</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-3 sm:px-6">
              <CardTitle className="text-base sm:text-lg">Customer Journey</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Lifecycle stages and progression patterns</CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="h-48 sm:h-56 lg:h-64 rounded-lg bg-gradient-to-br from-green-500/5 to-emerald-500/5 flex items-center justify-center border border-green-200/20">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-primary/40 mb-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground">Journey Flow Chart</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Segment Insights */}
        <Card>
          <CardHeader className="px-3 sm:px-6">
            <CardTitle className="text-base sm:text-lg">Customer Segment Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-3 sm:px-6">
            <div className="prose max-w-none">
              <h3 className="text-sm sm:text-base font-semibold mb-2">Key Findings</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Top Performing Segments</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>26-35 age group contributes 42% of total revenue</li>
                    <li>Loyal customers have 3.2x higher CLV</li>
                    <li>Female customers show 15% higher retention</li>
                    <li>Urban areas drive 68% of new acquisitions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Growth Opportunities</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Untapped potential in 18-25 demographic</li>
                    <li>Seasonal customers show conversion opportunity</li>
                    <li>Tier-2 cities represent emerging markets</li>
                    <li>Cross-sell opportunities in loyal segment</li>
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