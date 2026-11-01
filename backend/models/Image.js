const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },

  publicId: {
    type: String,
    required: true,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },

  expiresAt: {
    type: Date,
    default: null,
  },
},{
    timestamps:true
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;