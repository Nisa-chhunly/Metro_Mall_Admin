import React, { useState } from "react";
import { FaSearch, FaEye, FaTimes, FaChevronLeft, FaChevronRight, FaEnvelope, FaPhone, FaShoppingBag, FaDollarSign } from "react-icons/fa";
import DashboardLayout from "../layout/DashboardLayout";
const Customers = () => {
  // 1. Data Customers
  const [customersData] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatarBg: "bg-emerald-100 text-emerald-700",
      initials: "SJ",
      phone: "+1 (212) 555-0142",
      address: "New York, USA",
      orders: 14,
      totalSpent: "$2,840",
      lastPurchase: "Jul 19, 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "mchen@email.com",
      avatarBg: "bg-blue-100 text-blue-600",
      initials: "MC",
      phone: "+1 (415) 555-0188",
      address: "San Francisco, USA",
      orders: 8,
      totalSpent: "$1,256",
      lastPurchase: "Jul 19, 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Emily Watson",
      email: "ewatson@email.com",
      avatarBg: "bg-purple-100 text-purple-600",
      initials: "EW",
      phone: "+1 (312) 555-0177",
      address: "Chicago, USA",
      orders: 21,
      totalSpent: "$4,321",
      lastPurchase: "Jul 18, 2026",
      status: "Active",
    },
    {
      id: 4,
      name: "James Rivera",
      email: "jrivera@email.com",
      avatarBg: "bg-amber-100 text-amber-700",
      initials: "JR",
      phone: "+1 (512) 555-0199",
      address: "Austin, USA",
      orders: 3,
      totalSpent: "$432",
      lastPurchase: "Jul 18, 2026",
      status: "Active",
    },
    {
      id: 5,
      name: "Aisha Patel",
      email: "apatel@email.com",
      avatarBg: "bg-rose-100 text-rose-600",
      initials: "AP",
      phone: "+1 (617) 555-0166",
      address: "Boston, USA",
      orders: 33,
      totalSpent: "$8,750",
      lastPurchase: "Jul 17, 2026",
      status: "VIP",
    },
    {
      id: 6,
      name: "Tom Bradley",
      email: "tbradley@email.com",
      avatarBg: "bg-teal-100 text-teal-700",
      initials: "TB",
      phone: "+1 (206) 555-0133",
      address: "Seattle, USA",
      orders: 11,
      totalSpent: "$3,440",
      lastPurchase: "Jul 17, 2026",
      status: "Active",
    },
    {
      id: 7,
      name: "Priya Mehta",
      email: "pmehta@email.com",
      avatarBg: "bg-emerald-100 text-emerald-600",
      initials: "PM",
      phone: "+1 (503) 555-0111",
      address: "Portland, USA",
      orders: 1,
      totalSpent: "$47",
      lastPurchase: "Jul 16, 2026",
      status: "Inactive",
    },
    {
      id: 8,
      name: "Carlos Mendes",
      email: "cmendes@email.com",
      avatarBg: "bg-indigo-100 text-indigo-600",
      initials: "CM",
      phone: "+1 (305) 555-0155",
      address: "Miami, USA",
      orders: 26,
      totalSpent: "$6,200",
      lastPurchase: "Jul 15, 2026",
      status: "VIP",
    },
  ]);

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null); // <--- State ទុក Store Customer ពេលចុច Profile

  // Filter Data
  const filteredCustomers = customersData.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    const matchesStatus =
      selectedStatus === "All" || customer.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-600 font-semibold";
      case "VIP":
        return "bg-purple-100 text-purple-600 font-bold";
      case "Inactive":
        return "bg-slate-100 text-slate-500 font-medium";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const statusOptions = ["All", "Active", "VIP", "Inactive"];

  return (
    <DashboardLayout>
    <div className="space-y-6 font-sans relative">
      
      {/* Header Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
        <p className="text-xs text-slate-400 font-medium mt-1">
          {filteredCustomers.length} registered customers
        </p>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 space-y-5">
        
        {/* Search Input & Status Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3.5 text-slate-400 text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-50 p-1 border border-slate-200/80 rounded-xl overflow-x-auto">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedStatus === status
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">Customer</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Orders</th>
                <th className="pb-3">Total Spent</th>
                <th className="pb-3">Last Purchase</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${customer.avatarBg}`}>
                        {customer.initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{customer.name}</p>
                        <p className="text-[11px] text-slate-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-600 font-medium">{customer.phone}</td>
                  <td className="py-3.5 font-bold text-slate-800">{customer.orders}</td>
                  <td className="py-3.5 font-bold text-emerald-600">{customer.totalSpent}</td>
                  <td className="py-3.5 text-slate-500 font-medium">{customer.lastPurchase}</td>
                  <td className="py-3.5">
                    <span className={`px-3 py-1 rounded-full text-[11px] inline-block ${getStatusBadge(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2 text-center">
                    {/* ប៊ូតុង Profile ចុចទៅ set Data អតិថិជនមកបង្ហាញក្នុង Modal */}
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 font-semibold hover:bg-slate-50 hover:text-emerald-600 transition-all text-xs"
                    >
                      <FaEye className="text-slate-400 text-xs" />
                      <span>Profile</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
          <p>
            Showing <span className="font-semibold text-slate-700">{filteredCustomers.length}</span> of{" "}
            <span className="font-semibold text-slate-700">{customersData.length}</span> customers
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
              <FaChevronLeft className="text-xs" />
            </button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>

      </div>

      {/* MODAL POP-UP (បង្ហាញព័ត៌មាន PROFILE ពេលចុច PROFILE) */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Customer Profile</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs">
              
              {/* Customer Avatar & Name Header */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-sm ${selectedCustomer.avatarBg}`}>
                  {selectedCustomer.initials}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800">{selectedCustomer.name}</h4>
                  <span className={`inline-block px-2.5 py-0.5 mt-1 rounded-full text-[10px] ${getStatusBadge(selectedCustomer.status)}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              {/* Stats Summary Card */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <FaShoppingBag className="text-xs" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Orders</p>
                    <p className="font-bold text-slate-800 text-xs">{selectedCustomer.orders}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <FaDollarSign className="text-xs" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Total Spent</p>
                    <p className="font-bold text-slate-800 text-xs">{selectedCustomer.totalSpent}</p>
                  </div>
                </div>
              </div>

              {/* Detail Info List */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3 text-slate-600">
                  <FaEnvelope className="text-slate-400 text-xs" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <FaPhone className="text-slate-400 text-xs" />
                  <span>{selectedCustomer.phone}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 pt-2 border-t border-slate-100">
                  <span>Last Purchase:</span>
                  <span className="font-semibold text-slate-700">{selectedCustomer.lastPurchase}</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-1.5 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-all text-xs"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
    </DashboardLayout>
  );
};

export default Customers;