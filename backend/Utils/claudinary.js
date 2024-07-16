const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dqnqpcfxc",
  api_key: "844319724424211",
  api_secret: "gUEbfSN0NlyU98bjhf0skIHagYw",
});

module.exports = cloudinary;
