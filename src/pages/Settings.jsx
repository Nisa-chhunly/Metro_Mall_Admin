import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import DashboardLayout from "../layout/DashboardLayout";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Store Information");
  const [message, setMessage] = useState("");

  const [storeData, setStoreData] = useState({
    storeName: "Metro Mall",
    supportEmail: "hello@metromall.com",
    phoneNumber: "+1 (800) 555-0100",
    address: "100 Commerce Ave, New York, NY 10001",
    timezone: "America/New_York",
    logoUrl: null,
  });

  const [currencyData, setCurrencyData] = useState({
    code: "USD",
    symbol: "$",
    position: "Before amount ($99.99)",
  });

  const [shippingData, setShippingData] = useState({
    freeShippingThreshold: "75",
    expressFee: "12.99",
    standardFee: "5.99",
    economyFee: "2.99",
  });

  const [paymentMethods, setPaymentMethods] = useState({
    stripe: true,
    paypal: true,
    visa: true,
    mastercard: true,
    amex: false,
    applePay: true,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.sendgrid.net",
    smtpPort: "587",
    fromName: "Metro Mall",
    fromEmail: "noreply@metromall.com",
  });

  const [securityData, setSecurityData] = useState({
    twoFactor: true,
    currentPassword: "••••••••",
    newPassword: "",
    confirmPassword: "",
  });

  const togglePayment = (key) => {
    setPaymentMethods((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("Settings updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const tabs = [
    "Store Information",
    "Currency",
    "Shipping",
    "Payment Methods",
    "Email Settings",
    "Security",
    "Backup",
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 bg-[#f8fafc] text-slate-800 transition-colors duration-300">
        <form onSubmit={handleSave} className="max-w-6xl mx-auto space-y-6">

          {/* Top Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
              <p className="text-sm text-slate-500">Configure your store preferences</p>
            </div>
            <div className="w-40">
              <Button text="Save Changes" type="submit" />
            </div>
          </div>

          {/* Alert Message */}
          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg text-center font-medium">
              {message}
            </div>
          )}

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Sub-Sidebar */}
            <div className="md:col-span-3 p-3 rounded-2xl border border-slate-100 bg-white shadow-sm h-fit space-y-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? "bg-[#d1fae5] text-[#065f46]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Box */}
            <div className="md:col-span-9 p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">

              {/* 1. STORE INFORMATION */}
              {activeTab === "Store Information" && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-800">Store Information</h2>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex items-center gap-5">
                    <div className="w-16 h-16 bg-[#00a86b] rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      M
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Store Logo</h3>
                      <p className="text-xs text-slate-400 mb-2">PNG or SVG, 256×256px recommended</p>
                      <label className="cursor-pointer inline-flex items-center gap-1 border border-slate-200 bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700">
                        Upload Logo
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Store Name</label>
                      <Input type="text" value={storeData.storeName} onChange={(e) => setStoreData({ ...storeData, storeName: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Support Email</label>
                      <Input type="email" value={storeData.supportEmail} onChange={(e) => setStoreData({ ...storeData, supportEmail: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                      <Input type="text" value={storeData.phoneNumber} onChange={(e) => setStoreData({ ...storeData, phoneNumber: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Address</label>
                      <Input type="text" value={storeData.address} onChange={(e) => setStoreData({ ...storeData, address: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. CURRENCY */}
              {activeTab === "Currency" && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-800">Currency Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Currency Code</label>
                      <select
                        value={currencyData.code}
                        onChange={(e) => setCurrencyData({ ...currencyData, code: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm"
                      >
                        <option value="USD">USD</option>
                        <option value="KHR">KHR</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Symbol</label>
                      <Input type="text" value={currencyData.symbol} onChange={(e) => setCurrencyData({ ...currencyData, symbol: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Symbol Position</label>
                      <select
                        value={currencyData.position}
                        onChange={(e) => setCurrencyData({ ...currencyData, position: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm"
                      >
                        <option value="Before amount ($99.99)">Before amount ($99.99)</option>
                        <option value="After amount (99.99$)">After amount (99.99$)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. SHIPPING */}
              {activeTab === "Shipping" && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-800">Shipping Rates</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Free Shipping Threshold ($)</label>
                      <Input type="text" value={shippingData.freeShippingThreshold} onChange={(e) => setShippingData({ ...shippingData, freeShippingThreshold: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Express Shipping Fee ($)</label>
                      <Input type="text" value={shippingData.expressFee} onChange={(e) => setShippingData({ ...shippingData, expressFee: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Standard Shipping Fee ($)</label>
                      <Input type="text" value={shippingData.standardFee} onChange={(e) => setShippingData({ ...shippingData, standardFee: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Economy Shipping Fee ($)</label>
                      <Input type="text" value={shippingData.economyFee} onChange={(e) => setShippingData({ ...shippingData, economyFee: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. PAYMENT METHODS */}
              {activeTab === "Payment Methods" && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-800">Payment Methods</h2>
                  <div className="space-y-3">
                    {Object.entries(paymentMethods).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3.5 bg-slate-50/70 rounded-xl">
                        <span className="text-sm font-semibold capitalize text-slate-800">{key}</span>
                        <button
                          type="button"
                          onClick={() => togglePayment(key)}
                          className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                            value ? "bg-[#10b981] justify-end" : "bg-gray-300 justify-start"
                          }`}
                        >
                          <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. EMAIL SETTINGS */}
              {activeTab === "Email Settings" && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-800">Email Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">SMTP Host</label>
                      <Input type="text" value={emailSettings.smtpHost} onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">SMTP Port</label>
                      <Input type="text" value={emailSettings.smtpPort} onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">From Name</label>
                      <Input type="text" value={emailSettings.fromName} onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">From Email</label>
                      <Input type="email" value={emailSettings.fromEmail} onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {/* 6. SECURITY */}
              {activeTab === "Security" && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-800">Security Settings</h2>
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">Two-Factor Authentication</h3>
                      <p className="text-xs text-slate-400">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSecurityData({ ...securityData, twoFactor: !securityData.twoFactor })}
                      className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                        securityData.twoFactor ? "bg-[#10b981] justify-end" : "bg-gray-300 justify-start"
                      }`}
                    >
                      <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
                      <Input type="password" value={securityData.currentPassword} onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                      <Input type="password" placeholder="Min. 8 characters" value={securityData.newPassword} onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password</label>
                      <Input type="password" placeholder="Repeat new password" value={securityData.confirmPassword} onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {/* 7. BACKUP */}
              {activeTab === "Backup" && (
                <div className="space-y-6">
                  <h2 className="text-base font-bold text-slate-800">Backup & Data</h2>
                  <div className="space-y-3">
                    {[
                      { title: "Export All Orders", desc: "Download complete order history as CSV", btn: "Export CSV" },
                      { title: "Export Customer Data", desc: "Download all customer records", btn: "Export CSV" },
                      { title: "Export Product Catalog", desc: "Download product list with all details", btn: "Export CSV" },
                      { title: "Full Database Backup", desc: "Create a complete backup of all store data", btn: "Create Backup" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-slate-50/70 rounded-xl">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
                          <p className="text-xs text-slate-400">{item.desc}</p>
                        </div>
                        <button type="button" className="border border-slate-200 bg-white text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50">
                          {item.btn}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Settings;