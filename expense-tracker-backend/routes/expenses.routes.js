const express = require("express");
const {
  getExpenses,
  addExpenses,
  deleteExpense,
} = require("../controller/expensesController");
const expenseRoute = express.Router();

expenseRoute.get("/get/:id", getExpenses);

expenseRoute.post("/add", addExpenses);

expenseRoute.get("/delete/:id", deleteExpense);

module.exports = expenseRoute;
