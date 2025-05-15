import React from "react";

export default function ImageUploader() {
  return (
    <input
      type="file"
      accept="image/*"
      // onChange={handleImageChange}
      className="file:mr-4 file:rounded-full file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600"
    />
  );
}
