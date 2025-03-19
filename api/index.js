import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import connectDB from "./db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config(); // Load environment variables early
connectDB();

// Creates the express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message:
        "Too many login attempts. Please wait a minute before trying again.",
    });
  },
});

// Routes (handles client requests and sends responses)
app.use("/api/auth", loginLimiter, authRouter);
app.use("/api/user", userRouter);

// Handle unknown routes
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    error: message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
