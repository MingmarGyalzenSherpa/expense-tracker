"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expense.init(
    {
      title: DataTypes.STRING,
      expenses_date: DataTypes.DATE,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      category_name: {
        type: DataTypes.STRING,
      },
      note: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Expense",
    }
  );
  return Expense;
};
