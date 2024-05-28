import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSystems = async (req, res) => {
  try {

  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
export { getSystems };
