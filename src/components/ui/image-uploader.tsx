import { useState, useRef } from "react";
import { X, Upload } from "lucide-react";
import toast from "react-hot-toast";

// Define TypeScript types
type ImageFile = {
  id: string;
  file: File;
  preview: string;
};

type ImagePickerProps = {
  maxFiles?: number;
  onChange?: (files: File[]) => void;
};

export default function ImagePicker({
  maxFiles = 10,
  onChange,
}: ImagePickerProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    // Convert FileList to array and filter for jpeg/jpg
    const newFiles = Array.from(files).filter(
      (file) => file.type === "image/jpeg" || file.type === "image/jpg",
    );

    // Check if adding new files would exceed maxFiles
    if (images.length + newFiles.length > maxFiles) {
      toast.error(`You can only upload a maximum of ${maxFiles} images.`);
      return;
    }

    // Create new image objects with previews
    const newImages = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    // Update state
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);

    // Call onChange if provided
    if (onChange) {
      onChange(updatedImages.map((img) => img.file));
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteImage = (id: string) => {
    // Find the image to delete
    const imageToDelete = images.find((img) => img.id === id);

    // Revoke the object URL to prevent memory leaks
    if (imageToDelete) {
      URL.revokeObjectURL(imageToDelete.preview);
    }

    // Remove the image from state
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);

    // Call onChange if provided
    if (onChange) {
      onChange(updatedImages.map((img) => img.file));
    }
  };

  // Clean up object URLs on unmount
  const cleanupPreviews = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });
  };

  // Trigger file input click
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {/* Upload button */}
        <div
          onClick={handleButtonClick}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-blue-500 ${images.length >= maxFiles ? "pointer-events-none opacity-50" : ""}`}
        >
          <Upload className="mb-2 h-10 w-10 text-gray-400" />
          <p className="text-sm font-medium text-gray-700">
            Click to upload images
          </p>
          <p className="mt-1 text-xs text-gray-500">
            JPEG/JPG only ({images.length}/{maxFiles})
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg"
            className="hidden"
            onChange={handleFileChange}
            disabled={images.length >= maxFiles}
          />
        </div>

        {/* Image preview grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {images.map((image) => (
              <div key={image.id} className="group relative">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image.id)}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-label="Delete image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
