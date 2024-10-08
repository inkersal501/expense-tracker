import React from 'react'
import styles from './ExpenseList.module.css'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function TopExpenses({expenses}) {
    const data = expenses.reduce((acc, expense) => {
        const existing = acc.find((d) => d.name === expense.category);
        if (existing) {
          existing.expense += parseInt(expense.amount);
        } else {
          acc.push({ name: expense.category, expense: parseInt(expense.amount) });
        }
        return acc;
      }, []);
    
    data.sort((a,b)=>a.name.localeCompare(b.name));  

  return (
    <div className={styles.TopExpenses}>
        <h2 className={styles.heading}>Top Expenses</h2>
        <div className={styles.barChart}>
            <BarChart
                layout="vertical"
                width={420}
                height={300}
                data={data}
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis hide type="number" axisLine={false} tickLine={false} tick={false}/>
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="expense" fill="#8784d2" barSize={20} radius={[0, 10, 10, 0]} />
            </BarChart>
        </div>
    </div>
  )
}

export default TopExpenses;