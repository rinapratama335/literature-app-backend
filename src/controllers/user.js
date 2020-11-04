const { User } = require("../../models");
const fs = require("fs");

exports.editAvatar = async (req, res) => {
  try {
    const findUser = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (findUser) {
      const updateAvatar = await User.update(
        {
          avatar: req.file.filename,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      if (updateAvatar) {
        const returnUpdateAvatar = await User.findOne({
          where: {
            id: findUser.id,
          },
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "address",
              "phone",
              "gender",
            ],
          },
        });
        res.send({
          message: "Success update data",
          data: {
            user: returnUpdateAvatar,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Server error",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const usersData = await User.findAll({
      attributes: {
        exclude: ["role", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Users successfully loaded",
      data: {
        users: usersData,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Sever error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await User.destroy({
      where: {
        id,
      },
    });

    res.send({
      id: id,
    });
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
};
