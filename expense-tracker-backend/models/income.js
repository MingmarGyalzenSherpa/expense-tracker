"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Income.init(
    {
      title: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      category: {
        type: DataTypes.STRING,
      },
      note: DataTypes.STRING,
      income_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Income",
    }
  );
  return Income;
};
