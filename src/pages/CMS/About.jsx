import { useState, useEffect } from "react";
import Button from "../../components/Button";
import ImageUploader from "../../components/ImageUploader";
import DashboardLayout from "../../layout/DashboardLayout";

const About = () => {
  const [about, setAbout] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setAbout({
      ...about,
      [e.target.name]: e.target.value,
    });
  };

  // Safe handler for ImageUploader (handles direct file or standard event)
  const handleImageChange = (fileOrEvent) => {
    let file = null;

    if (fileOrEvent?.target?.files) {
      file = fileOrEvent.target.files[0];
    } else if (fileOrEvent instanceof File) {
      file = fileOrEvent;
    }

    if (file) {
      setAbout((prev) => ({
        ...prev,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Cleanup object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(about);
    alert("About section updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Page Title */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-semibold">About Section Settings</h1>
          <p className="text-gray-500 text-sm">
            Update the About information shown on your website's footer.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                About Title
              </label>
              <input
                type="text"
                name="title"
                value={about.title}
                onChange={handleChange}
                placeholder="About MetroMall"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows="5"
                name="description"
                value={about.description}
                onChange={handleChange}
                placeholder="Write about your company..."
                className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* About Image */}
            <div>
              <ImageUploader
                id="aboutImage"
                label="About Section Image"
                onChange={handleImageChange}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                text="Cancel"
                type="button"
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              />
              <Button text="Save Changes" type="submit" />
            </div>
          </form>

          {/* Right Column: Footer Live Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Footer Preview
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live
              </span>
            </div>

            {/* Mock Footer Container */}
            <div className="bg-emerald-950 text-emerald-100 rounded-lg p-6 shadow-inner space-y-6">
              
              {/* Footer Top Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-emerald-800/60 pb-6 text-xs">
                
                {/* About Column (Dynamic) */}
                <div className="sm:col-span-2 space-y-3">
                  <h3 className="font-semibold text-white text-base tracking-wide border-b border-emerald-700/50 pb-1">
                    {about.title || "About MetroMall"}
                  </h3>

                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="About Preview"
                      className="w-full h-28 object-cover rounded-md border border-emerald-800"
                    />
                  )}

                  <p className="text-emerald-200/80 leading-relaxed break-words whitespace-pre-wrap">
                    {about.description ||
                      "Your company description will appear here inside the website footer..."}
                  </p>
                </div>

                {/* Dummy Links Column */}
                <div className="space-y-2 opacity-60">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                    Quick Links
                  </h4>
                  <ul className="space-y-1">
                    <li className="hover:underline cursor-pointer">Shop Products</li>
                    <li className="hover:underline cursor-pointer">Promotions</li>
                    <li className="hover:underline cursor-pointer">Contact Us</li>
                    <li className="hover:underline cursor-pointer">Privacy Policy</li>
                  </ul>
                </div>

              </div>

              {/* Footer Bottom Line */}
              <div className="text-center text-[10px] text-emerald-400/60">
                © {new Date().getFullYear()} MetroMall. All rights reserved.
              </div>

            </div>

            <p className="text-xs text-gray-400 text-center mt-3">
              This preview reflects how the About section renders in the website footer.
            </p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default About;