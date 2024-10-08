import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
function ExpenseSummary({ expenses }) {
  
  const data = expenses.reduce((acc, expense) => {
    const existing = acc.find((d) => d.name === expense.category);
    if (existing) {
      existing.value += parseInt(expense.amount);
    } else {
      acc.push({ name: expense.category, value: parseInt(expense.amount) });
    }
    return acc;
  }, []);

  data.sort((a,b)=>a.name.localeCompare(b.name)); 
  const COLORS = ["#ff9304", "#a000ff", "#fde006", "#FF8042"];
  
  const RADIAN = Math.PI / 180;
  
  
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }; 

  return (
    <div style={{width:"28%", display:"flex", justifyContent:"center"}}>
        <PieChart width={200} height={220}>
            <Pie
                data={data}
                cx={100}
                cy={100}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                stroke="none"
            >
                {data.map((entry, index) => (
                    <Cell style={{outline: 'none'}} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend width={400} layout="horizontal" align="left" verticalAlign="bottom" />
        </PieChart>
    </div>
  );
}

export default ExpenseSummary;
