import { useState, useEffect } from "react";
import ImageUploader from "../../components/ImageUploader";
import Button from "../../components/Button";
import DashboardLayout from "../../layout/DashboardLayout";

const HeaderHero = () => {
  const [formData, setFormData] = useState({
    brandTitle: "MetroMall",
    promotion: "Fresh Grocery Everyday",
    buttonText: "Shop Now",
    banner: null,
  });

  // State to hold the image URL for live preview
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection from ImageUploader
 const handleImageChange = (fileOrEvent) => {
  let file = null;

  // Check if it's a standard event or direct File object
  if (fileOrEvent?.target?.files) {
    file = fileOrEvent.target.files[0];
  } else if (fileOrEvent instanceof File) {
    file = fileOrEvent;
  }

  if (file) {
    setFormData((prev) => ({
      ...prev,
      banner: file,
    }));
    
    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Header & Hero Updated Successfully!");
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-semibold">Header & Hero Settings</h1>
          <p className="text-gray-500">Update header and hero information.</p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Brand Title */}
            <div>
              <label className="font-medium text-gray-700">Brand Title</label>
              <input
                type="text"
                name="brandTitle"
                value={formData.brandTitle}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="e.g. MetroMall"
              />
            </div>

            {/* Promotion */}
            <div>
              <label className="font-medium text-gray-700">Promotion / Subtitle</label>
              <input
                type="text"
                name="promotion"
                value={formData.promotion}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="e.g. Fresh Grocery Everyday"
              />
            </div>

            {/* Button Text */}
            <div>
              <label className="font-medium text-gray-700">Button Text</label>
              <input
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="e.g. Shop Now"
              />
            </div>

            {/* Banner Image Uploader */}
            <div>
              <ImageUploader
                id="heroBanner"
                label="Main Banner"
                onChange={handleImageChange}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button text="Cancel" type="button" className="bg-gray-200 text-gray-700" />
              <Button text="Save Changes" type="submit" />
            </div>
          </form>

          {/* Right Column: Live Preview Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Live Preview
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active
              </span>
            </div>

            {/* Mock Website Hero Section */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
              {/* Mock Header Navigation */}
              <div className="bg-emerald-700 text-white px-4 py-3 flex justify-between items-center">
                <span className="font-bold text-lg tracking-wide">
                  {formData.brandTitle || "Brand Name"}
                </span>
                <div className="flex gap-3 text-xs opacity-80">
                  <span>Home</span>
                  <span>Products</span>
                  <span>About</span>
                </div>
              </div>

              {/* Mock Hero Area */}
              <div className="relative min-h-[220px] bg-slate-100 flex flex-col justify-center p-6 overflow-hidden">
                {/* Display Uploaded Image or Fallback Overlay */}
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Hero Banner Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-600/40" />
                )}

                {/* Hero Content Overlay */}
                <div className="relative z-10 max-w-xs text-white">
                  <h3 className="text-xl font-bold leading-tight mb-2 drop-shadow-sm">
                    {formData.promotion || "Your Banner Headline Here"}
                  </h3>
                  {formData.buttonText && (
                    <button className="mt-3 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs rounded-md shadow transition-all">
                      {formData.buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-3">
              This is a visual representation of how your hero section will look on the live site.
            </p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default HeaderHero;