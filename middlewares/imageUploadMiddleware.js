const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dupdaabbd",
  api_key: "792473875694238",
  api_secret: "hjhDOm7-np_91aqBW6NB2V_8y98",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "food ordering",
    format: async () => "png",
    public_id: (req, file) => file.filename,
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
