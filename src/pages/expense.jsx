import React, { useContext, useEffect, useState } from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import CardExpense from '../components/Fragments/CardExpense';
import { expenseService } from '../services/dataService';
import { AuthContext } from '../context/authContext';
import AppSnackbar from '../components/Elements/AppSnackbar';
import CircularProgress from "@mui/material/CircularProgress";

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await expenseService();
      console.log("=== RAW API DATA ===");
      console.log("Full data:", JSON.stringify(data, null, 2));
      console.log("Data type:", Array.isArray(data) ? "Array" : typeof data);
      console.log("Data length:", data?.length);
      
      // Log each expense detail
      if (Array.isArray(data)) {
        data.forEach((exp, idx) => {
          console.log(`Expense ${idx}:`, exp);
        });
      }
      
      if (Array.isArray(data)) {
        setExpenses(data);
      } else if (data && typeof data === 'object') {
        // Convert object to array jika diperlukan
        setExpenses(Object.values(data));
      } else {
        setExpenses([]);
      }
    } catch (err) {
      console.error("Fetch Expenses Error:", err);
      setExpenses([]);
      setSnackbar({ 
        open: true,
        message: err.msg || "Gagal mengambil data expenses",
        severity: "error"
      });
      if (err.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Group expenses by category
  const groupedExpenses = React.useMemo(() => {
    if (!Array.isArray(expenses) || expenses.length === 0) {
      console.log("No expenses to group");
      return {};
    }
    
    const grouped = expenses.reduce((acc, expense) => {
      if (!expense || typeof expense !== 'object') {
        return acc;
      }
      
      const category = expense.category || 'Others';
      
      // Capitalize category name
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      
      if (!acc[categoryName]) {
        // Transform detail array dari API
        const items = (expense.detail || []).map(item => ({
          description: item.item,
          amount: item.amount,
          date: item.date
        }));
        
        acc[categoryName] = {
          items: items,
          total: parseFloat(expense.amount || 0),
          percentage: expense.percentage || 0,
          trend: expense.trend || 'up'
        };
      }
      
      return acc;
    }, {});
    
    console.log("=== FINAL GROUPED WITH DETAILS ===", grouped);
    return grouped;
  }, [expenses]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col justify-center items-center h-96 text-primary">
          <CircularProgress color="inherit" size={50} />
          <div className="mt-4">Loading Data</div>
        </div>
      );
    }

    if (!expenses || expenses.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-96 text-gray-02">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="text-lg">No Expenses Data Available</div>
        </div>
      );
    }

    const groupedEntries = Object.entries(groupedExpenses);
    console.log("Grouped entries to render:", groupedEntries);
    
    if (groupedEntries.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-96 text-gray-02">
          <div className="text-lg">Unable to group expenses data</div>
          <div className="text-sm mt-2">Raw expenses count: {expenses.length}</div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupedEntries.map(([category, data]) => {
          console.log("Rendering card for:", category, {
            total: data.total,
            percentage: data.percentage,
            itemsCount: data.items.length,
            items: data.items
          });
          return (
            <CardExpense
              key={category}
              category={category}
              totalAmount={data.total.toFixed(0)}
              percentage={data.percentage}
              trend={data.trend}
              items={data.items}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <MainLayout>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-400">Expenses Comparison</h1>
        </div>

        {renderContent()}

        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </MainLayout>
    </>
  );
}

export default Expense;
