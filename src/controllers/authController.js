import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Temporary Admin user (We can replace this with database or Firebase)
const adminUser = {
  email: "admin@example.com",
  password: bcrypt.hashSync("admin123", 10), // Hashed password
};

// 🔹 Admin Login Route
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (email !== adminUser.email) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = bcrypt.compareSync(password, adminUser.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate JWT Token
  const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};
