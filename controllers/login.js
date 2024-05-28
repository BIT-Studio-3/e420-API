import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    return res.status(200).json({
      msg: `${user.username} has successfully logged in`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export default { login };
