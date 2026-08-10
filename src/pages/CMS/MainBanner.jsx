import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import ImageUploader from "../../components/ImageUploader";
import Button from "../../components/Button";
import { X } from "lucide-react";

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
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
    setPreviewUrl(null);
    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      console.log("Submitted Banner Data:", formData);
      setIsSaving(false);
      setSuccessMessage("Promotion banner saved successfully!");
    }, 300);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Promotion Banner</h1>
          <p className="text-gray-500 mt-1">
            Manage the main banner displayed on the homepage.
          </p>
        </div>

        {/* Banner Alert Message (Matches Screenshot) */}
        {successMessage && (
          <div className="bg-green-100/80 border border-green-200 text-green-800 px-5 py-3.5 rounded-xl flex items-center justify-between text-sm font-medium animate-in fade-in duration-200">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-green-700 hover:text-green-900 transition p-1"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Settings Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 space-y-6"
          >
            <h2 className="text-xl font-semibold border-b pb-3">
              Banner Settings
            </h2>

            <div>
              <label className="block font-medium mb-2 text-sm text-gray-700">
                Banner Image
              </label>
              <ImageUploader onImageChange={handleImageChange} />
            </div>

            <div>
              <label className="block font-medium mb-2 text-sm text-gray-700">
                Tag
              </label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="LIMIT FLASH OFFER"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-sm text-gray-700">
                Title
              </label>
              <textarea
                rows={3}
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Main Title Header"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-sm text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Banner Subtitle or Body text"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                text={isSaving ? "Saving..." : "Save Changes"}
                type="submit"
                disabled={isSaving}
              />
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

            <div className="bg-green-700 rounded-xl p-6 lg:p-8 text-white min-h-[450px] flex flex-col md:flex-row items-center gap-6 shadow-inner">
              
              {/* Left Text Content */}
              <div className="w-full md:w-1/2 flex flex-col items-start">
                <span className="bg-green-500 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 inline-block shadow-sm">
                  {formData.tag || "Your Tag"}
                </span>

                <h1 className="text-2xl lg:text-4xl font-bold leading-tight whitespace-pre-line">
                  {formData.title || "Your Banner Title"}
                </h1>

                <p className="mt-3 text-sm lg:text-base text-green-100 leading-relaxed">
                  {formData.description || "Your banner description goes here."}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition shadow-sm"
                  >
                    Shop Now
                  </button>
                  <button
                    type="button"
                    className="bg-yellow-400 text-black px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition shadow-sm"
                  >
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
                    className="w-full max-h-[300px] object-cover rounded-xl shadow-xl border border-white/20"
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