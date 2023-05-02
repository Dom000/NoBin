import initMiddleware from "../../../lib/init_middleware";
import prisma from "../../../lib/prisma";
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
      const mysentmessages = await prisma.Message.findMany({
        where: {
          senderId: id,
        },
        include: {
          chats: true,
          User: true,
        },
      });
      const myrecievedmessages = await prisma.Message.findMany({
        where: {
          recieverId: id,
        },
        include: {
          chats: true,
          User: true,
        },
      });
      res.json({
        status: true,
        data: [...mysentmessages, ...myrecievedmessages],
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export default handler;
