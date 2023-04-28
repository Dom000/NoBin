import { upload } from "../../cloudinary/cloudinary";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req) => {
  const form = formidable({ multiples: true });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};
async function handler(req, res) {
  try {
    readFile(req).then((e) => {
      e.files.files.forEach((item) => {
        cloudinary.uploader
          .upload(item.filepath, {
            public_id: item.newFilename,
            folder: "nobin",
            resource_type: "auto",
            use_filename: true,
            unique_filename: false,
          })
          .then((result) => {
            res.status(200).json({
              success: true,
              message: "Images uploaded success",
              //   data: [].push(result),
            });
          })
          .catch((error) => {
            res.status(500).json({
              success: false,
              message: error,
            });
          });
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

export default handler;
