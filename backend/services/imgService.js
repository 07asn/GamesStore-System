const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (req) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded.");
    }

    const fileBuffer = req.file.buffer;
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(fileBuffer);
    });
  } catch (error) {
    console.error("Upload Image error:", error);
    throw new Error("Server error while uploading image.");
  }
};
