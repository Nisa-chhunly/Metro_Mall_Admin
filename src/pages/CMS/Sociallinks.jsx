import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import Button from "../../components/Button";

const INITIAL_FORM = {
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
};

const SocialLinks = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [savedData, setSavedData] = useState(INITIAL_FORM);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(savedData);
    setStatusMessage({ type: "info", text: "Form reset to previous saved state." });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedData(formData);
    setStatusMessage({ type: "success", text: "Social links saved successfully!" });
    setTimeout(() => setStatusMessage(null), 3000);
    console.log("Saved Social Links Data:", formData);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Footer - Social Links
          </h1>
          <p className="text-gray-500">
            Manage the social media links displayed under the About section in the site footer.
          </p>
        </div>

        {/* Status Notification Banner */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium ${
              statusMessage.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-blue-100 text-blue-800 border border-blue-200"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* Settings Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 space-y-5"
          >
            <h2 className="text-xl font-semibold border-b pb-3">
              Social Media Links
            </h2>

            <div>
              <label className="block font-medium mb-1">Facebook URL</label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/your-page"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">X (Twitter) URL</label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/your-handle"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/your-profile"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">YouTube URL</label>
              <input
                type="url"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                placeholder="https://youtube.com/c/your-channel"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Functional Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button text="Save Changes" type="submit" />
              <Button
                text="Reset"
                type="button"
                color="gray"
                onClick={handleReset}
              />
            </div>
          </form>

          {/* Footer Live Preview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-5 pb-3 border-b">
              Live Preview (Footer Section)
            </h2>

            <div className="bg-[#0b172a] text-white rounded-2xl p-8 max-w-sm">
              <h3 className="text-base font-bold mb-2">About MetroMall</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Your trusted online supermarket offering fresh groceries, electronics, and household essentials.
              </p>

              {/* Live SVG Social Icons */}
              <div className="flex gap-3 mt-6">
                {formData.facebook && (
                  <a
                    href={formData.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-slate-800 hover:bg-green-600 rounded-full flex items-center justify-center text-gray-200 transition-colors p-2"
                    title="Facebook"
                  >
                    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}

                {formData.twitter && (
                  <a
                    href={formData.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-slate-800 hover:bg-green-600 rounded-full flex items-center justify-center text-gray-200 transition-colors p-2"
                    title="X (Twitter)"
                  >
                    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}

                {formData.instagram && (
                  <a
                    href={formData.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-slate-800 hover:bg-green-600 rounded-full flex items-center justify-center text-gray-200 transition-colors p-2"
                    title="Instagram"
                  >
                    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}

                {formData.youtube && (
                  <a
                    href={formData.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-slate-800 hover:bg-green-600 rounded-full flex items-center justify-center text-gray-200 transition-colors p-2"
                    title="YouTube"
                  >
                    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SocialLinks;