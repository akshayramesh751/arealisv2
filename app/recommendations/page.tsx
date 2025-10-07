'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  TrendingUp,
  Users,
  Package,
  Target,
  ArrowRight,
  Lightbulb,
  DollarSign,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function RecommendationsPage() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<number | null>(null);
  const router = useRouter();

  const handleCreatePlan = () => {
    router.push('/plan');
  };

  const recommendations = [
    {
      category: 'Market Expansion',
      title: 'Southeast Region Market Entry',
      priority: 'High',
      impact: 'Revenue Growth: +$450K annually',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
      rationale:
        'Analysis reveals untapped market potential in Southeast region with demographic alignment matching your top-performing Northeast customer base. Low competitive density and growing economic indicators suggest optimal timing for market entry.',
      steps: [
        'Conduct detailed market research and competitive analysis in target cities',
        'Establish distribution partnerships with 3-5 regional distributors',
        'Launch targeted marketing campaign with $75K budget allocation',
        'Deploy regional sales team of 4-6 representatives',
        'Implement localized pricing strategy based on regional purchasing power',
      ],
      outcomes: 'Achieve 5-10% revenue increase within 12 months, establish foundation for long-term regional dominance',
      timeline: '6-9 months',
    },
    {
      category: 'Pricing Strategy',
      title: 'Dynamic Pricing Optimization',
      priority: 'High',
      impact: 'Margin Improvement: +3.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      rationale:
        'Current fixed pricing model leaves margin opportunity on the table. Market analysis shows customers in premium segments demonstrate 20% lower price sensitivity, while competitive pressure exists in value segments.',
      steps: [
        'Implement tiered pricing structure across product categories',
        'Deploy AI-driven dynamic pricing engine for high-velocity items',
        'Create premium product bundles targeting high-value customer segments',
        'Establish competitive monitoring system for real-time price adjustments',
        'A/B test pricing strategies across different customer cohorts',
      ],
      outcomes: 'Increase overall profit margin by 3-5 percentage points while maintaining competitive positioning',
      timeline: '3-4 months',
    },
    {
      category: 'Product Development',
      title: 'Premium Product Line Expansion',
      priority: 'Medium',
      impact: 'New Revenue Stream: $280K',
      icon: Package,
      color: 'from-purple-500 to-pink-500',
      rationale:
        'Customer segmentation analysis reveals growing premium segment with 35% higher lifetime value. Current product portfolio underserves this lucrative market with only 12% of SKUs positioned at premium price points.',
      steps: [
        'Identify 15-20 high-margin product opportunities through customer surveys',
        'Develop premium brand positioning and packaging design',
        'Secure premium supplier relationships and negotiate favorable terms',
        'Create targeted marketing campaign for premium product launch',
        'Establish dedicated customer service tier for premium buyers',
      ],
      outcomes: 'Capture premium market segment, increase average order value by 18-22%',
      timeline: '4-6 months',
    },
    {
      category: 'Customer Retention',
      title: 'Loyalty Program Implementation',
      priority: 'Medium',
      impact: 'Retention Improvement: +12%',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      rationale:
        'Current customer retention rate of 73% falls below industry benchmark of 85%. Cohort analysis shows repeat customers generate 3.2x higher lifetime value, making retention improvement a high-ROI initiative.',
      steps: [
        'Design tiered rewards program with clear value proposition',
        'Implement loyalty platform integration with existing systems',
        'Create personalized communication strategy for different tiers',
        'Develop exclusive benefits and early access opportunities',
        'Launch referral incentive program to drive organic growth',
      ],
      outcomes: 'Increase customer retention rate to 85%, boost repeat purchase frequency by 25%',
      timeline: '2-3 months',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground px-2 sm:px-0">
            Growth Recommendations
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg px-2 sm:px-0 leading-relaxed">
            AI-powered strategic recommendations tailored to your business insights
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {recommendations.map((rec, i) => (
            <Card
              key={i}
              className={`transition-all ${
                selectedRecommendation === i
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${rec.color} flex-shrink-0`}
                    >
                      <rec.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {rec.category}
                        </Badge>
                        <Badge
                          variant={rec.priority === 'High' ? 'destructive' : 'default'}
                          className={`text-xs ${
                            rec.priority === 'High' ? 'bg-primary' : ''
                          }`}
                        >
                          {rec.priority} Priority
                        </Badge>
                      </div>
                      <CardTitle className="text-lg sm:text-xl lg:text-2xl mb-2 leading-tight">
                        {rec.title}
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base flex items-center gap-2 leading-relaxed">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="break-words">{rec.impact}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    onClick={() =>
                      setSelectedRecommendation(selectedRecommendation === i ? null : i)
                    }
                    variant={selectedRecommendation === i ? 'default' : 'outline'}
                    className={`w-full sm:w-auto text-xs sm:text-sm ${
                      selectedRecommendation === i ? 'bg-primary' : ''
                    }`}
                    size="sm"
                  >
                    {selectedRecommendation === i ? 'Hide Details' : 'View Details'}
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>

              {selectedRecommendation === i && (
                <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t px-4 sm:px-6 pb-4 sm:pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-semibold">Strategic Rationale</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {rec.rationale}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                      Actionable Implementation Steps
                    </h3>
                    <ol className="space-y-2 sm:space-y-3">
                      {rec.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-2 sm:gap-3">
                          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs sm:text-sm font-semibold">
                            {idx + 1}
                          </div>
                          <p className="text-muted-foreground pt-0.5 text-xs sm:text-sm leading-relaxed">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Expected Outcomes</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {rec.outcomes}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Implementation Timeline</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {rec.timeline}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`h-32 sm:h-40 lg:h-48 rounded-lg bg-gradient-to-br ${rec.color} opacity-20 flex items-center justify-center`}
                  >
                    <rec.icon className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white/50" />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="px-4 sm:px-6 text-center sm:text-left">
            <CardTitle className="text-lg sm:text-xl">
              Ready to transform insights into action?
            </CardTitle>
            <CardDescription className="text-sm sm:text-base leading-relaxed">
              Generate your comprehensive business plan with prioritized action items
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <Button
              onClick={handleCreatePlan}
              className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto text-sm sm:text-base"
              size="lg"
            >
              Create Actionable Business Plan
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
