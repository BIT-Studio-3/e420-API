import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createContract = async (req, res) => {
  try {
    


    // Return success or error message
    return res.status(201).json({
      msg: "Contract successfully created",
      data: contract,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createContract };
