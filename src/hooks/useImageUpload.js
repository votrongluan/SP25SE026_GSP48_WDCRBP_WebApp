import { useState } from "react";
import { put } from "@vercel/blob";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    try {
      setUploading(true);
      setError(null);

      // Upload to Vercel Blob
      const blob = await put(file.name, file, {
        access: "public",
        token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN,
      });

      return {
        url: blob.url,
        filename: file.name,
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async (files) => {
    try {
      setUploading(true);
      setError(null);

      const uploadPromises = files.map((file) => uploadImage(file));
      const results = await Promise.all(uploadPromises);

      return results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadImage,
    uploadMultipleImages,
    uploading,
    error,
  };
};
