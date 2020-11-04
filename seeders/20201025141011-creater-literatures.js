"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "literature",
      [
        {
          title: "Begining React Native",
          userId: 2,
          publication: "2020",
          pages: 234,
          ISBN: 1296845231098,
          cover: "react-native.png",
          file: "beginning-react-native-with-hooks.pdf",
          status: "approved",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Express Tutorial",
          userId: 1,
          publication: "2020",
          pages: 196,
          ISBN: 1296845231098,
          cover: "expressjs.png",
          file: "expressjs_tutorial.pdf",
          status: "approved",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Learn Node JS",
          userId: 1,
          publication: "2020",
          pages: 320,
          ISBN: 1296845231098,
          cover: "nodejs.png",
          file: "Learn-nodejs-in-1-day.pdf",
          status: "canceled",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Learning React and Redux",
          userId: 2,
          publication: "2020",
          pages: 250,
          ISBN: 1296845231098,
          cover: "react-redux.png",
          file: "Learning-React_Redux.pdf",
          status: "waiting",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("literature", null, {});
  },
};
