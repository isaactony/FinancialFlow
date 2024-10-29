import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Budget {
  id: number;
  category: string;
  allocated: number;
  spent: number;
}

export function BudgetPlanner() {
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: 1, category: 'Groceries', allocated: 500, spent: 320 },
    { id: 2, category: 'Entertainment', allocated: 200, spent: 150 },
    { id: 3, category: 'Transportation', allocated: 300, spent: 280 },
  ]);

  const [newBudget, setNewBudget] = useState({ category: '', allocated: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBudget.category || !newBudget.allocated) {
      toast({ title: "Error", description: "Please fill all fields" });
      return;
    }

    setBudgets(prev => [...prev, {
      id: Date.now(),
      category: newBudget.category,
      allocated: parseFloat(newBudget.allocated),
      spent: 0
    }]);
    setNewBudget({ category: '', allocated: '' });
    toast({ title: "Success", description: "Budget category added" });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Budget Planner</h3>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Category"
            value={newBudget.category}
            onChange={e => setNewBudget(prev => ({ ...prev, category: e.target.value }))}
            className="w-32"
          />
          <Input
            type="number"
            placeholder="Amount"
            value={newBudget.allocated}
            onChange={e => setNewBudget(prev => ({ ...prev, allocated: e.target.value }))}
            className="w-24"
          />
          <Button type="submit" size="icon"><Plus className="h-4 w-4" /></Button>
        </form>
      </div>

      <div className="space-y-4">
        {budgets.map(budget => {
          const percentage = (budget.spent / budget.allocated) * 100;
          const isOverBudget = percentage > 100;

          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{budget.category}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${isOverBudget ? 'text-red-500' : 'text-muted-foreground'}`}>
                    ${budget.spent} / ${budget.allocated}
                  </span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Progress 
                value={percentage} 
                className={`h-2 ${isOverBudget ? 'bg-red-200' : ''}`}
                indicatorClassName={isOverBudget ? 'bg-red-500' : ''}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}