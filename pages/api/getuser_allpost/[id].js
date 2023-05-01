import prisma from "../../../lib/prisma";

async function handler(req, res) {
  try {
    const { id } = req.query;
    if (req.method !== "GET") {
      res
        .status(400)
        .json({ status: false, message: `This not a ${req.method} request` });
    } else {
      const items = await prisma.Post.findMany({
        where: {
          postId: id,
        },
        include: {
          images: true,
        },
      });
      res.json({ status: true, data: items });
    }
  } catch (error) {
    console.log(error);
  }
}
export default handler;
