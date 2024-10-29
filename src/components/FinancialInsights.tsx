import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown, TrendingUp, AlertCircle } from 'lucide-react';

const insights = [
  {
    title: 'Spending Alert',
    description: 'Your restaurant spending is 40% higher than last month',
    icon: AlertCircle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    title: 'Savings Opportunity',
    description: 'You could save $200 by reducing subscription services',
    icon: TrendingUp,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    title: 'Unusual Activity',
    description: 'Large transaction detected: $500 at Electronics Store',
    icon: ArrowUp,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  }
];

export function FinancialInsights() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Financial Insights</h3>
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all"
            >
              <div className={`p-2 rounded-full ${insight.bgColor}`}>
                <Icon className={`h-4 w-4 ${insight.color}`} />
              </div>
              <div>
                <h4 className="font-medium">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}