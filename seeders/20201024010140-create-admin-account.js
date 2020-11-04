"use strict";

const bcrypt = require("bcrypt");
require("dotenv").config();

const hash = bcrypt.hashSync(process.env.PASSWORD, 10);
const hashBudy = bcrypt.hashSync(process.env.PASSWORDBUDI, 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "irwantoadmin@yahoo.com",
          password: hash,
          fullName: "Irwanto",
          gender: "male",
          phone: 6287838543675,
          address: "Jln. Marvel Universe, RT.21 RW.69",
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "budiraharja@yahoo.com",
          password: hashBudy,
          fullName: "Budi R",
          gender: "male",
          phone: 6287838545675,
          address: "Sleman, DIY",
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
