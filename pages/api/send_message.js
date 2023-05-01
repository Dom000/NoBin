import prisma from "../../lib/prisma";

async function handler(req, res) {
  try {
    const { senderId, recieverId, text, image } = req.body;
    if (req.method !== "POST") {
      res
        .status(400)
        .json({ status: false, message: `This not a ${req.method} request` });
    } else {
      const items = await prisma.Message.create({
        data: {
          senderId,
          recieverId,
        },
      });

      await prisma.Chat.create({
        data: {
          messageId: items.id,
          recieverId,
          senderId,
          text,
          image,
        },
      });
      res.json({ status: true, message: "message sent" });
    }
  } catch (error) {
    console.log(error);
  }
}
export default handler;
