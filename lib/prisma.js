import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
async () =>
  await prisma
    .$connect()
    .then(() => {
      console.log("Database Connected==========🔗🔗🔗🔗🔗🔗🔗🔗=======>");
    })
    .catch((error) => {
      console.log(error.message);
    });
export default prisma;
