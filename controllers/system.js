import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSystems = async (req, res) => {
  try {
    const systems = await prisma.system.findMany({});

    return res
      .status(200)
      .json({ msg: "Successfully fetched all systems", data: systems });

  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
export { getSystems };
