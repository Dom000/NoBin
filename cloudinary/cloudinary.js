import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "nobin",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// configure multer
export const upload = multer({ storage: storage }).array("files", 3);

// handle the file upload request
// app.post("/upload", (req, res) => {
//   upload(req, res, function (err) {
//     if (err) {
//       return res.status(500).json({ message: err.message });
//     }
//     const urls = req.files.map((file) => file.path);
//     return res
//       .status(200)
//       .json({ message: "File uploaded successfully", data: urls });
//   });
// });
