import { z } from "zod";

const RezerResponseSchema = z.object({
  score: z
    .number()
    .int("Score must be a whole number")
    .min(0, "Score cannot be below 0")
    .max(100, "Score cannot exceed 100"),
  feedback: z.string().min(10, "Feedback is too short to be useful"),
  matchingSkills: z
    .array(z.string().min(1))
    .max(30, "Unexpectedly large skills list"),
  missingSkills: z
    .array(z.string().min(1))
    .max(30, "Unexpectedly large skills list"),
  priorityFixes: z
    .array(z.string().min(1))
    .min(1, "Must include at least one priority fix")
    .max(3, "Priority fixes should be limited to the top 1-2 items"),
  role: z.string().default("Unknown Role"),
  companyName: z.string().default("Unknown Company"),
});

const TarobPrepResponseSchema = z.object({
  summary: z
    .string()
    .min(10, "Summary is too short to be useful")
    .max(700, "Summary is too long — should be 2-3 sentences"),

  matchingSkills: z
    .array(z.string().min(1))
    .max(30, "Unexpectedly large skills list — check for malformed output"),

  missingSkills: z
    .array(
      z.object({
        skill: z.string().min(1, "Skill name cannot be empty"),
        priority: z.enum(["high", "medium", "low"], {
          errorMap: () => ({ message: "Priority must be high, medium, or low" }),
        }),
        reason: z.string().optional(),
      })
    )
    .min(1, "Must include at least one skill gap")
    .max(20, "Unexpectedly large skill gap list — check for malformed output"),

  technicalQuestions: z
    .array(
      z.object({
        question: z.string().min(10, "Question is too short to be useful"),
        topic: z.string().optional(),
        difficulty: z.enum(["easy", "medium", "hard"]).optional(),
      })
    )
    .min(1, "Must include at least one technical question")
    .max(20, "Unexpectedly large question list — check for malformed output"),

  behavioralQuestions: z
    .array(z.string().min(10, "Question is too short to be useful"))
    .min(1, "Must include at least one behavioral question")
    .max(15, "Unexpectedly large question list — check for malformed output"),

  prepPlan: z
    .array(
      z.object({
        week: z.number().int().min(1, "Week must be at least 1"),
        focus: z.string().min(1, "Focus cannot be empty"),
        tasks: z
          .array(z.string().min(1))
          .max(10, "Unexpectedly large task list — check for malformed output"),
      })
    )
    .min(1, "Must include at least one week"),
    
  companyName: z.string().default("Unknown Company"),
});

export {RezerResponseSchema, TarobPrepResponseSchema};