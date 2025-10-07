'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CircleCheck as CheckCircle2, Calendar, DollarSign, Users, TrendingUp, Target, Rocket } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function PlanPage() {
  const [isScheduled, setIsScheduled] = useState(false);

  const strategicPillars = [
    {
      title: 'Market Expansion',
      description: 'Enter Southeast region with targeted distribution strategy',
      impact: 'High',
      icon: Target,
    },
    {
      title: 'Revenue Optimization',
      description: 'Implement dynamic pricing and premium product lines',
      impact: 'High',
      icon: TrendingUp,
    },
    {
      title: 'Customer Excellence',
      description: 'Launch loyalty program to boost retention and lifetime value',
      impact: 'Medium',
      icon: Users,
    },
  ];

  const actionItems = [
    {
      priority: 'Immediate',
      title: 'Deploy Dynamic Pricing Engine',
      timeframe: 'Weeks 1-4',
      owner: 'Revenue Operations',
      description:
        'Implement AI-driven pricing optimization across high-velocity product categories',
    },
    {
      priority: 'Short-term',
      title: 'Launch Southeast Market Research',
      timeframe: 'Weeks 5-8',
      owner: 'Business Development',
      description:
        'Conduct comprehensive market analysis and identify distribution partnership opportunities',
    },
    {
      priority: 'Short-term',
      title: 'Design Loyalty Program Framework',
      timeframe: 'Weeks 6-10',
      owner: 'Customer Success',
      description:
        'Create tiered rewards structure and integrate with existing customer platform',
    },
    {
      priority: 'Mid-term',
      title: 'Premium Product Line Development',
      timeframe: 'Weeks 12-20',
      owner: 'Product Management',
      description:
        'Source premium suppliers and develop brand positioning for high-margin product expansion',
    },
    {
      priority: 'Mid-term',
      title: 'Southeast Region Market Entry',
      timeframe: 'Weeks 16-24',
      owner: 'Sales & Marketing',
      description:
        'Establish distribution partnerships and deploy regional sales team with targeted campaigns',
    },
    {
      priority: 'Long-term',
      title: 'Loyalty Program Full Launch',
      timeframe: 'Week 20+',
      owner: 'Marketing',
      description:
        'Roll out comprehensive loyalty program with referral incentives and exclusive benefits',
    },
  ];

  const getPriorityColor = (priority: string) => {
    if (priority === 'Immediate') return 'bg-red-500';
    if (priority === 'Short-term') return 'bg-orange-500';
    if (priority === 'Mid-term') return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Actionable Business Plan</h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg px-2 sm:px-0 leading-relaxed">
            Your comprehensive strategic roadmap with prioritized action items and resource
            allocation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {strategicPillars.map((pillar, i) => (
            <Card key={i} className="border-l-4 border-l-primary">
              <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                <div className="flex items-start justify-between mb-2">
                  <pillar.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
                  <Badge
                    variant={pillar.impact === 'High' ? 'destructive' : 'secondary'}
                    className={`text-xs ${pillar.impact === 'High' ? 'bg-primary' : ''}`}
                  >
                    {pillar.impact} Impact
                  </Badge>
                </div>
                <CardTitle className="text-lg sm:text-xl">{pillar.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">{pillar.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl">Strategic Action Roadmap</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Prioritized implementation timeline with clear ownership and milestones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
            {actionItems.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border hover:border-primary/50 transition-colors bg-card"
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)} flex-shrink-0`}
                  ></div>
                  {i < actionItems.length - 1 && (
                    <div className="w-0.5 h-full bg-border"></div>
                  )}
                </div>
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <Badge variant="outline" className="text-xs w-fit">
                          {item.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.timeframe}</span>
                      </div>
                      <h3 className="font-semibold text-base sm:text-lg leading-tight">{item.title}</h3>
                    </div>
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="w-3 h-3 flex-shrink-0" />
                    <span>Owner: {item.owner}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Resource Impact Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm font-medium">Estimated Budget</span>
                  <span className="text-xs sm:text-sm font-bold">$425,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm font-medium">Projected ROI</span>
                  <span className="text-xs sm:text-sm font-bold text-primary">285%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm font-medium">Payback Period</span>
                  <span className="text-xs sm:text-sm font-bold">8-10 months</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Implementation Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm font-medium">Quick Wins</span>
                  <span className="text-xs sm:text-sm font-bold">1-3 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm font-medium">Core Initiatives</span>
                  <span className="text-xs sm:text-sm font-bold">3-6 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm font-medium">Full Implementation</span>
                  <span className="text-xs sm:text-sm font-bold">6-12 months</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {!isScheduled ? (
          <Card className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 border-primary/30">
            <CardHeader className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 text-center sm:text-left">
              <CardTitle className="text-lg sm:text-xl md:text-2xl mb-2">Ready to Launch Your Strategy?</CardTitle>
              <CardDescription className="text-xs sm:text-sm md:text-base leading-relaxed break-words hyphens-auto">
                Schedule a strategic implementation session with our expert team to refine your plan and accelerate execution
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 md:px-6 py-0 pb-4 sm:pb-6">
              <Button
                onClick={() => setIsScheduled(true)}
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm md:text-lg px-3 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 h-auto"
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="text-center leading-tight">Schedule Your Strategic Implementation Session</span>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Alert className="bg-primary/10 border-primary">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <AlertDescription className="text-sm sm:text-base leading-relaxed">
              Success! Your strategic implementation session has been scheduled. A member of our
              strategy team will contact you within 24 hours to confirm the details and begin your
              transformation journey.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </DashboardLayout>
  );
}
