import prisma from "../../lib/prisma";

async function handler(req, res) {
  try {
    const { id, status } = req.body;
    if (req.method !== "PATCH") {
      res
        .status(400)
        .json({ status: false, message: `This not a ${req.method} request` });
    } else {
      const items = await prisma.Post.update({
        where: {
          id,
        },
        data: {
          status: status,
        },
      });

      res.json({ status: true, message: "post updated successfully" });
    }
  } catch (error) {
    console.log(error);
  }
}
export default handler;
