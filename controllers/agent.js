import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    // Store given data
    const {
      password,
      username,
    } = req.body;

    // Create new user with the given data
    user = await prisma.user.create({
      data: {
        password,
        username,
      },
    });

    // Return success or error message
    return res.status(201).json({
      msg: "User successfully registered",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { register };