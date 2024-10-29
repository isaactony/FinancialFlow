import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreditCardType {
  id: number;
  number: string;
  holder: string;
  expiry: string;
}

export function Cards() {
  const { toast } = useToast();
  const [cards, setCards] = useState<CreditCardType[]>([
    { id: 1, number: '4532 **** **** 1234', holder: 'John Doe', expiry: '12/25' },
  ]);

  const [newCard, setNewCard] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCard.number || !newCard.holder || !newCard.expiry || !newCard.cvv) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const card: CreditCardType = {
      id: Date.now(),
      number: newCard.number.replace(/(\d{4})/g, '$1 ').trim(),
      holder: newCard.holder,
      expiry: newCard.expiry,
    };

    setCards(prev => [...prev, card]);
    setNewCard({ number: '', holder: '', expiry: '', cvv: '' });
    
    toast({
      title: "Success",
      description: "Card added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Card</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Card Number"
            name="number"
            value={newCard.number}
            onChange={handleInputChange}
            maxLength={16}
            required
          />
          <Input
            placeholder="Card Holder Name"
            name="holder"
            value={newCard.holder}
            onChange={handleInputChange}
            required
          />
          <Input
            placeholder="Expiry Date (MM/YY)"
            name="expiry"
            value={newCard.expiry}
            onChange={handleInputChange}
            maxLength={5}
            required
          />
          <Input
            placeholder="CVV"
            name="cvv"
            type="password"
            value={newCard.cvv}
            onChange={handleInputChange}
            maxLength={3}
            required
          />
          <Button type="submit" className="md:col-span-2">Add Card</Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="flex justify-between items-start mb-8">
              <CreditCard className="h-8 w-8" />
              <span className="text-lg">VISA</span>
            </div>
            <div className="space-y-4">
              <p className="text-2xl tracking-wider">{card.number}</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs opacity-80">Card Holder</p>
                  <p>{card.holder}</p>
                </div>
                <div>
                  <p className="text-xs opacity-80">Expires</p>
                  <p>{card.expiry}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}