import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAgents = async (req, res) => {
  try {
    const query = {
      // username,
      // credits,
      // ships,
      // contracts,
      // shipCount,
      include: {
        ships: true,
        contracts: true,
      },
    };

    if (req.query.username || req.query.credits ||  req.query.shipCount) {
      query.where = {
        username: {
          equals: req.query.username || undefined,
        },
        credits: {
          equals: req.query.credits || undefined,
        },
        ships: {
          equals: req.query.ships || undefined,
        },
        contracts: {
          equals: req.query.contracts || undefined,
        },
        shipCount: {
          equals: req.query.shipCount || undefined,
        },
      };
    }
    const agents = await prisma.user.findMany(query);

    //if no agents are found return a 404 error
    if (agents.length === 0) {
      return res.status(404).json({ msg: "No agents found" });
    }

    if (agents.contracts === 0) {
      return res.status(404).json({ msg: "No contracts found" });
    }
    //If agents are found, return a 200 success response with the agents data
    return res
      .status(200)
      .json({ msg: "Successfully fetched all agents", data: agents });

    // Handle errors by returning a 500 error with the error message
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
export { getAgents };
