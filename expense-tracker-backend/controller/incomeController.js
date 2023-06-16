const { Income } = require("../models");

async function getIncomes(req, res) {
  try {
    const id = parseInt(req.params.id);
    const income = await Income.findAll({
      where: {
        user_id: id,
      },
    });
    console.log(income);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteIncome(req, res) {
  try {
    const id = parseInt(req.params.id);
    console.log(id);
    const income = await Income.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Successfully deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function addIncome(req, res) {
  try {
    console.log(req.body);
    const {
      title,
      note,
      date: income_date,
      amount,
      userID: user_id,
      category,
    } = req.body;
    const income = await Income.create({
      title,
      note,
      income_date,
      amount: parseInt(amount),
      user_id,
      category,
    });

    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { getIncomes, deleteIncome, addIncome };
