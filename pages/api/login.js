import * as argon from "argon2";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const { password, student_email } = req.body;
  try {
    if (req.method !== "POST") {
      res
        .status(400)
        .json({ status: false, message: `This not a ${req.method} request` });
    } else {
      const user = await prisma.Users.findUnique({
        where: {
          student_email: student_email.toLowerCase(),
        },
      });
      const comparePassword = await argon.verify(user.password, password);

      if (!user) {
        res.status(404).json({
          status: false,
          message: `there's no user with such email address`,
        });
      } else if (comparePassword == false) {
        res.status(400).json({
          status: false,
          message: `incorrect user password`,
        });
      } else {
        res.status(200).json({ status: true, data: user });
      }
    }
  } catch (error) {
    res.status(400).json({ status: false, error: error });
  }
}
