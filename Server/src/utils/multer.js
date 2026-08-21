import multer from "multer";
import path from "path";

// Keep files in RAM, not on the server disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const isPdf =
    file.mimetype === "application/pdf" ||
    path.extname(file.originalname).toLowerCase() === ".pdf";
  if (isPdf) cb(null, true);
  else cb(new Error("Only PDF is allowed!"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;