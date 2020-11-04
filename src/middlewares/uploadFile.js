const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "cover") {
      cb(null, "./uploads/images/cover/");
    } else if (file.fieldname === "file") {
      cb(null, "./uploads/files/");
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "cover") {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else if (file.fieldname === "file") {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
  },
});

exports.uploadFile = multer({
  storage: storage,
  //   limits: {
  //     fileSize: 1024 * 1024 * 10,
  //   },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).fields([
  {
    name: "cover",
    maxCount: 1,
  },
  {
    name: "file",
    maxCount: 1,
  },
]);

function checkFileType(file, cb) {
  if (file.fieldname === "cover") {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/PNG" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/JPG"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else if (file.fieldname === "file") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
}
