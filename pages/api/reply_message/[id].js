import prisma from "../../../lib/prisma";
import Cors from "cors";

import initMiddleware from "../../../lib/init_middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["POST", "OPTIONS"],
  })
);

async function handler(req, res) {
  await cors(req, res);

  try {
    const { senderId, recieverId, text } = req.body;
    const { id } = req.query;
    if (req.method !== "POST") {
      res
        .status(400)
        .json({ status: false, message: `This not a ${req.method} request` });
    } else {
      await prisma.Chat.create({
        data: {
          senderId,
          recieverId,
          text,
          messageId: id,
        },
      });

      res.json({ status: true, message: "message sent" });
    }
  } catch (error) {
    console.log(error);
  }
}
export default handler;
