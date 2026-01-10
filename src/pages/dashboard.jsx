import React, { useContext, useEffect, useState}from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import Card from '../components/Elements/Card';
import CardBalance from '../components/Fragments/CardBalance';
import CardGoal from '../components/Fragments/CardGoal';
import CardUpcomingBill from '../components/Fragments/CardUpcomingBill';
import CardRecentTransactions from '../components/Fragments/CardRecentTransactions';
import CardStatistics from '../components/Fragments/CardStatistics';
import CardExpensesBreakdown from '../components/Fragments/CardExpensesBreakdown';  
import { 
  transactions,
   bills,
   expensesBreakdowns, 
   balances,
   goals,
   expensesStatistics } from '../data';
import { goalService } from '../services/dataService';
import { AuthContext } from '../context/authContext';

function Dashboard() {

  	const [goals, setGoals] = useState({});

  const fetchGoals = async () => {
    try {
      const data = await goalService();
      setGoals(data);
    } catch (err) {
      console.error("Gagal mengambil data goals:", err);
      if (err.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);
  
  console.log(goals);
  console.log(transactions);

  return (
    <>
     <MainLayout>
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <CardBalance data={balances} />
          </div>
          <div className="sm:col-span-4">
            <CardGoal data={goals} />
          </div>
          <div className="sm:col-span-4">
            <CardUpcomingBill data={bills}/>
          </div>
          <div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransactions data={transactions}/>
          </div>
          <div className="sm:col-span-8">
            <CardStatistics data={expensesStatistics} />
          </div>
          <div className="sm:col-span-8">
            <CardExpensesBreakdown data={expensesBreakdowns}/>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Dashboard