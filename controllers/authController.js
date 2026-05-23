import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, photoURL } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase and minimum 6 characters"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      photoURL
    });

    const token = generateToken(res, user);
res.status(201).json({
  success: true,
  message: "Registration successful",
  token,
  user
});
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// login
// login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(res, user); // ← store in variable
    res.json({
      success: true,
      message: "Login successful",
      token, // ← send it back!
      user
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// logout
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0)
  });

  res.json({
    message: "Logged out"
  });
};

