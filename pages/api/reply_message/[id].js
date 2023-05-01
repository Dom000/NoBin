import prisma from "../../../lib/prisma";

async function handler(req, res) {
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
