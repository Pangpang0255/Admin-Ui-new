import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import Card from '../components/Elements/Card';
import CardBalance from '../components/Fragments/CardBalance';
import CardGoal from '../components/Elements/CardGoal';
import CardUpcomingBill from '../components/Fragments/CardUpcomingBill';
import CardRecentTransactions from '../components/Fragments/CardRecentTransactions';
import CardStatistics from '../components/Fragments/CardStatistics';
import CardExpensesBreakdown from '../components/Fragments/CardExpensesBreakdown';  
import { transactions, bills, expensesBreakdowns } from '../data';

function Dashboard() {
  console.log(transactions);

  return (
    <>
     <MainLayout>
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <CardBalance />
          </div>
          <div className="sm:col-span-4">
            <CardGoal/>
          </div>
          <div className="sm:col-span-4">
            <CardUpcomingBill data={bills}/>
          </div>
          <div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransactions data={transactions}/>
          </div>
          <div className="sm:col-span-8">
            <CardStatistics/>
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