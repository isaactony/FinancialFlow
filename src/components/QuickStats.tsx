import { TrendingUp, ShoppingCart, PiggyBank } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="gradient-border animate-in slide-in-from-left duration-500">
        <Card className="p-6 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <h3 className="text-2xl font-bold">$24,560.00</h3>
            </div>
            <div className="p-2 rounded-full bg-green-500/10">
              <TrendingUp className="text-green-500 animate-float" />
            </div>
          </div>
          <Progress value={66} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">+15% from last month</p>
        </Card>
      </div>

      <div className="gradient-border animate-in slide-in-from-left duration-500 delay-150">
        <Card className="p-6 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Spending</p>
              <h3 className="text-2xl font-bold">$3,924.00</h3>
            </div>
            <div className="p-2 rounded-full bg-orange-500/10">
              <ShoppingCart className="text-orange-500 animate-float" />
            </div>
          </div>
          <Progress value={45} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">82% of monthly budget</p>
        </Card>
      </div>

      <div className="gradient-border animate-in slide-in-from-left duration-500 delay-300">
        <Card className="p-6 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Savings Goal</p>
              <h3 className="text-2xl font-bold">$12,000.00</h3>
            </div>
            <div className="p-2 rounded-full bg-blue-500/10">
              <PiggyBank className="text-blue-500 animate-float" />
            </div>
          </div>
          <Progress value={75} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">75% of annual goal</p>
        </Card>
      </div>
    </div>
  );
}