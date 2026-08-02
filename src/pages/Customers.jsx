import React, { useState } from "react";
import { FaSearch, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DashboardLayout from "../layout/DashboardLayout";

const Customers = () => {
  // 1. Data Customer State with Setter Function
  const [customersData, setCustomersData] = useState([
    {
      id: 1,
      customerId: "CUST-001",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatarBg: "bg-emerald-100 text-emerald-700",
      initials: "SJ",
      phone: "+1 (212) 555-0142",
      address: {
        street: "742 Evergreen Terrace",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
      },
      orders: 14,
      totalSpent: "$2,840",
      lastPurchase: "Jul 19, 2026",
      status: "Active",
    },
    {
      id: 2,
      customerId: "CUST-002",
      name: "Michael Chen",
      email: "mchen@email.com",
      avatarBg: "bg-blue-100 text-blue-600",
      initials: "MC",
      phone: "+1 (415) 555-0188",
      address: {
        street: "123 Market St",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "USA",
      },
      orders: 8,
      totalSpent: "$1,256",
      lastPurchase: "Jul 19, 2026",
      status: "Active",
    },
    {
      id: 3,
      customerId: "CUST-003",
      name: "Emily Watson",
      email: "ewatson@email.com",
      avatarBg: "bg-purple-100 text-purple-600",
      initials: "EW",
      phone: "+1 (312) 555-0177",
      address: {
        street: "456 Michigan Ave",
        city: "Chicago",
        state: "IL",
        zip: "60611",
        country: "USA",
      },
      orders: 21,
      totalSpent: "$4,321",
      lastPurchase: "Jul 18, 2026",
      status: "Active",
    },
    {
      id: 4,
      customerId: "CUST-004",
      name: "James Rivera",
      email: "jrivera@email.com",
      avatarBg: "bg-amber-100 text-amber-700",
      initials: "JR",
      phone: "+1 (512) 555-0199",
      address: {
        street: "789 Congress Ave",
        city: "Austin",
        state: "TX",
        zip: "78701",
        country: "USA",
      },
      orders: 3,
      totalSpent: "$432",
      lastPurchase: "Jul 18, 2026",
      status: "Active",
    },
    {
      id: 5,
      customerId: "CUST-005",
      name: "Aisha Patel",
      email: "apatel@email.com",
      avatarBg: "bg-rose-100 text-rose-600",
      initials: "AP",
      phone: "+1 (617) 555-0166",
      address: {
        street: "101 Boylston St",
        city: "Boston",
        state: "MA",
        zip: "02116",
        country: "USA",
      },
      orders: 33,
      totalSpent: "$8,750",
      lastPurchase: "Jul 17, 2026",
      status: "VIP",
    },
    {
      id: 6,
      customerId: "CUST-006",
      name: "Tom Bradley",
      email: "tbradley@email.com",
      avatarBg: "bg-teal-100 text-teal-700",
      initials: "TB",
      phone: "+1 (206) 555-0133",
      address: {
        street: "202 Pine St",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        country: "USA",
      },
      orders: 11,
      totalSpent: "$3,440",
      lastPurchase: "Jul 17, 2026",
      status: "Active",
    },
    {
      id: 7,
      customerId: "CUST-007",
      name: "Priya Mehta",
      email: "pmehta@email.com",
      avatarBg: "bg-emerald-100 text-emerald-600",
      initials: "PM",
      phone: "+1 (503) 555-0111",
      address: {
        street: "303 SW Morrison St",
        city: "Portland",
        state: "OR",
        zip: "97204",
        country: "USA",
      },
      orders: 1,
      totalSpent: "$47",
      lastPurchase: "Jul 16, 2026",
      status: "Inactive",
    },
    {
      id: 8,
      customerId: "CUST-008",
      name: "Carlos Mendes",
      email: "cmendes@email.com",
      avatarBg: "bg-indigo-100 text-indigo-600",
      initials: "CM",
      phone: "+1 (305) 555-0155",
      address: {
        street: "404 Ocean Dr",
        city: "Miami",
        state: "FL",
        zip: "33139",
        country: "USA",
      },
      orders: 26,
      totalSpent: "$6,200",
      lastPurchase: "Jul 15, 2026",
      status: "VIP",
    },
  ]);

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Handler to update customer status in state
  const handleStatusChange = (id, newStatus) => {
    setCustomersData((prev) =>
      prev.map((customer) =>
        customer.id === id ? { ...customer, status: newStatus } : customer
      )
    );
  };

  // Filter Data (Includes customer ID search)
  const filteredCustomers = customersData.filter((customer) => {
    const fullAddress = `${customer.address.street} ${customer.address.city} ${customer.address.state} ${customer.address.zip}`.toLowerCase();
    
    const matchesSearch =
      customer.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      fullAddress.includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || customer.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700 font-semibold border-emerald-200";
      case "VIP":
        return "bg-purple-100 text-purple-700 font-bold border-purple-200";
      case "Inactive":
        return "bg-slate-100 text-slate-500 font-medium border-slate-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const availableStatuses = ["Active", "VIP", "Inactive"];
  const filterTabs = ["All", ...availableStatuses];

  return (
    <DashboardLayout>
      <div className="space-y-6 font-sans">
        
        {/* Header Title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {filteredCustomers.length} registered customers
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 space-y-5">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3.5 text-slate-400 text-xs" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ID, name, phone, address..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-50 p-1 border border-slate-200/80 rounded-xl overflow-x-auto">
              {filterTabs.map((status) => (
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

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2">Customer</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">Address</th>
                  <th className="pb-3">Orders</th>
                  <th className="pb-3">Total Spent</th>
                  <th className="pb-3">Last Purchase</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Customer Info + Customer ID */}
                      <td className="py-3.5 pl-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${customer.avatarBg}`}
                          >
                            {customer.initials}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-slate-800">
                                {customer.name}
                              </p>
                              {/* Customer ID Badge */}
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                #{customer.customerId}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 text-slate-600 font-medium">
                        {customer.phone}
                      </td>

                      {/* Address Column */}
                      <td className="py-3.5 text-slate-600 font-medium max-w-[200px]">
                        <p className="truncate text-slate-800 font-semibold" title={customer.address.street}>
                          {customer.address.street}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {customer.address.city}, {customer.address.state} {customer.address.zip}
                        </p>
                      </td>

                      <td className="py-3.5 font-bold text-slate-800">
                        {customer.orders}
                      </td>

                      <td className="py-3.5 font-bold text-emerald-600">
                        {customer.totalSpent}
                      </td>

                      <td className="py-3.5 text-slate-500 font-medium">
                        {customer.lastPurchase}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5">
                        <select
                          value={customer.status}
                          onChange={(e) => handleStatusChange(customer.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all ${getStatusBadge(
                            customer.status
                          )}`}
                        >
                          {availableStatuses.map((status) => (
                            <option key={status} value={status} className="bg-white text-slate-700 font-normal">
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3.5 pr-2 text-center">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 font-semibold hover:bg-slate-50 hover:text-emerald-600 transition-all text-xs">
                          <FaEye className="text-slate-400 text-xs" />
                          <span>Profile</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-slate-400">
                      No customers found.
                    </td>
                  </tr>
                )}
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
              <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50 transition-all">
                <FaChevronLeft className="text-xs" />
              </button>
              <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50 transition-all">
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;