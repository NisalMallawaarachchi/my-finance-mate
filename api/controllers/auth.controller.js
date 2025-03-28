import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

// Constants for configuration
const PASSWORD_SALT_ROUNDS = 12;
const TOKEN_EXPIRATION = "1h";
const COOKIE_MAX_AGE = 60 * 60 * 1000; // 1 hour in milliseconds

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
};

// Helper function to set auth cookie
const setAuthCookie = (res, token) => {
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
  });
};

// Helper function to validate email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Validate input fields
    if (!username || !email || !password) {
      return next(errorHandler("All fields are required", 400));
    }

    if (!validateEmail(email)) {
      return next(errorHandler("Invalid email format", 400));
    }

    if (password.length < 6) {
      return next(errorHandler("Password must be at least 6 characters", 400));
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler("Email already in use", 409)); // 409 Conflict
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token for immediate login after signup
    const token = generateToken(newUser._id);
    setAuthCookie(res, token);

    const { password: _, ...userWithoutPassword } = newUser._doc;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return next(errorHandler("Email and password are required", 400));
    }

    if (!validateEmail(email)) {
      return next(errorHandler("Invalid email format", 400));
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler("Invalid credentials", 401));
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler("Invalid credentials", 401));
    }

    // Generate token and respond
    const token = generateToken(user._id);
    setAuthCookie(res, token);

    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { name, email, photo } = req.body;

  try {
    if (!name || !email) {
      return next(
        errorHandler(
          "Name and email are required for Google authentication",
          400
        )
      );
    }

    let user = await User.findOne({ email });

    if (user) {
      // Existing user - generate token
      const token = generateToken(user._id);
      setAuthCookie(res, token);

      const { password: _, ...userWithoutPassword } = user._doc;

      return res.status(200).json({
        success: true,
        message: "Google login successful",
        user: userWithoutPassword,
        token,
      });
    }

    // New user - create account
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(
      generatedPassword,
      PASSWORD_SALT_ROUNDS
    );

    user = new User({
      username:
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email,
      password: hashedPassword,
      avatar: photo,
      isGoogleAccount: true,
    });

    await user.save();

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    const { password: _, ...userWithoutPassword } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Google account created and logged in",
        user: userWithoutPassword,
        token,
      });
  } catch (error) {
    next(error);
  }
};
