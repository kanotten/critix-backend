import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden. Admin access required." });
    }

    req.user = decoded;
    next(); // Continue to next middleware or controller
  } catch (error) {
    console.error("JWT Verification Error:", error); // Log error for debugging

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session Expired: Please log in again." });
    }

    return res.status(403).json({ message: "Invalid or malformed token." });
  }
};
