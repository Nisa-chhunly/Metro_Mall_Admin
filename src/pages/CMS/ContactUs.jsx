import { useState } from "react";
import Button from "../../components/Button";
import DashboardLayout from "../../layout/DashboardLayout";

const ContactUs = () => {
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    address: "",
    mapUrl: "",
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Data:", contact);
    alert("Contact updated successfully!");
  };

  // Safe helper to extract src if standard <iframe> tag is pasted
  const getEmbedMapUrl = (url) => {
    if (!url) return "";
    if (url.includes("<iframe") && url.includes('src="')) {
      const srcMatch = url.match(/src="([^"]+)"/);
      return srcMatch ? srcMatch[1] : "";
    }
    return url;
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-semibold">Contact Us Settings</h1>
          <p className="text-gray-500 text-sm">
            Update your public business contact details and store map.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Address */}
            <div>
              <label className="font-medium text-gray-700 block">Address</label>
              <textarea
                rows="3"
                name="address"
                value={contact.address}
                onChange={handleChange}
                placeholder="123 Metro Street, Phnom Penh, Cambodia"
                className="w-full border rounded-lg p-3 mt-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-medium text-gray-700 block">Phone</label>
              <input
                type="text"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                placeholder="+855 12 345 678"
                className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-medium text-gray-700 block">Email</label>
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="support@metromall.com"
                className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Google Map URL */}
            <div>
              <label className="font-medium text-gray-700 block">Google Map Embed URL</label>
              <input
                type="text"
                name="mapUrl"
                value={contact.mapUrl}
                onChange={handleChange}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Paste Google Maps embed URL or iframe code.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                text="Cancel"
                type="button"
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              />
              <Button text="Save Changes" type="submit" />
            </div>
          </form>

          {/* Right Column: Exact Page Layout Preview */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 sticky top-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Page Live Preview
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live
              </span>
            </div>

            {/* Mock Contact Us Web Page */}
            <div className="bg-slate-50 rounded-lg overflow-hidden border shadow-sm text-center text-xs space-y-4 pb-4">
              
              {/* Green Hero Header */}
              <div className="bg-[#109648] text-white py-8 px-4">
                <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
                <p className="text-[11px] text-emerald-100/90 mt-1 max-w-sm mx-auto">
                  Have questions about your order, products, or delivery? Our team is ready to help.
                </p>
              </div>

              {/* 3 Contact Information Cards */}
              <div className="grid grid-cols-3 gap-2 px-3 -mt-6 relative z-10">
                
                {/* Address Card */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-1">
                  <div className="text-[#109648]">
                    <svg className="w-5 h-5 mx-auto fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 text-[11px]">Address</h4>
                  <p className="text-[10px] text-gray-500 break-words leading-tight">
                    {contact.address || "123 Metro Street, Phnom Penh, Cambodia"}
                  </p>
                </div>

                {/* Phone Card */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-1">
                  <div className="text-[#109648]">
                    <svg className="w-5 h-5 mx-auto fill-current" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 text-[11px]">Phone</h4>
                  <p className="text-[10px] text-gray-500 leading-tight">
                    {contact.phone || "+855 12 345 678"}
                  </p>
                </div>

                {/* Email Card */}
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-1">
                  <div className="text-[#109648]">
                    <svg className="w-5 h-5 mx-auto fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 text-[11px]">Email</h4>
                  <p className="text-[10px] text-gray-500 break-all leading-tight">
                    {contact.email || "support@metromall.com"}
                  </p>
                </div>

              </div>

              {/* Bottom Section: Send Us A Message & Map */}
              <div className="grid grid-cols-2 gap-3 px-3 pt-2 text-left">
                
                {/* Left Form Skeleton */}
                <div className="bg-white p-3 rounded-xl border border-gray-100 space-y-2">
                  <h4 className="font-bold text-gray-800 text-xs">Send Us A Message</h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="bg-gray-50 border rounded p-1 text-[9px] text-gray-400">Your Name</div>
                    <div className="bg-gray-50 border rounded p-1 text-[9px] text-gray-400">Your Email</div>
                  </div>
                  <div className="bg-gray-50 border rounded p-1 text-[9px] text-gray-400">Subject</div>
                  <div className="bg-gray-50 border rounded p-1.5 text-[9px] text-gray-400 h-10">Your Message...</div>
                </div>

                {/* Right Map Location */}
                <div className="bg-white p-3 rounded-xl border border-gray-100 space-y-2 flex flex-col">
                  <h4 className="font-bold text-gray-800 text-xs">Our Location</h4>
                  <div className="flex-1 min-h-[90px] rounded border overflow-hidden">
                    {getEmbedMapUrl(contact.mapUrl) ? (
                      <iframe
                        title="Location Map"
                        src={getEmbedMapUrl(contact.mapUrl)}
                        className="w-full h-full min-h-[90px]"
                        loading="lazy"
                      ></iframe>
                    ) : (
                      <div className="w-full h-full min-h-[90px] bg-slate-100 flex items-center justify-center text-[10px] text-gray-400">
                        Map Embed Area
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>

            <p className="text-[11px] text-gray-400 text-center mt-2">
              Matches your actual Contact Us page layout.
            </p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactUs;