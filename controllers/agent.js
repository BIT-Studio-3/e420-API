import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAgents = async (req, res) => {
  // try {
  //   const query = {
  //     include: {
  //       departments: true,
  //     },
  //   };

  //   if (req.query.username || req.query.credits || req.query.ships || req.query.contracts || req.query.shipCount) {
  //     query.where = {
  //       username: {
  //         equals: req.query.username || undefined,
  //       },
  //       credits: {
  //         equals: req.query.region || undefined,
  //       },
  //       country: {
  //         equals: req.query.country || undefined,
  //       },
  //     };
  //   }  
  
  try {
      //extracting query parameters, can be more than one but in this case its just {name}
      const { name }= req.query;
      const filterOptions = {
        where: {},
      };
      //filtering condition, based on query parameters
      if (name) {
        filterOptions.where.name = {
          contains: name.toString(),
        };
      }
        //fetch all agents from the database
      const agents = await prisma.user.findMany(filterOptions);

        //if no agents are found return a 404 error
      if (agents.length === 0) {
        return res.status(404).json({ msg: "No agents found" });
      }
      //If agents are found, return a 200 success response with the agents data
      return res.status(200).json({ msg: "Successfully fetched all agents", data: agents });

      // Handle errors by returning a 500 error with the error message
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };
export { getAgents };
