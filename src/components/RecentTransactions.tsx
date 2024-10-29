import { ShoppingCart, Briefcase, ShoppingBag, Coffee } from 'lucide-react';
import { Card } from '@/components/ui/card';

const transactions = [
  { 
    name: 'Amazon', 
    amount: -89.99, 
    category: 'Shopping', 
    date: 'Today',
    icon: ShoppingCart,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  { 
    name: 'Salary', 
    amount: 3500, 
    category: 'Income', 
    date: 'Yesterday',
    icon: Briefcase,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  { 
    name: 'Grocery Store', 
    amount: -156.32, 
    category: 'Groceries', 
    date: '2 days ago',
    icon: ShoppingBag,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  { 
    name: 'Starbucks', 
    amount: -4.99, 
    category: 'Food & Drink', 
    date: '2 days ago',
    icon: Coffee,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  }
];

export function RecentTransactions() {
  return (
    <Card className="p-6 animate-in fade-in duration-700 delay-300">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction, index) => {
          const Icon = transaction.icon;
          return (
            <div
              key={transaction.name}
              className="group flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all duration-300 animate-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${transaction.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-4 w-4 ${transaction.color}`} />
                </div>
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-muted-foreground">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${transaction.amount > 0 ? 'text-green-500' : ''}`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                </p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}