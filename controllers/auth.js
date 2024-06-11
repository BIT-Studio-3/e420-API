import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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
    const { username, password, confirm_password } = req.body;

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

const login = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        msg: "Invalid Content-Type. Expected application/json",
      });
    }

    const { username, password } = req.body;

    // Check if given data is used already by another user
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ msg: "Invalid username" });

    // Compare given string with the returned hash
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(401).json({ msg: "Invalid password" });

    const { JWT_SECRET, JWT_LIFETIME } = process.env;

    /**
     * Return a JWT. The first argument is the payload, i.e., an object containing
     * the authenticated user's id and name, the second argument is the secret
     * or public/private key, and the third argument is the lifetime of the JWT
     */
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME }
    );

    return res.status(200).json({
      msg: `${user.username} has successfully logged in`,
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { register, login };
