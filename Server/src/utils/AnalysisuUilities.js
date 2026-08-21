import { PDFParse } from "pdf-parse";
import {
  getDownloadUrl,
} from "../utils/cloudinary.js";

const resolveResume = async (req, user, useSavedResume) => {
  if (useSavedResume === "true") {
    const saved = user?.defaultResume;
    if (!saved?.publicId) {
      throw { status: 400, message: "No saved resume found." };
    }

    const downloadUrl = getDownloadUrl(saved.publicId);
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      console.error("Cloudinary download failed:", response.status, response.statusText);
      throw { status: 502, message: "Failed to fetch saved resume from storage." };
    }

    const arrayBuffer = await response.arrayBuffer();

    return {
      pdfBuffer: Buffer.from(arrayBuffer),
      finalResumeUrl: saved.url,
      resumeFileName: saved.fileName || "resume.pdf",
    };
  }

  // Fresh upload path
  if (!req.file) {
    throw { status: 400, message: "Resume PDF is required." };
  }

  return {
    pdfBuffer: req.file.buffer,
    resumeFileName: req.file.originalname || "resume.pdf",
    // finalResumeUrl and cloudinaryResult are set after upload
  };
};

const extractText = async (pdfBuffer) => {
  const parser = new PDFParse({ data: pdfBuffer });
  const pdfData = await parser.getText();
  await parser.destroy();
  return pdfData.text;
};

export {resolveResume, extractText};