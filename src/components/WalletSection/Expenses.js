import React, { useState } from 'react';
import styles from '../Walletsection.module.css';
import { useSnackbar } from 'notistack';

function Expenses({ addExpense, totalExpenses}) {

  const [formOpen, setFormopen] = useState(false); 
  const [title, setTitle] = useState(""); 
  const [amount, setAmount] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [date, setDate] = useState(""); 
  const { enqueueSnackbar } = useSnackbar();
 
  const handleForm = (e) =>{
    e.preventDefault();
    try {
      let err = "";
      if(title==="")
        err = "Title is empty";
      else if(amount==="")
        err = "Price is empty";
      else if(category==="")
        err = "Select Category";
      else if(date==="")
        err = "Select Date";

      if(err!=="")
        enqueueSnackbar(err, { variant: 'error' });
      else{ 
        addExpense({id: Date.now(), title, amount, category, date});
        enqueueSnackbar('Expense added', { variant: 'success' });
        setFormopen(false);
        setTitle("");
        setAmount("");
        setCategory("");
        setDate(""); 
      } 
    } catch (error) {
      enqueueSnackbar('Cannot add wallet balance', { variant: 'error' });
    }
  };

  return (
    <>
    <div className={styles.Expenses}>
        <h2 style={{fontWeight:"normal",color:"#fff"}}>Expenses: <span style={{color:"#f4bb4a",fontWeight:"bold"}}>₹{totalExpenses}</span></h2>
        <button className={styles.addExpensebtn} onClick={() => setFormopen(true)}>+ Add Expenses</button>
    </div>
    { formOpen && 
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2 style={{margin:"8px 0px"}}>Add Expenses</h2>
          <form onSubmit={handleForm}>
              <div style={{display:"flex", gap:"10px", width:"100%", margin:"15px 0",minWidth:"450px"}}>
                <input type="text" id="title" onInput={(e)=>setTitle(e.target.value)} placeholder='Title' className={styles.input} value={title}/> 
                <input type="text" id="amount" onInput={(e)=>setAmount(e.target.value)} placeholder='Price' className={styles.input} value={amount}/>          
              </div>
              <div style={{display:"flex", gap:"10px", width:"100%", margin:"15px 0",minWidth:"450px"}}> 
                <select id="category" onInput={(e)=>setCategory(e.target.value)} className={styles.select} value={category}>
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Entertainment">Entertainment</option>
                </select> 
                <input type="date" id="date" onInput={(e)=>setDate(e.target.value)} placeholder='dd/mm/yyyy' className={styles.input} value={date}/>             
              </div>
              <div style={{display:"flex", gap:"10px", width:"100%", margin:"15px 0",minWidth:"450px"}}>
                <button type='submit' className={styles.addBtn} style={{width:"49%"}}>Add Expenses</button>
                <button type='button' className={styles.cancelBtn} onClick={()=>setFormopen(false)}>Cancel</button>
              </div>
          </form>
        </div>
      </div>
    } 
    </>
  )
}

export default Expenses