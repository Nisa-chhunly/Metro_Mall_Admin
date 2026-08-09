import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import ImageUploader from "../../components/ImageUploader";
import Button from "../../components/Button";

const INITIAL_FORM = {
  heroImage: null,
  tag: "Fresh & Organic",
  title: "Fresh Groceries Delivered To Your Door",
  description:
    "Shop premium quality groceries, fresh vegetables, fruits, and daily essentials at unbeatable prices.",
};

const MainBanner = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Synchronize image preview safely whenever formData.heroImage changes
  useEffect(() => {
    if (!formData.heroImage) {
      setPreviewUrl(null);
      return;
    }

    let urlToClean = null;

    if (formData.heroImage instanceof File || formData.heroImage instanceof Blob) {
      urlToClean = URL.createObjectURL(formData.heroImage);
      setPreviewUrl(urlToClean);
    } else if (typeof formData.heroImage === "string") {
      setPreviewUrl(formData.heroImage);
    }

    return () => {
      if (urlToClean) {
        URL.revokeObjectURL(urlToClean);
      }
    };
  }, [formData.heroImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (fileOrEvent) => {
    // Extract the File object regardless of how ImageUploader passes it back
    let file = fileOrEvent;

    if (fileOrEvent?.target?.files?.[0]) {
      file = fileOrEvent.target.files[0];
    } else if (fileOrEvent?.file) {
      file = fileOrEvent.file;
    }

    setFormData((prev) => ({
      ...prev,
      heroImage: file,
    }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Banner updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Main Banner</h1>
          <p className="text-gray-500">
            Manage the main banner displayed on the homepage.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Settings */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 space-y-6"
          >
            <h2 className="text-xl font-semibold border-b pb-3">
              Banner Settings
            </h2>

            <div>
              <label className="block font-medium mb-2">Hero Image</label>
              <ImageUploader onImageChange={handleImageChange} />
            </div>

            <div>
              <label className="block font-medium mb-2">Tag</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Fresh & Organic"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Title</label>
              <textarea
                rows={3}
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Description</label>
              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div className="flex gap-3">
              <Button text="Save Changes" type="submit" />
              <Button
                text="Reset"
                type="button"
                color="gray"
                onClick={handleReset}
              />
            </div>
          </form>
        {/* Live Preview */}
<div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
  <h2 className="text-xl font-semibold border-b pb-3 mb-6">
    Live Preview
  </h2>

  {/* Responsive Banner Wrapper */}
  <div className="bg-green-700 rounded-xl p-6 lg:p-8 text-white min-h-[450px] flex flex-col md:flex-row items-center gap-6">
    
    {/* Left Text Content */}
    <div className="w-full md:w-1/2 flex flex-col items-start">
      <span className="bg-green-500 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 inline-block">
        {formData.tag}
      </span>

      <h1 className="text-2xl lg:text-4xl font-bold leading-tight whitespace-pre-line">
        {formData.title}
      </h1>

      <p className="mt-3 text-sm lg:text-base text-green-100 leading-relaxed">
        {formData.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
          Shop Now
        </button>
        <button className="bg-yellow-400 text-black px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition">
          View Deals
        </button>
      </div>
    </div>

    {/* Right Image Container */}
    <div className="w-full md:w-1/2 flex justify-center items-center">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Hero Preview"
          className="w-full max-h-[300px] object-cover rounded-xl shadow-xl"
        />
      ) : (
        <div className="w-full h-[220px] lg:h-[280px] border-2 border-dashed border-white/40 rounded-xl flex items-center justify-center text-white/80 text-sm font-medium p-4 text-center">
          Hero Image Preview
        </div>
      )}
    </div>

  </div>
</div>
          
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MainBanner;