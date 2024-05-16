import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    // Store given data
    const { password, username } = req.body;

    // Create new user with the given data
    user = await prisma.user.create({
      data: {
        password,
        username,
        confirm_password
      },
    });

    // Define an array of required fields
    const requiredFields = [
      "username",
      "password",
      "confirm_password",
    ];

    // Check if all required fields are provided
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Check if user with given details already exists
    let user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (user) return res.status(409).json({ msg: "User already exists" });

    

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
