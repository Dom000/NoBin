import * as argon from "argon2";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const { password, username, student_email } = req.body;
  const hashedPassword = await argon.hash(password);
  try {
    if (req.method !== "POST") {
      res
        .status(400)
        .json({ status: false, message: `This not a ${req.method} request` });
    } else {
      const checkusername = await prisma.Users.findUnique({
        where: {
          username: username.toLowerCase(),
        },
      });

      if (checkusername) {
        res.status(400).json({
          status: false,
          message: `username has already been taken`,
        });
      }

      const checkstudent_email = await prisma.Users.findUnique({
        where: {
          student_email: student_email.toLowerCase(),
        },
      });

      if (checkstudent_email) {
        res.status(400).json({
          status: false,
          message: `student email is already in use kindly login`,
        });
      } else
        await prisma.Users.create({
          data: {
            username: username.toLowerCase(),
            password: hashedPassword,
            student_email: student_email.toLowerCase(),
          },
        });

      res
        .status(200)
        .json({ status: true, message: "account creation success" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error });
  }
}
