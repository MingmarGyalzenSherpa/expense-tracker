import React, { useEffect, useState } from "react";
import IncomeForm from "../components/IncomeForm";
import List from "../components/List";
export default function Incomes() {
  const [incomes, setIncomes] = useState([]);
  const updateList = (item) => {
    setIncomes([item, ...incomes]);
  };

  const deleteFromList = (list) => {
    setIncomes(list);
  };
  const fetchIncomes = async () => {
    const id = JSON.parse(window.localStorage.getItem("auth")).user.id;
    const response = await fetch(`http://localhost:8000/incomes/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setIncomes(data);
  };

  useEffect(() => {
    fetchIncomes();
    console.log("incomes incoeme " + incomes);
  }, []);
  return (
    <div className="main ">
      <div className="row">
        <div className="col-12 col-lg-4 col-md-12">
          <IncomeForm onUpdate={(item) => updateList(item)} />
        </div>
        <div className="col-12 col-lg-8 col-md-12 mt-5">
          <List
            title={"incomes"}
            className=""
            onDelete={(list) => deleteFromList(list)}
            list={incomes}
          />
        </div>
      </div>
    </div>
  );
}
