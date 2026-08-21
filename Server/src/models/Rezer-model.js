import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    resumeFileName: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    analysisResult: {
      score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      feedback: {
        type: String,
        required: true,
      },
      matchingSkills: {
        type: [String],
        default: [],
      },
      missingSkills: {
        type: [String],
        default: [],
      },
      priorityFixes: {
        type: [String],
        default: [],
      },
      role: {
        type: String,
        default: "Unknown Role",
      },
      companyName: {
        type: String,
        default: "Unknown Company",
      },
    },
    status: {
      type: String,
      enum: ["completed", "failed"],
      default: "completed",
    },
    type:{
      type: String,
      default: "rezer"
    }
  },
  { timestamps: true },
);

// Most common query on this collection: "get this user's analyses, newest first"
analysisSchema.index({ user: 1, createdAt: -1 });

const rezerAnalysis = mongoose.model("Analysis", analysisSchema);

export default rezerAnalysis;
