import React, { useState } from 'react';
import styles from '../Walletsection.module.css'; 
import { useSnackbar } from 'notistack';

function Walletbalance({walletBalance, addIncome}) {
  const [formOpen, setFormopen] = useState(false); 
  const [income, setIncome] = useState(''); 
  const { enqueueSnackbar } = useSnackbar();

  const handleForm = (e) =>{
    e.preventDefault();
    try {
      if(income!==""){
        addIncome(parseFloat(income));
        enqueueSnackbar('Income added in Wallet balance', { variant: 'success' });
        setFormopen(false);
        setIncome("");
      }else{
        enqueueSnackbar('Income is empty', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Cannot add wallet balance', { variant: 'error' });
    }
  };
  return (

     
    <> 
    <div className={styles.Walletbalance}>
      <h2 style={{ fontWeight: "normal", color: "#fff" }}>Wallet Balance: <span style={{ color: "#7dd71d", fontWeight: "bold" }}>₹{walletBalance}</span></h2>
      <button className={styles.addIncomebtn} onClick={() => setFormopen(true)}>+ Add Income</button>
    </div>

    { formOpen && 
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent} style={{minWidth:"450px"}}>
          <h2 style={{margin:"8px 0px"}}>Add Balance</h2>
          <form onSubmit={handleForm}>
              <div style={{display:"flex", gap:"10px", width:"100%"}}>
              <input type="number" min='0' id="income" onInput={(e)=>setIncome(e.target.value)} value={income} placeholder='Income Amount' className={styles.input}/>
              <button type='submit' className={styles.addBtn}>Add Balance</button>
              <button type='button' className={styles.cancelBtn} onClick={()=>setFormopen(false)}>Cancel</button>
              </div>
          </form>
        </div>
      </div>      
    } 
    </>
 
 
  )
}

export default Walletbalance;