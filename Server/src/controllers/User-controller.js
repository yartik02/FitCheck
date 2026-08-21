import express from "express";
import User from "../models/User-model.js";
import bcrypt from "bcrypt";
import { getDownloadUrl } from "../utils/cloudinary.js";
import rezerAnalysis from "../models/Rezer-model.js";
import TarobPrepAnalysis from "../models/TarobPrep-modal.js";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = newUser.generateToken();

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        defaultResume: null,
      },
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required!",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = user.generateToken();

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successful!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        defaultResume: user.defaultResume || null,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userData = async (req, res) => {
  try {
    const userData = req.user;

    return res.status(200).json({ userData });
  } catch (error) {
    console.error("error form the user route: ", error);
    return res.status(401).json({ message: "Can't find the user!" });
  }
};

const logout = (req, res) => {
  try {
    // Clear the cookie by setting the same options and maxAge=0
    res.cookie("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expires immediately
    });
    return res.status(200).json({ msg: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error during logout." });
  }
};

const viewResume = async (req, res) => {
  try {
    const user = req.user;
    if (!user?.defaultResume?.publicId) {
      return res.status(404).json({ message: "No saved resume found." });
    }

    const downloadUrl = getDownloadUrl(user.defaultResume.publicId);
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      console.error(
        "Cloudinary download failed:",
        response.status,
        response.statusText,
      );
      return res
        .status(502)
        .json({ message: "Failed to fetch saved resume from storage." });
    }

    const arrayBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="resume.pdf"');
    return res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("View Resume Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllAnalysisOfUser = async (req, res) => {
  const { id: userId } = req.params || req.params;
  // console.log("api history hit!", userId);

  try {
    if (!userId) {
      return res.status(400).json({
        message: "UserId is required!",
      });
    }
    const userExist = await User.findOne({ _id: userId });

    if (!userExist) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const rezerAllAnalysis = await rezerAnalysis
      .find(
        { user: userId },
        {
          _id: 1,
          type: 1,
          createdAt: 1,
          resumeFileName: 1,
          "analysisResult.role": 1,
          "analysisResult.companyName": 1,
          "analysisResult.score": 1,
        },
      )
      .sort({ createdAt: -1 })
      .lean();

    const formattedRezerAllAnalysis = rezerAllAnalysis.map((item) => ({
      id: item._id?.toString?.() || item._id,
      type: item.type || "rezer",
      role: item.analysisResult?.role || "Unknown Role",
      companyName: item.analysisResult?.companyName || "Unknown Company",
      date: item.createdAt,
      score: item.analysisResult?.score ?? null,
      resumeFileName: item.resumeFileName || null,
    }));

    const tarobAllAnalysis = await TarobPrepAnalysis.find({
      user: userId,
    }).sort({ createdAt: -1 });

    const formattedTarobAllAnalysis = tarobAllAnalysis.map((item) => ({
      id: item._id?.toString?.() || item._id,
      type: item.type || "tarob",
      role: item.targetRole || "Unknown Role",
      companyName: item.prepResult?.companyName || "Unknown Company",
      date: item.createdAt,
      timeline: item.prepDurationWeeks ?? null,
      resumeFileName: item.resumeFileName || null,
      summary: item.prepResult.summary || "No summary found!",
    }));

    const combinedAnalysis = [
      ...formattedRezerAllAnalysis,
      ...formattedTarobAllAnalysis,
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      allAnalysis: combinedAnalysis,
    });
  } catch (error) {
    console.error("History getting Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRezerAnalysisDetailsById = async (req, res) => {
  const { id: analysisId } = req.params;
  try {
    if (!analysisId) {
      return res.status(400).json({
        message: "Analysis id is required!",
      });
    }

    const rezerAnalysisExist = await rezerAnalysis.findById(analysisId);
    if (!rezerAnalysisExist) {
      return res.status(404).json({ message: "rezer Analysis not found!" });
    }

    res.status(200).json({ details: rezerAnalysisExist });
  } catch (error) {
    console.error("History getting Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTarobAnalysisDetailsById = async (req, res) => {
  const { id: analysisId } = req.params;
  try {
    if (!analysisId) {
      return res.status(400).json({
        message: "Analysis id is required!",
      });
    }

    const tarobAnalysisExist = await TarobPrepAnalysis.findById(analysisId);
    if (!tarobAnalysisExist) {
      return res.status(404).json({ message: "rezer Analysis not found!" });
    }

    res.status(200).json({ details: tarobAnalysisExist });
  } catch (error) {
    console.error("History getting Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {
  const { currPassword, newPassword, userId } = req.body;

  const user = req.user;

  const userExist = await User.findById(userId);

  if (!userExist) return res.status(404).json({ message: "User Not found!" });

  if (user._id === userId)
    return res.status(401).json({ message: "Unauthorised Access." });

  const isCurrPassCorrect = await userExist.comparePassword(currPassword);
  if(!isCurrPassCorrect) return res.status(401).json({message:"Wrong current password, try again!"})

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  const updatedPassword = await User.findByIdAndUpdate(
    userExist._id,
    { $set: { password: hashedPassword } },
    { new: true },
  );

  if (!updatedPassword) {
    return res.status(404).json({ msg: "Password can't be Updated!" });
  }
  return res.status(200).json({ msg: "Password updated successfully!" });
};

const changeName =async(req, res)=>{
  const {newName, userId} = req.body;

  const userExist = await User.findById(userId);

  if (!userExist) return res.status(404).json({ message: "User Not found!" });

  const updatedName = await User.findByIdAndUpdate(
    userExist._id,
    { $set: { name: newName } },
    { new: true },
  );

  if (!updatedName) {
    return res.status(404).json({ msg: "Name can't be Updated!" });
  }
  return res.status(200).json({ msg: "Name updated successfully!" });
}

export {
  signUp,
  loginUser,
  userData,
  logout,
  viewResume,
  getAllAnalysisOfUser,
  getRezerAnalysisDetailsById,
  getTarobAnalysisDetailsById,
  changePassword,
  changeName
};
