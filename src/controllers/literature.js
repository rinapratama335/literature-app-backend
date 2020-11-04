const { User, Literature } = require("../../models");
const { Op } = require("sequelize");
const path = require("path");

exports.getApprovedLiteratures = async (req, res) => {
  try {
    const data = await Literature.findAll({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "password",
            "gender",
            "role",
            "avatar",
          ],
        },
      },
      where: {
        status: "approved",
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "userId"],
      },
    });

    res.send({
      message: "All Literature success loaded",
      data: {
        literature: data,
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

exports.getDetailLiterature = async (req, res) => {
  const { id } = req.params;

  try {
    const detail = await Literature.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "gender",
              "role",
              "avatar",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "userId"],
      },
    });

    res.send({
      message: "Data successfully loaded",
      data: detail,
    });
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
};

// exports.getLiteratureByKey = async (req, res) => {
//   try {
//     const { title } = req.query;
//     const returnData = await Literature.findAll({
//       where: [
//         {
//           title: {
//             [Op.like]: `%${title}%`,
//           },
//           status: "approved",
//         },
//       ],
//       include: {
//         model: User,
//         as: "user",
//         attributes: {
//           exclude: [
//             "createdAt",
//             "updatedAt",
//             "password",
//             "gender",
//             "role",
//             "avatar",
//           ],
//         },
//       },
//       attributes: {
//         exclude: ["createdAt", "updatedAt", "UserId", "userId"],
//       },
//       //   where: {
//       //     [Op.and]: [
//       //       { title: { [Op.like]: `%${title}%` } },
//       //       { publication_date: { [Op.like]: `%${publication_date}%` } },
//       //     ],
//       //   },
//     });

//     res.send({
//       message: `Get all data with title lik ${title}`,
//       data: {
//         literatures: returnData,
//       },
//     });

//     console.log("Key : ", req.query);
//     console.log("Isi Data : ", returnData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({
//       error: {
//         message: "Server error",
//       },
//     });
//   }
// };

exports.getLiteraturesBySearch = async (req, res) => {
  const { title, year } = req.query;
  try {
    if (year) {
      const returnData = await Literature.findAll({
        where: {
          [Op.and]: [
            { title: { [Op.like]: `%${title}%` } },
            { publication: { [Op.like]: `%${year}%` } },
          ],
          status: "approved",
        },
        order: [["id", "DESC"]],
        include: {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "gender",
              "role",
              "avatar",
            ],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "UserId", "userId"],
        },
      });

      res.send({
        message: `Get all data with title like ${title} and year ${year}`,
        data: {
          literatures: returnData,
        },
      });
    } else {
      const returnData = await Literature.findAll({
        where: [
          {
            title: {
              [Op.like]: `%${title}%`,
            },
            status: "approved",
          },
        ],
        include: {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "gender",
              "role",
              "avatar",
            ],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "UserId", "userId"],
        },
      });

      res.send({
        message: `Get all data with title lik ${title}`,
        data: {
          literatures: returnData,
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Server error",
    });
  }
};

// exports.getLiteratureByKeyAndPublication = async (req, res) => {
//   try {
//     const { title, year } = req.query;
//     const returnData = await Literature.findAll({
//       where: {
//         [Op.and]: [
//           { title: { [Op.like]: `%${title}%` } },
//           { publication: { [Op.like]: `%${year}%` } },
//         ],
//         status: "approved",
//       },
//       include: {
//         model: User,
//         as: "user",
//         attributes: {
//           exclude: [
//             "createdAt",
//             "updatedAt",
//             "password",
//             "gender",
//             "role",
//             "avatar",
//           ],
//         },
//       },
//       attributes: {
//         exclude: ["createdAt", "updatedAt", "UserId", "userId"],
//       },
//     });

//     res.send({
//       message: `Get all data with title like ${title} and year ${year}`,
//       data: {
//         literature: returnData,
//       },
//     });

//     console.log("Key : ", req.query);
//     console.log("Isi Data : ", returnData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({
//       error: {
//         message: "Server error",
//       },
//     });
//   }
// };

exports.getLiteraturesByUser = async (req, res) => {
  try {
    const dataLiteratures = await Literature.findAll({
      include: {
        model: User,
        as: "user",
      },
      where: {
        userId: req.user.id,
      },
    });

    res.send({
      message: "Data successfully loaded",
      data: {
        myliteratures: dataLiteratures,
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

exports.addLiterature = async (req, res) => {
  try {
    const { title, publication, pages, ISBN } = req.body;

    const checkISBN = await Literature.findOne({
      where: {
        ISBN: req.body.ISBN,
      },
    });

    if (checkISBN) {
      return res.status(400).send({
        error: "Book with this ISBN has been already exist",
      });
    }

    if (req.body.ISBN.length != 13) {
      return res.status(400).send({
        error: "ISBN must 13 digits",
      });
    }

    const saveData = await Literature.create({
      title,
      userId: req.user.id,
      publication,
      pages,
      ISBN,
      cover: req.files.cover[0].filename,
      file: req.files.file[0].filename,
      status: req.user.id == 1 ? "approved" : "waiting",
    });

    res.send({
      message: "Data has been success saved into database",
      data: {
        literature: saveData,
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

exports.detailLiterature = async (req, res) => {
  const { id } = req.params;

  try {
    const detail = await Literature.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "role"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
    });

    res.send({
      message: "Data successfully loaded",
      data: detail,
    });
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
};

exports.listsLiteratures = async (req, res) => {
  try {
    const data = await Literature.findAll({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "password",
            "gender",
            "role",
            "avatar",
          ],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "userId"],
      },
    });

    res.send({
      message: "All Literature success loaded",
      data: {
        literatures: data,
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

exports.editLiterature = async (req, res) => {
  const { title, publication, pages, ISBN, status } = req.body;
  const { id } = req.params;

  try {
    const findLiterature = await Literature.findOne({
      where: {
        id,
      },
    });

    if (findLiterature) {
      const updatedLiterature = await Literature.update(
        {
          title: title,
          publication: publication,
          pages: pages,
          ISBN: ISBN,
          status: status,
        },
        {
          where: {
            id,
          },
        }
      );

      if (updatedLiterature) {
        const returnUpdatedLiterature = await Literature.findOne({
          where: {
            id: findLiterature.id,
          },
          include: {
            model: User,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "role"],
            },
          },
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "categoryId",
              "userId",
              "UserId",
            ],
          },
        });

        res.send({
          message: "Literature has been updated",
          data: {
            literature: await returnUpdatedLiterature,
          },
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: "Ada masalah server",
    });
  }
};
