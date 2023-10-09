import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Create User Function

export const register = async (req, res) => {
  try {
    const { email, password, name, age, gender } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      age,
      gender,
    });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password not matched" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

//create user function
// export const createUser = async (req, res) => {
//   try {
//     const { name, username, email, password, profilePicture } = req.body;
//     if (!name || !username || !email || !password || !profilePicture) {
//       res.status(400).json({ message: "All Fields are mandatory" });
//     }

//     const newUser = new User({
//       name,
//       username,
//       email,
//       password,
//       profilePicture,
//     });
//     await newUser.save();
//     res.status(200).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: "Error" });
//   }
// };

//get all user's data

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

// get single user's data
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};

// update single user by id

export const updateSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: "Got an Error in Catch Block" });
  }
};

//delete single record

export const deleteSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({ message: "Successfully deleted User" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error found in catch block" });
  }
};

// Forgot Password

export const forgotPassword = async (req, res) => {
  try {
    console.log(req.body);

    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log("User", user);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "engrmohsin32@gmail.com",
        pass: "tgsf qlsp yzae wqsb",
      },
    });

    const cryptoo = crypto.randomBytes(6).toString("hex");
    const mailOptions = {
      from: "engrmohsin32@gmail.com",
      to: email,
      subject: "Sending Email",
      text: `Your OTP is ${cryptoo}`,
    };

    transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email has been sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
