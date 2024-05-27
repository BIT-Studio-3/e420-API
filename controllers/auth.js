import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        msg: "Invalid Content-Type. Expected application/json",
      });
    }

    // Store given data
    const { username, password } = req.body;

    // Define an array of required fields
    const requiredFields = ["username", "password", "confirm_password"];

    // Check if all required fields are provided
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    if (confirm_password != password)
      return res.status(400).json({ msg: "Passwords do not match" });

    // Check if user with given details already exists
    let user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (user) return res.status(409).json({ msg: "User already exists" });

    // Generate random bits to add to password to make it unique
    const salt = await bcryptjs.genSalt();

    /**
     * Generate a hash for a given string + salt
     */

    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user with the given data
    user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    delete user.password;

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
