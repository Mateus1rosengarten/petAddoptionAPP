const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, uuidv4() + "-" + Date.now() + file.originalname);
//   },
// });
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter : (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error('File type is not supported!'),false);
      return;
    }
    cb(null,true);
  },



});

// const upload = multer({ storage, fileFilter });

// module.exports = upload;
