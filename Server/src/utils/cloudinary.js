import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary stores PDFs uploaded with resource_type:"auto" as "image".
// This constant is used for deletion and download, which require the exact type.
const PDF_RESOURCE_TYPE = "image";

const UPLOAD_FOLDER = "resume_analyzer";

/**
 * Upload a file buffer (PDF) to Cloudinary.
 * Returns the full Cloudinary result object (secure_url, public_id, etc).
 */
export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: UPLOAD_FOLDER,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    stream.end(fileBuffer);
  });
};

/**
 * Delete a resource from Cloudinary by its public ID.
 * Invalidates CDN cache so the old URL stops serving immediately.
 */
export const deleteFromCloudinary = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: PDF_RESOURCE_TYPE,
    invalidate: true,
  });

  if (result.result !== "ok") {
    console.warn(`Cloudinary deletion returned "${result.result}" for ${publicId}`);
  }

  return result;
};

/**
 * Generate an API-authenticated download URL for a Cloudinary resource.
 *
 * Why not just fetch the CDN URL?
 * Cloudinary restricts direct CDN access for certain resource types (PDFs).
 * This method hits the Cloudinary API endpoint instead, which authenticates
 * via api_key + timestamp + signature — bypassing CDN-level 401s entirely.
 */
export const getDownloadUrl = (publicId) => {
  return cloudinary.utils.private_download_url(publicId, "pdf", {
    resource_type: PDF_RESOURCE_TYPE,
    type: "upload",
  });
};
