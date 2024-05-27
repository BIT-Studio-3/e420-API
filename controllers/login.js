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


  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export default { login };
