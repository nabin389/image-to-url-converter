const cloudinary = require("../config/cloudinary");
const fs = require("fs");


const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image.",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

          // delete from our device
          fs.unlink(req.file.path, (err) => {
            if(err){
                console.log("Error occured: ", err);
            } else{
                console.log("deleted file: ", req.file.path);
            }
          })


    res.status(200).json({
      message: "Image uploaded successfully!",
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Image upload failed.",
    });
  }
};

module.exports = { uploadImage };

