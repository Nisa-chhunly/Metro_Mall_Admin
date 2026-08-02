import { useState } from "react";
import Button from "../../components/Button";
import DashboardLayout from "../../layout/DashboardLayout";

const FooterSettings = () => {
  const [footer, setFooter] = useState({
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFooter({
      ...footer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Footer Settings:", footer);
    alert("Footer updated successfully!");
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-semibold">Footer Settings</h1>
          <p className="text-gray-500 text-sm">
            Update general footer contact and location details.
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
                value={footer.address}
                onChange={handleChange}
                placeholder="123 Commerce Street, Metro City"
                className="w-full border rounded-lg p-3 mt-2 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-medium text-gray-700 block">Phone</label>
              <input
                type="text"
                name="phone"
                value={footer.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-medium text-gray-700 block">Email</label>
              <input
                type="email"
                name="email"
                value={footer.email}
                onChange={handleChange}
                placeholder="support@metromall.com"
                className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
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

          {/* Right Column: Exact Match Footer Live Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sticky top-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Footer Live Preview
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live
              </span>
            </div>

            {/* Mock Website Dark Navy Footer */}
            <div className="bg-[#0B1727] text-slate-300 rounded-lg p-5 text-xs shadow-lg space-y-6">
              
              {/* 4-Column Footer Main Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 border-b border-slate-800">
                
                {/* Column 1: About MetroMall */}
                <div className="space-y-3">
                  <h3 className="font-bold text-white text-sm">About MetroMall</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Your trusted online supermarket offering fresh groceries, electronics, and household essentials delivered to your doorstep.
                  </p>
                  {/* Social Icons */}
                  <div className="flex gap-1.5 pt-1">
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white cursor-pointer hover:bg-slate-700">f</span>
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white cursor-pointer hover:bg-slate-700">t</span>
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white cursor-pointer hover:bg-slate-700">i</span>
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white cursor-pointer hover:bg-slate-700">y</span>
                  </div>
                </div>

                {/* Column 2: Quick Links */}
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-sm">Quick Links</h3>
                  <ul className="space-y-1.5 text-slate-400 text-[11px]">
                    <li className="hover:text-white cursor-pointer">Home</li>
                    <li className="hover:text-white cursor-pointer">Shop</li>
                    <li className="hover:text-white cursor-pointer">Contact Us</li>
                    <li className="hover:text-white cursor-pointer">About Us</li>
                    <li className="hover:text-white cursor-pointer">Careers</li>
                  </ul>
                </div>

                {/* Column 3: Customer Service */}
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-sm">Customer Service</h3>
                  <ul className="space-y-1.5 text-slate-400 text-[11px]">
                    <li className="hover:text-white cursor-pointer">Help Center</li>
                    <li className="hover:text-white cursor-pointer">Track Order</li>
                    <li className="hover:text-white cursor-pointer">Returns</li>
                    <li className="hover:text-white cursor-pointer">Shipping Info</li>
                    <li className="hover:text-white cursor-pointer">FAQs</li>
                  </ul>
                </div>

                {/* Column 4: Contact Us & Newsletter */}
                <div className="space-y-3">
                  <h3 className="font-bold text-white text-sm">Contact Us</h3>
                  
                  <div className="space-y-2 text-[11px] text-slate-300">
                    {/* Location */}
                    <div className="flex items-start gap-1.5">
                      <span className="text-slate-400">📍</span>
                      <p className="break-words">
                        {footer.address || "123 Commerce Street, Metro City"}
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">📞</span>
                      <p>{footer.phone || "+1 (555) 123-4567"}</p>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">✉️</span>
                      <p className="break-all">{footer.email || "support@metromall.com"}</p>
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="pt-2">
                    <p className="font-bold text-white text-[11px] mb-1.5">Newsletter</p>
                    <div className="flex rounded overflow-hidden">
                      <input
                        type="text"
                        disabled
                        placeholder="Your email"
                        className="w-full bg-white text-slate-800 text-[10px] px-2 py-1 outline-none"
                      />
                      <button type="button" className="bg-emerald-600 text-white text-[10px] px-2.5 py-1 font-medium">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Copyright Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-2 pt-1">
                <p>© {new Date().getFullYear()} MetroMall. All rights reserved.</p>
                <div className="flex gap-3 text-[11px]">
                  <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                  <span className="hover:text-white cursor-pointer">Terms of Service</span>
                  <span className="hover:text-white cursor-pointer">Cookie Policy</span>
                </div>
              </div>

            </div>

            <p className="text-[11px] text-gray-400 text-center mt-2">
              Matches your actual footer template in real time.
            </p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default FooterSettings;