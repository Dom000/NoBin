import { upload } from "../../cloudinary/cloudinary";
import formidable from "formidable";
import prisma from "../../lib/prisma";
import initMiddleware from "../../lib/init_middleware";
import Cors from "cors";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["POST", "OPTIONS"],
  })
);
//  function to process image file
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
  await cors(req, res);

  try {
    if (req.method !== "POST") {
      res
        .status(400)
        .json({ status: false, message: `This not a ${req.method} request` });
    } else {
      readFile(req).then(async (e) => {
        const { title, description, location, status, postId } = e.fields;

        const post = await prisma.Post.create({
          data: {
            title,
            description,
            location,
            status,
            postId,
          },
        });
        const fileArr = e.files.file;

        // const arrFile = (e) => {
        //   if (typeof e == Array) {
        //   }
        // };
        fileArr.forEach((item) => {
          upload(item.filepath, {
            public_id: item.newFilename,
            folder: "nobin",
            resource_type: "auto",
            use_filename: true,
            unique_filename: false,
            width: "768",
            height: "450",
            crop: "limit",
            quality: 80,
          })
            .then(async (result) => {
              await prisma.Image.createMany({
                data: {
                  url: result.secure_url,
                  postId: post.id,
                },
              });
            })
            .catch((error) => {
              res.status(500).json({
                status: false,
                message: error,
              });
            });
        });
        res.status(200).json({
          success: true,
          message: "Item posted sucessfully",
        });
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default handler;
