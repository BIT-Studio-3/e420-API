const getAgent = async (req, res) => {
    try {
      const agents = await prisma.user.findMany({});
  
      if (agents.length === 0) {
        return res.status(404).json({ msg: "No agents found" });
      }
  
      return res.status(200).json({ msg: "Successfully fetched all agents", data: agents });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };