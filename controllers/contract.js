import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createContract = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        msg: "Invalid Content-Type. Expected application/json",
      });
    }

    // Store given data
    const {
      userId,
      type,
      deadline,
      payment,
      cargo,
      contractId,
      destinationSymbol,
      deadlineToAccept,
    } = req.body;

    const { id } = req.user;

    // Create new contract with the given data
    const contract = await prisma.contract.create({
      data: {
        userId: Number(id),
        type,
        terms: {
          create: [deadline, payment, cargo, contractId],
        },
        destinationSymbol,
        deadlineToAccept,
      },
    });

    const newContracts = await prisma.contract.findMany({
      include: {
        terms: true,
      },
    });

    // Return success or error message
    return res.status(201).json({
      msg: "Contract successfully created",
      data: newContracts,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getContracts = async (req, res) => {
  try {
    // get all the contracts associated with the user id
    const contracts = await prisma.contract.findMany({
      //query to get user specific contracts
      where: { userId: Number(req.params.userId) },
      include: { terms: true },
    });

    // error handling for finding no contracts
    if (contracts.length === 0) {
      return res.status(404).json({ msg: "No contracts found" });
    }
    return res
      .status(200)
      .json({ msg: "Successfully fetched all contracts", data: contracts });
    //handles any other errors
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createContract, getContracts };
