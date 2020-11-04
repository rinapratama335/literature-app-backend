const { User } = require("../../models");

//Encrypt by bcrypt
const bcrypt = require("bcrypt");

//Make token for auth
const jwt = require("jsonwebtoken");

//Key for decrypt jwt token
const jwtKey = process.env.JWT_KEY;

//Import joy for validation
const joi = require("joi");

exports.checkAuth = async (req, res) => {
  console.log("ID user :", req.user.id);

  try {
    const user = await User.findOne({
      where: {
        id: req.user.id, //req user didapat dari middleware authentication saat user berhasil login, token adalah id dari user yang login tersebut
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      message: "User valid",
      data: {
        user,
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

// Register method
exports.register = async (req, res) => {
  try {
    // const {
    //   email,
    //   password,
    //   fullName,
    //   phone,
    //   gender,
    //   address,
    //   role,
    // } = req.body;

    console.log("Data user: ", req.body);

    const schema = joi.object({
      email: joi.string().email().min(13).required(),
      password: joi.string().min(8).required(),
      fullName: joi.string().min(3).required(),
      gender: joi.required(),
      phone: joi.number().required(),
      address: joi.required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //Check if email already exist
    const checkEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //If email already exist
    if (checkEmail) {
      return res.status(400).send({
        error: "Email already exist",
      });
    }

    //Create salt strength
    const saltStrength = 10;

    //Encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, saltStrength);

    // Create user
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address,
      role: "user",
      avatar: req.file.filename,
    });

    //Create JWT token after register success
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    //Send data with JWT token
    res.send({
      message: "Success register",
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          token: token,
        },
      },
    });
  } catch (err) {
    res.status(500).send({
      error: {
        message: "Server error",
      },
    });

    console.log(err);
  }
};

// Login method
exports.login = async (req, res) => {
  try {
    //Get email and password from body
    const { email, password } = req.body;

    // Validation
    const schema = joi.object({
      email: joi.string().email().min(13).required(),
      password: joi.string().min(8).required(),
    });

    // List error / errors from the form into the error variabel
    const { error } = schema.validate(req.body);

    // Show error
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    // Looking for the email entered by the user is in the database or not
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    // If email doesn't exist, issue an error
    if (!user) {
      return res.status(400).send({
        error: "Email or password is Invalid",
      });
    }

    // Compare password from user input with password in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({
        error: "Email or password is Invalid",
      });
    }

    // When logged in successfully, create a new token
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    // Send response success logged in
    res.send({
      message: "Loggin successfully",
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          token: token,
        },
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Sever error",
      },
    });
  }
};
