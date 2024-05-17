import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createContract = async (req, res) => {
  try {
    // Store given data
    const { type, deadline, payment, cargo, contractId, destinationSymbol, deadlineToAccept } = req.body;

    // Create new contract with the given data
    const contract = await prisma.contract.create({
      data: {
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

export { createContract };
