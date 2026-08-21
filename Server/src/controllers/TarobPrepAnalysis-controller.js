import { GoogleGenAI } from "@google/genai";
import { PDFParse } from "pdf-parse";
import { z } from "zod";
import TarobPrepAnalysis from "../models/TarobPrep-modal.js";
import User from "../models/User-model.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
  getDownloadUrl,
} from "../utils/cloudinary.js";
import { TarobPrepResponseSchema } from "../utils/zodSchema.js";
import { tarobPrompt } from "../utils/Prompts.js";
import { extractText, resolveResume } from "../utils/AnalysisuUilities.js";

if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "FATAL ERROR: GEMINI_API_KEY is not defined in the environment.",
  );
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const callAI = (prompt) =>
  ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,
    config: { responseMimeType: "application/json" },
  });

const uploadAndUpdateDefault = async (user, pdfBuffer, resumeFileName) => {
  const cloudinaryResult = await uploadToCloudinary(pdfBuffer);
  const newUrl = cloudinaryResult.secure_url;

  if (user) {
    // Fire-and-forget: clean up the old resume from Cloudinary
    if (user.defaultResume?.publicId) {
      deleteFromCloudinary(user.defaultResume.publicId).catch((err) =>
        console.error("Failed to delete old default resume:", err),
      );
    }

    user.defaultResume = {
      url: newUrl,
      publicId: cloudinaryResult.public_id,
      fileName: resumeFileName,
    };
    await user.save();
  }

  return { finalResumeUrl: newUrl };
};

const newTarobAnalysis = async (req, res) => {
  const { jobDes, userId, useSavedResume, targetRole, timeline } = req.body;
    // console.log("api hitted!entering try catch...");
    
  try {
    const user = await User.findById(userId);

    // 1. Resolve the resume source (saved or uploaded)
    const resume = await resolveResume(req, user, useSavedResume);

    // 2. Extract text from the PDF
    const resumeText = await extractText(resume.pdfBuffer);

    // 3. rezer prompt and run AI + Cloudinary upload in parallel (for new uploads)
    const prompt = tarobPrompt({
      resumeText,
      targetRole,
      jobDescription: jobDes,
      prepDurationWeeks: Number(timeline)
    });

    let aiResponse;

    if (useSavedResume === "true") {
      aiResponse = await callAI(prompt);
    } else {
      // Run AI call and Cloudinary upload concurrently
      const [aiResult, uploadResult] = await Promise.all([
        callAI(prompt),
        uploadAndUpdateDefault(user, resume.pdfBuffer, resume.resumeFileName),
      ]);
      aiResponse = aiResult;
      resume.finalResumeUrl = uploadResult.finalResumeUrl;
    }

    // 4. Parse and validate the AI response
    const validatedResult = TarobPrepResponseSchema.parse(
      JSON.parse(aiResponse.text),
    );

    // 5. Persist the analysis
    const createdAnalysis = await TarobPrepAnalysis.create({
      user: userId,
      resumeUrl: resume.finalResumeUrl,
      resumeFileName: resume.resumeFileName,
      targetJobDescription: jobDes,
      targetRole: targetRole,
      prepDurationWeeks:timeline,
      status: "completed",
      prepResult: validatedResult,
    });

    return res.status(201).json({ analysis: createdAnalysis });
  } catch (error) {
    // Structured errors thrown by resolveResume
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    console.error("Analysis Error:", error);

    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: "AI generated invalid data structure.",
        details: error.errors,
      });
    }

    return res.status(500).json({ message: "Internal Server Error!" });
  }
};


const deleteTarobAnalysis = async(req, res)=>{
    const { analysisId } = req.body;
  try {
    const analysisRecord = await TarobPrepAnalysis.findById(analysisId);
    if (!analysisRecord) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    await TarobPrepAnalysis.findByIdAndDelete(analysisId);

    return res.status(200).json({ message: "Analysis deleted." });
  } catch (error) {
    console.error("Delete Analysis Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


export {newTarobAnalysis, deleteTarobAnalysis}