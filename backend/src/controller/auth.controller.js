const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const RefreshToken = require("../models/refreshToken.model");

const JWT_ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES;
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES;

// Register user
exports.register = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({ id: user._id }, JWT_ACCESS_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES,
      });
      const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES,
      });

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      try {
        await RefreshToken.findOneAndUpdate(
          { userId: user._id },
          { token: refreshToken, expiresAt },
          { upsert: true, new: true }
        );
        console.log("Refresh token stored in DB");
      } catch (err) {
        console.error("Failed to store refresh token:", err);
      }

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });

      res
        .status(200)
        .json({ message: "Login successful", token: accessToken, user });
    } else {
      res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

// Refresh Token Controller
exports.refreshToken = async (req, res) => {
  const token = req.cookies.refresh_token;

  if (!token) {
    return res.status(403).json({ message: "Refresh token required" });
  }

  try {
    const tokenDoc = await RefreshToken.findOne({ token });
    if (!tokenDoc) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const accessToken = jwt.sign({ id: user._id }, JWT_ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    });
    res.json({ token: accessToken, user });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

// Logout Controller
exports.logout = async (req, res) => {
  const token = req.cookies.refresh_token;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    await RefreshToken.findOneAndDelete({ token });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Logout failed" });
  }
};
