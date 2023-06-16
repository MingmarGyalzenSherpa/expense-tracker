import React from "react";
import { faCross } from "@fortawesome/free-solid-svg-icons";
export default function List({ list, onDelete, title }) {
  console.log("iinside List + " + list);
  const handleClick = async (id) => {
    const response = await fetch(
      `http://localhost:8000/${title}/delete/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      list = expenses.filter((item) => {
        return item.id !== id;
      });
      onDelete(list);
    }
    console.log(incomes[0].date);
  };
  return (
    <>
      <h2>{title.toUpperCase()}</h2>
      <div className="expense-list">
        {list?.map((element) => {
          return (
            <li key={element.id} className="list-item">
              <span className="title">{element.title}</span>
              <span className="date">
                {new Date(
                  title === "expenses"
                    ? element.expenses_date
                    : element.income_date
                ).toLocaleDateString()}
              </span>
              <span className="amount">Rs.{element.amount}</span>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(element.id);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </div>
    </>
  );
}
