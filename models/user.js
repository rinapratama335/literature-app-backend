"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Literature);

      User.belongsToMany(models.Literature, {
        as: "literatures",
        through: {
          model: "mycollections",
          as: "collection",
        },
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female"),
      phone: DataTypes.BIGINT,
      address: DataTypes.TEXT,
      role: DataTypes.ENUM("admin", "user"),
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
