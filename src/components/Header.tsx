import { BellIcon, UserCircle, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="flex justify-between items-center mb-8 animate-in fade-in slide-in-from-top duration-500">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
        Welcome back, User!
      </h1>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative group">
          <BellIcon className="h-5 w-5 transition-transform group-hover:rotate-12" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
        <Button variant="ghost" size="icon" className="group">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform group-hover:scale-110" />
        </Button>
        <Button variant="ghost" size="icon" className="group">
          <UserCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
        </Button>
      </div>
    </header>
  );
}