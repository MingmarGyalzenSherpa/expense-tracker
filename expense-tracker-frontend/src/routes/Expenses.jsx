import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import List from "../components/List";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const updateList = (item) => {
    setExpenses([item, ...expenses]);
  };

  const deleteFromList = (list) => {
    setExpenses(list);
  };
  const fetchExpenses = async () => {
    const id = JSON.parse(window.localStorage.getItem("auth")).user.id;
    const response = await fetch(`http://localhost:8000/expenses/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setExpenses(data);
  };
  useEffect(() => {
    fetchExpenses();
  }, []);
  return (
    <div className="main ">
      <div className="row">
        <div className="col-12 col-lg-4 col-md-12">
          <ExpenseForm onUpdate={(item) => updateList(item)} />
        </div>
        <div className="col-12 col-lg-8 col-md-12 mt-5">
          <List
            title={"expenses"}
            className=""
            onDelete={(list) => deleteFromList(list)}
            list={expenses}
          />
        </div>
      </div>
    </div>
  );
}
