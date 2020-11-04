"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Literature", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      publication: {
        type: Sequelize.STRING,
      },
      pages: {
        type: Sequelize.INTEGER,
      },
      ISBN: {
        type: Sequelize.BIGINT,
      },
      cover: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["approved", "waiting", "canceled"],
        defaultValue: "waiting",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Literature");
  },
};
