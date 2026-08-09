import { ImagePlus } from "lucide-react";

const ImageUploader = ({ id = "image-upload", label = "Upload Image", onImageChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file); // Pass the raw File object directly
    }
  };

  return (
    <div>
      <label htmlFor={id} className="font-medium text-gray-700 block mb-2">
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border rounded-lg p-2"
      />
    </div>
  );
};

export default ImageUploader;