const incomeRoute = require("express").Router();
const {
  getIncomes,
  deleteIncome,
  addIncome,
} = require("../controller/incomeController");

incomeRoute.get("/get/:id", getIncomes);

incomeRoute.post("/add", addIncome);

incomeRoute.get("/delete/:id", deleteIncome);

module.exports = incomeRoute;
