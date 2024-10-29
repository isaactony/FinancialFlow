import { QuickStats } from '@/components/QuickStats';
import { SpendingChart } from '@/components/SpendingChart';
import { CategoryChart } from '@/components/CategoryChart';
import { RecentTransactions } from '@/components/RecentTransactions';
import { BudgetPlanner } from '@/components/BudgetPlanner';
import { FinancialInsights } from '@/components/FinancialInsights';
import { BillReminders } from '@/components/BillReminders';

export function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <QuickStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart />
        <CategoryChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetPlanner />
        <div className="space-y-6">
          <FinancialInsights />
          <BillReminders />
        </div>
      </div>
      <RecentTransactions />
    </div>
  );
}