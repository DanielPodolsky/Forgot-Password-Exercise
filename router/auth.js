import { Router } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/user.js";
import sendEmail from "../utils/sendEmail.js";

const router = Router();

// Routes
router.post("/register", async (req, res) => {
  // No sanitizing because we are only learning about emailing
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    // If email was not found
    if (!user) {
      return res.status(200).json({ message: "Check your mail" });
    }
    // Attach a random token to the user who is requesting to change his password
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Prepare information for the email
    const link = `http://localhost:3000/api/auth/forgot-password/${token}`;
    const message = `You are receiving this email because you (or someone else) has requested a password reset. \n\nPlease click on the following link to reset your password: \n\n${link}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;
    const isEmailSent = await sendEmail(
      email,
      "Password Reset Request",
      message
    );
    if (isEmailSent) {
      console.log(email);
      res
        .status(200)
        .json({ message: "Email sent with password reset instructions" });
    } else {
      res.status(500).json({ message: "Failed to send email" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/forgot-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Token expired or user not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Reset those because we don't need them anymore
    user.resetPasswordToken = undefined; // Or an empty string
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid token" });
  }
});

export default router;
