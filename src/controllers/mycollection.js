const express = require("express");
const { User, Literature, Mycollection } = require("../../models");

exports.addToMyCollections = async (req, res) => {
  try {
    const { id } = req.params;

    const checkLiteratureInCollection = await Mycollection.findOne({
      where: {
        literatureId: id,
        userId: req.user.id,
      },
    });

    if (checkLiteratureInCollection) {
      return res.status(400).send({
        error: {
          message: "Literature with this id has been already exist",
        },
      });
    }

    const addToMyCollection = await Mycollection.create({
      userId: req.user.id,
      literatureId: id,
    });

    res.send({
      message: "Literature added to My Library",
      data: {
        literature: addToMyCollection,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server error",
      },
    });
  }
};

exports.getMyCollections = async (req, res) => {
  try {
    const collections = await User.findOne({
      include: {
        model: Literature,
        as: "literatures",
        attributes: {
          exclude: ["createdAt", "updatedAt", "UserId", "file"],
        },
        include: {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "email",
              "password",
              "gender",
              "phone",
              "address",
              "role",
              "avatar",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      },
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: [
          "email",
          "password",
          "gender",
          "phone",
          "address",
          "role",
          "avatar",
          "createdAt",
          "updatedAt",
        ],
      },
    });

    res.send({
      message: "Data successfully loaded",
      data: {
        mycollections: collections,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server error",
      },
    });
  }
};

exports.deleteItemCollection = async (req, res) => {
  const { userId, literatureId } = req.params;
  try {
    await Mycollection.destroy({
      where: {
        userId: userId,
        literatureId: literatureId,
      },
    });

    res.send({
      message: "Item has been deleted",
      id: literatureId,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Server error",
    });
  }
};
