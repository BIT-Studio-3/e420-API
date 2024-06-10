import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createContract = async (req, res) => {
  try {
    // Store given data
    const { userId, type, deadline, payment, cargo, contractId, destinationSymbol, deadlineToAccept } = req.body;

    // Create new contract with the given data
    const contract = await prisma.contract.create({
      data: {
        userId,
        type,
        terms: {
            create: [
                deadline,
                payment,
                cargo,
                contractId,
            ]
        },
        destinationSymbol,
        deadlineToAccept,
      },
    });

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

const getContracts = async (req, res) => {
    try {
        // get all the contracts associated with the user id
        const contracts = await prisma.contract.findMany({
            //query to get user specific contracts
            where: userId == Number(req.params.userId),
            terms: true,
        });

        // error handling for finding no contracts
        if (contracts.length === 0) {
            return res.status(404).json({ msg: "No contracts found"})
        }
        return res.status(200).json({ msg: "Successfully fetched all contracts", data: contracts });
    //handles any other errors
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        })
    }
};

export { createContract, getContracts };
