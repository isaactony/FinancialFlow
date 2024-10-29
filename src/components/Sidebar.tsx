import { Wallet, LayoutDashboard, ShoppingCart, PiggyBank, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-background/50 backdrop-blur-xl border-r p-4">
      <div className="flex items-center gap-2 mb-8 animate-in fade-in slide-in-from-left duration-500">
        <div className="p-2 rounded-full bg-primary/10">
          <Wallet className="h-6 w-6 text-primary animate-float" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          FinanceFlow
        </h1>
      </div>
      
      <nav className="space-y-2">
        {[
          { icon: LayoutDashboard, label: 'Dashboard', value: 'dashboard' },
          { icon: ShoppingCart, label: 'Transactions', value: 'transactions' },
          { icon: PiggyBank, label: 'Savings', value: 'savings' },
          { icon: CreditCard, label: 'Cards', value: 'cards' },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <Button 
              key={item.value}
              variant={currentPage === item.value ? 'secondary' : 'ghost'}
              className={`w-full justify-start gap-2 group animate-in slide-in-from-left duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onPageChange(item.value)}
            >
              <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                currentPage === item.value ? 'text-primary' : 'text-muted-foreground'
              }`} />
              <span className={currentPage === item.value ? 'text-primary' : 'text-muted-foreground'}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}