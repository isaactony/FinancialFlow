import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Dashboard } from '@/components/pages/Dashboard';
import { Transactions } from '@/components/pages/Transactions';
import { Savings } from '@/components/pages/Savings';
import { Cards } from '@/components/pages/Cards';

export function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="ml-64 p-8 pb-20">
        <Header />
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'transactions' && <Transactions />}
        {currentPage === 'savings' && <Savings />}
        {currentPage === 'cards' && <Cards />}
      </div>
      <Footer />
    </div>
  );
}