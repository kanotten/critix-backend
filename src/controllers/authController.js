import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// 🛑 Temporary storage  
const users = []; // Stores user data in memory

// 🔹 Admin Credentials (Replace with DB later)
const adminUser = {
  email: "admin@example.com",
  password: bcrypt.hashSync("admin123", 10), // Hashed password
  role: "admin",
};

// ➤ 🛡️ Admin Login
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

  res.json({ message: "Admin logged in", token });
};

// ➤ 👤 User Registration
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user with role "user"
  const newUser = { email, password: hashedPassword, role: "user" };
  users.push(newUser);

  res.json({ message: "User registered successfully" });
};

// ➤ 🔑 User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user in database (or in-memory)
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate JWT Token
  const token = jwt.sign({ role: user.role, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "User logged in", token });
};
