const express = require("express");

const upload = require("../middleware/imagemulter");
const { uploadImage } = require("../controllers/imageController");

const router = express.Router();

// Upload image
// router.post("/upload", upload.single("image"), uploadImage);
router.route("/upload").post(upload.single("image"), uploadImage);

module.exports = router;