import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Bill {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid';
}

export function BillReminders() {
  const { toast } = useToast();
  const [bills, setBills] = useState<Bill[]>([
    { id: 1, name: 'Electricity Bill', amount: 120, dueDate: '2024-02-15', status: 'pending' },
    { id: 2, name: 'Internet Bill', amount: 80, dueDate: '2024-02-20', status: 'pending' },
    { id: 3, name: 'Water Bill', amount: 45, dueDate: '2024-02-25', status: 'paid' },
  ]);

  const [newBill, setNewBill] = useState({ name: '', amount: '', dueDate: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBill.name || !newBill.amount || !newBill.dueDate) {
      toast({ title: "Error", description: "Please fill all fields" });
      return;
    }

    setBills(prev => [...prev, {
      id: Date.now(),
      name: newBill.name,
      amount: parseFloat(newBill.amount),
      dueDate: newBill.dueDate,
      status: 'pending'
    }]);
    setNewBill({ name: '', amount: '', dueDate: '' });
    toast({ title: "Success", description: "Bill reminder added" });
  };

  const markAsPaid = (id: number) => {
    setBills(prev => prev.map(bill => 
      bill.id === id ? { ...bill, status: 'paid' } : bill
    ));
    toast({ title: "Success", description: "Bill marked as paid" });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Bill Reminders</h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            placeholder="Bill Name"
            value={newBill.name}
            onChange={e => setNewBill(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={newBill.amount}
            onChange={e => setNewBill(prev => ({ ...prev, amount: e.target.value }))}
          />
          <Input
            type="date"
            value={newBill.dueDate}
            onChange={e => setNewBill(prev => ({ ...prev, dueDate: e.target.value }))}
          />
          <Button type="submit" className="w-full">Add Bill</Button>
        </div>
      </form>

      <div className="space-y-4">
        {bills.map(bill => (
          <div
            key={bill.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg gap-4 ${
              bill.status === 'paid' ? 'bg-muted/30' : 'bg-muted/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${
                bill.status === 'paid' ? 'bg-green-500/10' : 'bg-orange-500/10'
              }`}>
                <Bell className={`h-4 w-4 ${
                  bill.status === 'paid' ? 'text-green-500' : 'text-orange-500'
                }`} />
              </div>
              <div>
                <h4 className="font-medium">{bill.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {new Date(bill.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-between sm:justify-end">
              <span className="font-medium">${bill.amount}</span>
              {bill.status === 'pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => markAsPaid(bill.id)}
                >
                  Mark as Paid
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}