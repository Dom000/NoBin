import prisma from "../../../lib/prisma";
import initMiddleware from "../../../lib/init_middleware";
import Cors from "cors";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "OPTIONS"],
  })
);

async function handler(req, res) {
  await cors(req, res);

  try {
    const { id } = req.query;
    if (req.method !== "GET") {
      res
        .status(400)
        .json({ status: false, message: `This not a ${req.method} request` });
    } else {
      const items = await prisma.User.findUnique({
        where: {
          student_email: id,
        },
      });
      res.json({ status: true, data: items });
    }
  } catch (error) {
    console.log(error);
  }
}
export default handler;
