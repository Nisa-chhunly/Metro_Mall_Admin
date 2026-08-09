import { useState, useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import ImageUploader from "../../components/ImageUploader";
import Button from "../../components/Button";

const INITIAL_FORM = {
  tag: "LIMITED FLASH OFFER",
  title1: "Big Weekend",
  title2: "Grocery Rush!",
  description:
    "Stock your kitchen for less. Get premium organic meats, fresh local produce, and everyday essentials at up to 50% off before the timer hits zero.",
  image: null,
  buttonText: "Claim Your Discount",
  footerNotice: "Free shipping automatically applied",
  promotionCard: {
    title: "Extra 10% Cash Back",
    description: "On all bank cards today",
  },
};

const PromoBanner = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    if (!formData.image) {
      setPreviewUrl(null);
      return;
    }

    if (formData.image instanceof File || formData.image instanceof Blob) {
      const objectUrl = URL.createObjectURL(formData.image);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof formData.image === "string") {
      setPreviewUrl(formData.image);
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file) => {
    const selectedFile = file?.target?.files?.[0] || file?.file || file;
    setFormData((prev) => ({
      ...prev,
      image: selectedFile,
    }));
  };

  const handleNestedChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      promotionCard: {
        ...prev.promotionCard,
        [field]: value,
      },
    }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setStatusMessage({ type: "info", text: "Banner reset to default settings." });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can dispatch to global state, localStorage, or API
    setStatusMessage({ type: "success", text: "Promotion banner saved successfully!" });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Promotion Banner</h1>
          <p className="text-gray-500">
            Manage the main banner displayed on the homepage.
          </p>
        </div>

        {/* Status Notification Banner */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-lg border text-sm flex items-center justify-between ${
              statusMessage.type === "success"
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-blue-100 text-blue-800 border-blue-200"
            }`}
          >
            <span>{statusMessage.text}</span>
            <button
              onClick={() => setStatusMessage(null)}
              className="font-bold text-xs hover:opacity-75"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* ================= SETTINGS ================= */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 space-y-5"
          >
            <h2 className="text-xl font-semibold border-b pb-3">
              Banner Settings
            </h2>

            <div>
              <label className="block font-medium mb-2">Banner Image</label>
              <ImageUploader onImageChange={handleImageChange} />
            </div>

            <div>
              <label className="block font-medium mb-1">Tag</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Title 1</label>
                <input
                  type="text"
                  name="title1"
                  value={formData.title1}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Title 2</label>
                <input
                  type="text"
                  name="title2"
                  value={formData.title2}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Button Text</label>
              <input
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Footer Notice</label>
              <input
                type="text"
                name="footerNotice"
                value={formData.footerNotice}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div className="pt-2 border-t">
              <h3 className="font-semibold text-gray-700 mb-3">
                Promotion Card
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.promotionCard.title}
                    onChange={(e) =>
                      handleNestedChange("title", e.target.value)
                    }
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.promotionCard.description}
                    onChange={(e) =>
                      handleNestedChange("description", e.target.value)
                    }
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button text="Save Changes" type="submit" />
              <Button
                text="Reset"
                type="button"
                color="gray"
                onClick={handleReset}
              />
            </div>
          </form>

          {/* ================= LIVE PREVIEW ================= */}
          <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
            <h2 className="text-xl font-semibold mb-5 pb-3 border-b">
              Live Preview
            </h2>

            <div className="rounded-2xl overflow-hidden bg-green-900 flex flex-col lg:flex-row min-h-[480px]">
              {/* Left Side Content */}
              <div className="w-full lg:w-1/2 p-6 lg:p-8 text-white flex flex-col justify-between">
                <div>
                  <span className="bg-green-800 px-3.5 py-1.5 rounded-full text-xs font-semibold inline-block border border-green-700">
                    🔴 {formData.tag}
                  </span>

                  <div className="mt-4">
                    <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
                      {formData.title1}
                    </h1>

                    <h1 className="text-2xl lg:text-3xl font-bold text-yellow-400 leading-tight">
                      {formData.title2}
                    </h1>
                  </div>

                  <p className="mt-3 text-green-100 leading-relaxed text-xs lg:text-sm">
                    {formData.description}
                  </p>

                  <button className="mt-6 bg-yellow-400 text-black px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-yellow-300 transition">
                    {formData.buttonText}
                  </button>
                </div>

                <p className="mt-6 text-xs text-green-200">
                  {formData.footerNotice}
                </p>
              </div>

              {/* Right Side Image & Overlay Card */}
              <div className="relative w-full lg:w-1/2 min-h-[260px] lg:min-h-full flex items-center justify-center bg-green-950/40">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    className="w-full h-full object-cover min-h-[260px]"
                    alt="Promo Banner Preview"
                  />
                ) : (
                  <div className="w-full h-full min-h-[260px] flex items-center justify-center text-white/70 border-t lg:border-t-0 lg:border-l border-white/10 p-6 text-center text-sm">
                    Banner Image Preview
                  </div>
                )}

                {/* Promo Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-white/20">
                  <h3 className="font-bold text-gray-900 text-sm">
                    {formData.promotionCard.title}
                  </h3>
                  <p className="text-gray-600 text-xs mt-0.5">
                    {formData.promotionCard.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PromoBanner;