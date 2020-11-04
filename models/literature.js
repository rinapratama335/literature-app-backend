"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Literature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Literature.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });

      Literature.belongsToMany(models.User, {
        as: "users",
        through: {
          model: "mycollections",
          as: "collection",
        },
      });
    }
  }
  Literature.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      publication: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      ISBN: DataTypes.BIGINT,
      cover: DataTypes.STRING,
      file: DataTypes.STRING,
      status: DataTypes.ENUM("approved", "waiting", "canceled"),
    },
    {
      sequelize,
      modelName: "Literature",
    }
  );
  return Literature;
};
