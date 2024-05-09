const getAgents = async (req, res) => {
    try {
        //fetch all agents from the database
      const agents = await prisma.user.findMany({});

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
