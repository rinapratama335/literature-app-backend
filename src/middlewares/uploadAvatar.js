// Import multer package
const multer = require("multer");

// Destination di pakai untuk menginformasikan multer dimana file harus disimpan
// Filename di pakai untuk memanipulasi nama file yang di upload agar tidak bentrok karna ada nama yang sama
exports.upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "./uploads/images/avatar");
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}_${file.originalname.split(" ").join("_")}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (
      !file.originalname.match(/\.(png)$/) &&
      !file.originalname.match(/\.(PNG)$/)
    ) {
      return callback(null, false);
    }
    callback(null, true);
  },
});
