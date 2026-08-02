import { useState } from "react";
import { ImagePlus } from "lucide-react";

// Example ImageUploader.jsx
const ImageUploader = ({ id, label, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="font-medium text-gray-700 block mb-2">
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={onChange} // <--- Make sure onChange is passed here!
        className="w-full border rounded-lg p-2"
      />
    </div>
  );
};

export default ImageUploader;