import React, { useState, useEffect } from 'react'; 
import './App.css';
import ExpenseList from './components/ExpenseList';
import Walletsection from './components/Walletsection'; 
import { SnackbarProvider, useSnackbar } from 'notistack';
import TopExpenses from './components/TopExpenses';

function App() {

  const [walletBalance, setWalletBalance] = useState(() => {
    return parseFloat(localStorage.getItem("walletBalance")) || 5000;
  });

  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });
  const [totalExpenses, setTotalExpenses] = useState(0);

  const calculateExpenses= (expenses) =>{
    const total = expenses.reduce((acc, curr)=> acc + parseFloat(curr.amount),0);
    setTotalExpenses(total);
  };
  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    calculateExpenses(expenses);
  }, [walletBalance, expenses]);

  const { enqueueSnackbar } = useSnackbar();

  const addIncome = (amount) => {
    setWalletBalance((prev) => prev + parseFloat(amount));
  };

  const addExpense = (expense) => {
    // console.log(expense);
    if (expense.amount > walletBalance) {
        enqueueSnackbar("You can't spend more than your wallet balance!", {
        variant: "error",
      });
    } else { 
      const temp =[ ...expenses, expense]; 
      setExpenses(temp);
      setWalletBalance(walletBalance - expense.amount);
    }
  };
  const editExpense = (updatedExpense) => {
    const expense = expenses.filter((e) => e.id === updatedExpense.id);    
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    ); 
    setExpenses(updatedExpenses);
    setWalletBalance(walletBalance + parseInt(expense[0].amount) - parseInt(updatedExpense.amount));
 
  };
  const deleteExpense = (id) => { 
    const expense = expenses.filter((e) => e.id === id);
    setExpenses(expenses.filter((e) => e.id !== id));
    setWalletBalance(walletBalance + parseInt(expense[0].amount));
  }; 
  
  return (

    <SnackbarProvider>
      <div className="App">
        <h2 className="App-heading">Expense Tracker</h2>
        <Walletsection walletBalance={walletBalance} addIncome={addIncome} expenses={expenses} addExpense={addExpense} totalExpenses={totalExpenses}/>
        <div style={{display:"flex", margin:"20px 0px", gap:"20px"}}>
          <ExpenseList expenses={expenses} editExpense={editExpense} deleteExpense={deleteExpense}/>
          <TopExpenses expenses={expenses} />
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
