import * as argon from "argon2";
import prisma from "../../lib/prisma";
import Cors from "cors";

import initMiddleware from "../../lib/init_middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["POST", "OPTIONS"],
  })
);
export default async function handler(req, res) {
  await cors(req, res);

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
        include: {
          post: true,
        },
      });
      console.log(user);
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
        delete user.password;
        res.status(200).json({ status: true, data: user });
      }
    }
  } catch (error) {
    res.status(400).json({ status: false, error: error });
  }
}
