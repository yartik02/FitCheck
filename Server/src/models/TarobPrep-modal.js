import mongoose from "mongoose";

const tarobPrepSchema = new mongoose.Schema(
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
      required: true, // original filename, e.g. "Priya_Resume_SDE.pdf"
    },
    targetRole: {
      type: String,
      required: true, // e.g. "SDE2", "Backend Engineer"
    },
    targetJobDescription: {
      type: String, // optional — if user pastes a JD instead of/alongside role name
    },
    prepDurationWeeks: {
      type: Number,
      required: true,
      enum: {
        values: [1, 2, 4, 6, 8],
        message: "{VALUE} is not a supported prep duration",
      },
    },
    prepResult: {
      matchingSkills: {
        type: [String],
        default: [],
      },
      missingSkills: [
        {
          skill: { type: String, required: true },
          priority: {
            type: String,
            enum: ["high", "medium", "low"],
            required: true,
          },
          reason: { type: String }, // why it matters for this role
        },
      ],
      technicalQuestions: [
        {
          question: { type: String, required: true },
          topic: { type: String }, // e.g. "System Design", "DSA"
          difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
          },
        },
      ],
      behavioralQuestions: {
        type: [String],
        default: [],
      },
      prepPlan: [
        {
          week: { type: Number, required: true },
          focus: { type: String, required: true },
          tasks: { type: [String], default: [] },
        },
      ],
      summary: {
        type: String, // 2-3 sentence overview, mirrors Rezer's "feedback" field
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
      default: "tarob"
    }
  },
  { timestamps: true },
);

tarobPrepSchema.index({ user: 1, createdAt: -1 });

const TarobPrepAnalysis = mongoose.model("TarobPrep", tarobPrepSchema);

export default TarobPrepAnalysis;
