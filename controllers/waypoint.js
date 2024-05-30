import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getWaypoints = async (req, res) => {
  try {
    const waypoints = await prisma.waypoint.findMany({});

  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
export { getWaypoints };