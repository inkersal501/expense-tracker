import React from 'react'; 
import styles from './Walletsection.module.css';
import Walletbalance from './WalletSection/Walletbalance';
import Expenses from './WalletSection/Expenses';
import ExpenseSummary from './WalletSection/ExpenseSummary';

function Walletsection({walletBalance, addIncome, expenses, addExpense, totalExpenses}) {
  return (
    <div className={styles.Walletsection}> 
        <Walletbalance walletBalance={walletBalance} addIncome={addIncome}/>
        <Expenses addExpense={addExpense} totalExpenses={totalExpenses}/> 
        <ExpenseSummary expenses={expenses}/>
    </div>
  )
}

export default Walletsection;