const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      required: true,
    },
    cloudID : {
      type: String,
    }
  },

);

const ModelImg = mongoose.model("Picture", imageSchema);

module.exports = ModelImg;
