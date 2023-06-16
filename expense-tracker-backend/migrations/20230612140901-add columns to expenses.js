"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Expenses", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    });

    await queryInterface.addColumn("Expenses", "note", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("Expenses", "image", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("Expenses", "category_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
    });

    await queryInterface.addColumn("Expenses", "expenses_date", {
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn("Expenses", "soft_delete", {
      type: Sequelize.BOOLEAN,
    });

    await queryInterface.addColumn("Expenses", "archived", {
      type: Sequelize.BOOLEAN,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
