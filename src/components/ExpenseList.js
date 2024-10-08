import React, { useState } from "react";
import styles from "./ExpenseList.module.css";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { PiPizza } from "react-icons/pi";
import { LuGift } from "react-icons/lu";
import { BsSuitcase2 } from "react-icons/bs";
import { useSnackbar } from "notistack";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

function ExpenseList({ expenses, editExpense, deleteExpense }) {
  const [formOpen, setFormopen] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const expensesRev = expenses.sort((a, b) => b.id - a.id);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const indexOfLastitem = currentPage * itemsPerPage;
  const indexOfFirstitem = indexOfLastitem - itemsPerPage;
  const currentExpenses = expensesRev.slice(indexOfFirstitem, indexOfLastitem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const openForm = (expense) => {
    setId(expense.id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
    setFormopen(true);
  };
  const closeForm = () => {
    setId("");
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
    setFormopen(false);
  };

  const handleForm = (e) => {
    e.preventDefault();
    try {
      let err = "";
      if (title === "") err = "Title is empty";
      else if (amount === "") err = "Price is empty";
      else if (category === "") err = "Select Category";
      else if (date === "") err = "Select Date";

      if (err !== "") enqueueSnackbar(err, { variant: "error" });
      else {
        editExpense({ id, title, amount, category, date });
        enqueueSnackbar("Expense Updated", { variant: "success" });
        closeForm();
      }
    } catch (error) {
      enqueueSnackbar("Cannot add wallet balance", { variant: "error" });
    }
  };

  const handleDelete = (id) => {
    deleteExpense(id);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    return formattedDate;
  };

  return (
    <div className={styles.ExpenseList}>
      <h2 className={styles.heading}>Recent Transactions</h2>
      <div className={styles.expenseDiv}>
        {expensesRev.length > 0 ? (
          <div>
            <table className={styles.expenseTable}>
              <tbody>
                {currentExpenses.map((expense) => (
                  <tr key={expense.id} className={styles.expenseTable_row}>
                    <td style={{ width: "10%" }}>
                      {expense.category === "Food" && (
                        <PiPizza className={styles.catIcon} />
                      )}
                      {expense.category === "Travel" && (
                        <BsSuitcase2 className={styles.catIcon} />
                      )}
                      {expense.category === "Entertainment" && (
                        <LuGift className={styles.catIcon} />
                      )}
                    </td>
                    <td style={{ width: "70%" }}>
                      <span>
                        {expense.title}
                        <br />
                        <span style={{ color: "#9d9d9d" }}>
                          {formatDate(expense.date)}
                        </span>
                      </span>
                    </td>
                    <td style={{ width: "10%" }}>
                      <span style={{ color: "#f4bb4a", fontWeight: "bold" }}>
                        ₹{expense.amount}
                      </span>
                    </td>
                    <td style={{ width: "5%" }}>
                      <CiCircleRemove
                        className={styles.removeIcon}
                        onClick={() => handleDelete(expense.id)}
                      />
                    </td>
                    <td style={{ width: "5%" }}>
                      <MdOutlineModeEdit
                        className={styles.editIcon}
                        onClick={() => openForm(expense)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.pagination}>
              <button
                className={styles.navBtn}
                disabled={currentPage === 1}
                onClick={handlePrev}
              >
                <FaArrowLeftLong />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={
                    currentPage === index + 1
                      ? styles.activePage
                      : styles.pageBtn
                  }
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={styles.navBtn}
                disabled={currentPage === totalPages}
                onClick={handleNext}
              >
                <FaArrowRightLong />
              </button>
            </div>
          </div>
        ) : (
          <h5 style={{ color: "#555" }}>No Transactions Found</h5>
        )}
      </div>

      {formOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 style={{ margin: "8px 0px" }}>Edit Expenses</h2>
            <form onSubmit={handleForm}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "100%",
                  margin: "15px 0",
                }}
              >
                <input
                  type="text"
                  id="title"
                  onInput={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className={styles.input}
                  value={title}
                />
                <input
                  type="text"
                  id="amount"
                  onInput={(e) => setAmount(e.target.value)}
                  placeholder="Price"
                  className={styles.input}
                  value={amount}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "100%",
                  margin: "15px 0",
                }}
              >
                <select
                  id="category"
                  onInput={(e) => setCategory(e.target.value)}
                  className={styles.input}
                  value={category}
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
                <input
                  type="date"
                  id="date"
                  onInput={(e) => setDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className={styles.input}
                  value={date}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "100%",
                  margin: "15px 0",
                }}
              >
                <button
                  type="submit"
                  className={styles.addBtn}
                  style={{ width: "49%" }}
                >
                  Update Expense
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => closeForm()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
