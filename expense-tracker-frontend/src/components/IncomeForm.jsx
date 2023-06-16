import React, { useEffect, useState } from "react";

export default function ({ onUpdate }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("1");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState(0);
  const [userID, setUserID] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/incomes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category,
        date,
        note,
        amount,
        userID,
      }),
    });
    const data = await response.json();
    console.log(data);
    onUpdate(data);
  };

  useEffect(() => {
    const id = JSON.parse(window.localStorage.getItem("auth")).user.id;
    setUserID(id);
  }, []);

  return (
    <div className="expense-form">
      <form onSubmit={(e) => handleSubmit(e)} method="POST">
        <legend className="text-center"> Add Income </legend>
        <input type="hidden" value={userID} />
        <div className="mb-3">
          <label htmlFor="title">Income Title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Category">Category:</label>
          <select
            name=""
            id=""
            className="form-select  w-100"
            onChange={(e) => setCategory(e.target.value)}
            defaultValue={"1"}
          >
            <option value={"1"}>Food</option>
            <option value={"2"}>Beer</option>
            <option value="3">Juice</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="title">Date</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title">Amount</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title">Income Note</label>
          <textarea
            className="form-control"
            rows="3"
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
