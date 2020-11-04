const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyParser());
app.use(cors());

//untuk melihat cover
app.use("/cover", express.static("uploads/images/cover"));

//untuk melihat avatar
app.use("/avatar", express.static("uploads/images/avatar"));

//untuk melihat file
app.use("/file", express.static("uploads/files/"));

const router = require("./src/routes/router");
app.use("/api/v1/", router);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server berjalan di port ${port}`));
