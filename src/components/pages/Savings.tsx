import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PiggyBank, Target, TrendingUp, Plus, Minus, Trophy, Calendar, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SavingsGoal {
  id: number;
  name: string;
  current: number;
  target: number;
  deadline?: string;
  category: string;
  monthlyContribution: number;
  lastUpdated?: string;
}

const categories = [
  'Emergency Fund',
  'Vacation',
  'Home',
  'Car',
  'Education',
  'Retirement',
  'Other'
];

export function Savings() {
  const { toast } = useToast();
  const [goals, setGoals] = useState<SavingsGoal[]>([
    { 
      id: 1, 
      name: 'Emergency Fund', 
      current: 5000, 
      target: 10000,
      deadline: '2024-12-31',
      category: 'Emergency Fund',
      monthlyContribution: 500,
      lastUpdated: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Dream Vacation', 
      current: 2000, 
      target: 5000,
      deadline: '2024-06-30',
      category: 'Vacation',
      monthlyContribution: 300,
      lastUpdated: '2024-01-10'
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    deadline: '',
    category: '',
    monthlyContribution: '',
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newGoal.name || !newGoal.target || !newGoal.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const goal: SavingsGoal = {
      id: Date.now(),
      name: newGoal.name,
      current: 0,
      target: parseFloat(newGoal.target),
      deadline: newGoal.deadline,
      category: newGoal.category,
      monthlyContribution: parseFloat(newGoal.monthlyContribution) || 0,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({ name: '', target: '', deadline: '', category: '', monthlyContribution: '' });
    setShowAddForm(false);
    
    toast({
      title: "Success",
      description: "Savings goal added successfully",
    });
  };

  const updateProgress = (id: number, amount: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const newAmount = Math.max(0, Math.min(goal.current + amount, goal.target));
        return { 
          ...goal, 
          current: newAmount,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return goal;
    }));

    toast({
      title: "Success",
      description: `Progress ${amount > 0 ? 'increased' : 'decreased'} by $${Math.abs(amount)}`,
    });
  };

  const getTotalSavings = () => goals.reduce((sum, goal) => sum + goal.current, 0);
  const getTotalTarget = () => goals.reduce((sum, goal) => sum + goal.target, 0);

  const getTimeRemaining = (deadline: string) => {
    if (!deadline) return null;
    const remaining = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return remaining > 0 ? remaining : 0;
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border-none">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Total Savings Progress</h2>
            <p className="text-muted-foreground">Track your journey to financial freedom</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
            {showAddForm ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showAddForm ? 'Cancel' : 'New Goal'}
          </Button>
        </div>
        <div className="mb-4">
          <Progress value={(getTotalSavings() / getTotalTarget()) * 100} className="h-3" />
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">${getTotalSavings().toLocaleString()}</span>
          <span className="text-muted-foreground">Target: ${getTotalTarget().toLocaleString()}</span>
        </div>
      </Card>

      {/* Add New Goal Form */}
      {showAddForm && (
        <Card className="p-6 animate-in slide-in-from-top duration-500">
          <h2 className="text-xl font-bold mb-4">Add New Savings Goal</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Goal Name"
              name="name"
              value={newGoal.name}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              placeholder="Target Amount"
              name="target"
              value={newGoal.target}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
            <select
              name="category"
              value={newGoal.category}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Input
              type="number"
              placeholder="Monthly Contribution"
              name="monthlyContribution"
              value={newGoal.monthlyContribution}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
            <Input
              type="date"
              placeholder="Target Date"
              name="deadline"
              value={newGoal.deadline}
              onChange={handleInputChange}
            />
            <Button type="submit" className="md:col-span-2">Create Savings Goal</Button>
          </form>
        </Card>
      )}

      {/* Savings Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const daysRemaining = goal.deadline ? getTimeRemaining(goal.deadline) : null;
          const isCompleted = goal.current >= goal.target;

          return (
            <Card key={goal.id} className={`p-6 relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
              isCompleted ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10' : ''
            }`}>
              {isCompleted && (
                <div className="absolute top-2 right-2">
                  <Trophy className="h-6 w-6 text-yellow-500 animate-bounce" />
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-2 rounded-full ${
                  isCompleted ? 'bg-green-500/10' : 'bg-blue-500/10'
                }`}>
                  <Target className={`h-5 w-5 ${
                    isCompleted ? 'text-green-500' : 'text-blue-500'
                  }`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{goal.name}</h3>
                  <p className="text-sm text-muted-foreground">{goal.category}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm mt-1">
                    <span>${goal.current.toLocaleString()}</span>
                    <span className="text-muted-foreground">${goal.target.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-sm">
                  {goal.monthlyContribution > 0 && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>${goal.monthlyContribution}/month</span>
                    </div>
                  )}
                  {daysRemaining !== null && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{daysRemaining} days left</span>
                    </div>
                  )}
                </div>

                {!isCompleted && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => updateProgress(goal.id, -100)}
                      className="flex-1"
                    >
                      <Minus className="h-4 w-4 mr-1" /> $100
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => updateProgress(goal.id, 100)}
                      className="flex-1"
                    >
                      <Plus className="h-4 w-4 mr-1" /> $100
                    </Button>
                  </div>
                )}

                {goal.lastUpdated && (
                  <p className="text-xs text-muted-foreground text-center">
                    Last updated: {new Date(goal.lastUpdated).toLocaleDateString()}
                  </p>
                )}
              </div>

              {isCompleted && (
                <div className="mt-4 p-2 bg-green-500/10 rounded-lg flex items-center gap-2 justify-center text-green-500">
                  <Sparkles className="h-4 w-4" />
                  <span>Goal Achieved!</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}