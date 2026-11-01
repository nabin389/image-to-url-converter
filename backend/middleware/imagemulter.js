const multer  = require('multer')
const { v4: uuidv4 } = require("uuid");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("inside multer storage middlware");

    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log("for updated product: ", file.originalname);

    const random = uuidv4();
    cb(null, random + "-ns-" + file.originalname);
    console.log(file.originalname);
    
    console.log("completing multer middleware");
  },
});


const upload = multer({
  storage: storage,
});

module.exports = upload;