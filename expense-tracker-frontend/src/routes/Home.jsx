import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export default function Home() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState();
  const [totalIncome, setTotalIncome] = useState();
  useEffect(() => {
    (async () => {
      const id = JSON.parse(window.localStorage.getItem("auth")).user.id;
      console.log(id);
      const incomeResponse = await fetch(
        `http://localhost:8000/incomes/get/${id}`
      );
      const expenseResponse = await fetch(
        `http://localhost:8000/expenses/get/${id}`
      );

      const incomeData = await incomeResponse.json();
      setIncomes(incomeData);
      const expenseData = await expenseResponse.json();
      console.log(incomeData);
      setExpenses(expenseData);
      const incomeAmt = incomeData.reduce((acc, item) => {
        return acc + parseInt(item.amount);
      }, 0);
      const expenseAmt = expenseData.reduce((acc, item) => {
        return acc + parseInt(item.amount);
      }, 0);
      setTotalExpense(expenseAmt);
      setTotalIncome(incomeAmt);
      console.log(expenseData);
    })();
  }, []);

  const labels = expenses.map((expense) =>
    new Date(expense.expenses_date).toLocaleDateString()
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomes.map((income) => income.amount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Expense",
        data: expenses.map((expense) => expense.amount),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className="main">
      <div className="col-12 col-md-12 row mt-3">
        <div className="card col-md-6">
          <span>TOTAL EXPENSE</span>
          <span>Rs.{totalExpense}</span>
        </div>
        <div className="card col-md-6">
          <span>TOTAL INCOME</span>
          <span className="">Rs.{totalIncome}</span>
        </div>
      </div>
      <div className="chart col-12 col-md-12 col-lg-12 mt-5">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
