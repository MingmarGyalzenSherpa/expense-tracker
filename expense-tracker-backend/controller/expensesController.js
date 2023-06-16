const { Expense } = require("../models");

async function getExpenses(req, res) {
  try {
    const id = parseInt(req.params.id);
    const expenses = await Expense.findAll({
      where: {
        user_id: id,
      },
    });
    console.log(expenses);
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteExpense(req, res) {
  try {
    const id = parseInt(req.params.id);
    console.log(id);
    const expense = await Expense.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Successfully deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function addExpenses(req, res) {
  try {
    console.log(req.body);
    const {
      title,
      note,
      date: expenses_date,
      amount,
      userID: user_id,
      category: category_name,
    } = req.body;
    const expense = await Expense.create({
      title,
      note,
      expenses_date,
      amount: parseInt(amount),
      user_id,
      category_name,
    });

    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { getExpenses, addExpenses, deleteExpense };
