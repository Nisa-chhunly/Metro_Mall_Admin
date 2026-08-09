import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import Button from "../../components/Button";
import { useContact } from "../../components/ContactContext";

// Inline SVG Icon Components to eliminate external package dependencies
const MapPinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ContactUs = () => {
  const { contactData, updateContactData, INITIAL_CONTACT } = useContact();
  const [formData, setFormData] = useState(contactData);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(INITIAL_CONTACT);
    updateContactData(INITIAL_CONTACT);
    setStatusMessage({ type: "info", text: "Reset to initial values." });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContactData(formData);
    setStatusMessage({ type: "success", text: "Saved! Footer & Contact Page synced successfully." });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Contact Settings & Previews
          </h1>
          <p className="text-gray-500">
            Manage contact information, site links, and Google Maps location.
          </p>
        </div>

        {statusMessage && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 border border-green-200 text-sm">
            {statusMessage.text}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* LEFT: Input Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-5">
            <h2 className="text-xl font-semibold border-b pb-3">Contact Details</h2>

            <div>
              <label className="block font-medium text-sm mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-sm mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-sm mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">Google Maps Embed URL (src)</label>
              <input
                type="text"
                name="mapUrl"
                value={formData.mapUrl || ""}
                onChange={handleChange}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full border rounded-lg p-3 text-xs text-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <span className="text-xs text-gray-400 mt-1 block">
                Paste the <code>src</code> attribute from Google Maps {"->"} Share {"->"} Embed a map.
              </span>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button text="Save Changes" type="submit" />
              <Button text="Reset" type="button" color="gray" onClick={handleReset} />
            </div>
          </form>

          {/* RIGHT: Previews with Icons */}
          <div className="space-y-6">
            
            {/* 1. Contact Page Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold border-b pb-3 text-gray-800">
                Contact Page Preview
              </h2>
              
              {/* Top 3 Info Cards */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-3 rounded-xl border shadow-sm flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-emerald-600 flex items-center justify-center mb-1">
                    <MapPinIcon className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-gray-800">Address</p>
                  <p className="text-gray-500 text-[11px] mt-1 line-clamp-2">{formData.address}</p>
                </div>

                <div className="bg-white p-3 rounded-xl border shadow-sm flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-emerald-600 flex items-center justify-center mb-1">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-gray-800">Phone</p>
                  <p className="text-gray-500 text-[11px] mt-1 truncate w-full">{formData.phone}</p>
                </div>

                <div className="bg-white p-3 rounded-xl border shadow-sm flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-emerald-600 flex items-center justify-center mb-1">
                    <MailIcon className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-gray-800">Email</p>
                  <p className="text-gray-500 text-[11px] mt-1 truncate w-full">{formData.email}</p>
                </div>
              </div>

              {/* Map & Message Form Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="border rounded-xl p-3 bg-gray-50 text-[11px] space-y-2">
                  <p className="font-bold text-gray-700">Send Us A Message</p>
                  <div className="h-6 bg-white border rounded px-2 flex items-center text-gray-300">Your Name</div>
                  <div className="h-6 bg-white border rounded px-2 flex items-center text-gray-300">Your Email</div>
                  <div className="h-10 bg-white border rounded px-2 pt-1 text-gray-300">Your Message...</div>
                  <div className="h-6 bg-emerald-700 text-white rounded text-[10px] flex items-center justify-center font-medium">
                    Send Message
                  </div>
                </div>

                <div className="border rounded-xl overflow-hidden bg-gray-100 min-h-[140px] relative">
                  {formData.mapUrl ? (
                    <iframe
                      src={formData.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Contact Page Map Preview"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 text-xs p-2 text-center">
                      No Google Map URL provided
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Footer Contact Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-3">
              <h2 className="text-lg font-semibold border-b pb-3 text-gray-800">
                Footer Contact Preview
              </h2>
              
              <div className="bg-[#0b172a] text-white rounded-xl p-5 text-xs space-y-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Footer Contact Section
                </p>
                <div className="flex items-start gap-2.5 text-gray-300">
                  <MapPinIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{formData.address}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-300">
                  <PhoneIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-300">
                  <MailIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{formData.email}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactUs;