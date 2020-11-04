const jwt = require("jsonwebtoken");
const { User } = require("../../models");

//Key for decrypt
const jwtKey = process.env.JWT_KEY;

exports.auth = async (req, res, next) => {
  let header, token;

  //If header on token is empty
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return res.status(400).send({
      error: {
        message: "Access denied",
      },
    });
  }

  //Check there is a token (jika ada token)
  try {
    const verivied = jwt.verify(token, jwtKey);

    req.user = verivied;
    console.log("Data user: ", req.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: {
        message: "Invalid token",
      },
    });
  }
};

exports.authAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (user.dataValues.role !== "admin")
      return res
        .status(400)
        .send({ message: "Invalid operation, you are login as a User" });

    next();
  } catch (err) {
    console.log(err);

    res.status(400).send({
      message: "Invalid token",
    });
  }
};
