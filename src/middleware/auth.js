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

    req.user = decoded; // Attach user data to request object
    next(); // Move to the next middleware
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
