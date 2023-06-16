"use strict";
const { Model, Sequelize, ENUM } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Category);
      User.hasMany(models.Tag);
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
      },
      status: {
        type: DataTypes.ENUM("pending", "verified", "blocked"),
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
