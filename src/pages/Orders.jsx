import React, { useState } from "react";
import { FaSearch, FaEye, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DashboardLayout from "../layout/DashboardLayout";
const Orders = () => {
    // 1. Data Dummy សម្រាប់ Orders
    const [ordersData] = useState([
        {
            id: "#ORD-2041",
            customer: "Sarah Johnson",
            email: "sarah.j@email.com",
            initials: "S",
            avatarBg: "bg-emerald-100 text-emerald-700",
            date: "Jul 19, 2026",
            total: "$284.00",
            payment: "Visa",
            shipping: "Express",
            status: "Delivered",
            items: [
                { name: "Perfume Love Notes 50ml", qty: 2, price: "$142.00" }
            ]
        },
        {
            id: "#ORD-2040",
            customer: "Michael Chen",
            email: "mchen@email.com",
            initials: "M",
            avatarBg: "bg-blue-100 text-blue-600",
            date: "Jul 19, 2026",
            total: "$156.50",
            payment: "Stripe",
            shipping: "Standard",
            status: "Processing",
            items: [
                { name: "Aroma Body Lotion", qty: 1, price: "$156.50" }
            ]
        },
        {
            id: "#ORD-2039",
            customer: "Emily Watson",
            email: "ewatson@email.com",
            initials: "E",
            avatarBg: "bg-purple-100 text-purple-600",
            date: "Jul 18, 2026",
            total: "$432.00",
            payment: "PayPal",
            shipping: "Express",
            status: "Shipped",
            items: [
                { name: "Luxury Gift Set", qty: 1, price: "$432.00" }
            ]
        },
        {
            id: "#ORD-2038",
            customer: "James Rivera",
            email: "jrivera@email.com",
            initials: "J",
            avatarBg: "bg-amber-100 text-amber-700",
            date: "Jul 18, 2026",
            total: "$89.99",
            payment: "Visa",
            shipping: "Economy",
            status: "Pending",
            items: [
                { name: "Floral Scented Candle", qty: 3, price: "$29.99" }
            ]
        },
        {
            id: "#ORD-2037",
            customer: "Aisha Patel",
            email: "apatel@email.com",
            initials: "A",
            avatarBg: "bg-rose-100 text-rose-600",
            date: "Jul 17, 2026",
            total: "$675.00",
            payment: "Mastercard",
            shipping: "Express",
            status: "Delivered",
            items: [
                { name: "Signature Collection Box", qty: 1, price: "$675.00" }
            ]
        },
        {
            id: "#ORD-2036",
            customer: "Tom Bradley",
            email: "tbradley@email.com",
            initials: "T",
            avatarBg: "bg-teal-100 text-teal-700",
            date: "Jul 17, 2026",
            total: "$1,299.00",
            payment: "Stripe",
            shipping: "Express",
            status: "Shipped",
            items: [
                { name: "VIP Oud Special Edition", qty: 2, price: "$649.50" }
            ]
        },
    ]);

    // States សម្រាប់ Search, Filter និង Selected Order (Modal)
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState(null); // <--- State ទុក Store Order ដែលត្រូវ View

    // Filter Data
    const filteredOrders = ordersData.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            selectedStatus === "All" || order.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Function កំណត់ Style Badge Status
    const getStatusBadge = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-emerald-100 text-emerald-600";
            case "Processing":
                return "bg-blue-100 text-blue-600";
            case "Shipped":
                return "bg-purple-100 text-purple-600";
            case "Pending":
                return "bg-amber-100 text-amber-600";
            case "Cancelled":
                return "bg-rose-100 text-rose-600";
            default:
                return "bg-slate-100 text-slate-600";
        }
    };

    const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    return (
        <DashboardLayout>
        <div className="space-y-6 font-sans relative">

            {/* 1. Header Title */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Orders</h1>
                <p className="text-xs text-slate-400 font-medium mt-1">
                    {filteredOrders.length} total orders
                </p>
            </div>

            {/* 2. Main Card Container */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 space-y-5">

                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative w-full sm:w-72">
                        <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3.5 text-slate-400 text-xs" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search order ID or customer..."
                            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-1 bg-slate-50 p-1 border border-slate-200/80 rounded-xl overflow-x-auto">
                        {statusOptions.map((status) => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${selectedStatus === status
                                        ? "bg-emerald-600 text-white shadow-sm"
                                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="pb-3 pl-2">Order ID</th>
                                <th className="pb-3">Customer</th>
                                <th className="pb-3">Date</th>
                                <th className="pb-3">Total</th>
                                <th className="pb-3">Payment</th>
                                <th className="pb-3">Shipping</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3 pr-2 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-xs">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="py-3.5 pl-2 font-bold text-slate-800">{order.id}</td>
                                    <td className="py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${order.avatarBg}`}>
                                                {order.initials}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{order.customer}</p>
                                                <p className="text-[11px] text-slate-400">{order.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3.5 text-slate-500 font-medium">{order.date}</td>
                                    <td className="py-3.5 font-bold text-slate-800">{order.total}</td>
                                    <td className="py-3.5 text-slate-600 font-medium">{order.payment}</td>
                                    <td className="py-3.5 text-slate-600 font-medium">{order.shipping}</td>
                                    <td className="py-3.5">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1.5 ${getStatusBadge(order.status)}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3.5 pr-2 text-center">
                                        {/* ប៊ូតុង View: ចុចទៅ set យក Data Order នោះមកដាក់ក្នុង Modal State */}
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 font-semibold hover:bg-slate-50 hover:text-emerald-600 transition-all text-xs"
                                        >
                                            <FaEye className="text-slate-400 text-xs" />
                                            <span>View</span>
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
                        Showing <span className="font-semibold text-slate-700">{filteredOrders.length}</span> of{" "}
                        <span className="font-semibold text-slate-700">{ordersData.length}</span> orders
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

            {/* 4. MODAL POP-UP (បង្ហាញព័ត៌មានពេលចុច VIEW) */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <div>
                                <h3 className="font-bold text-slate-800 text-base">Order Details</h3>
                                <p className="text-xs text-slate-400 font-medium">{selectedOrder.id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                            >
                                <FaTimes className="text-sm" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4 text-xs">
                            {/* Customer Info */}
                            <div className="bg-slate-50 p-3.5 rounded-xl space-y-1">
                                <p className="text-[11px] font-bold uppercase text-slate-400">Customer</p>
                                <p className="font-bold text-slate-800 text-sm">{selectedOrder.customer}</p>
                                <p className="text-slate-500">{selectedOrder.email}</p>
                            </div>

                            {/* Order Meta Info */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="border border-slate-100 p-3 rounded-xl">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase">Date</p>
                                    <p className="font-semibold text-slate-700 mt-0.5">{selectedOrder.date}</p>
                                </div>
                                <div className="border border-slate-100 p-3 rounded-xl">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase">Payment Method</p>
                                    <p className="font-semibold text-slate-700 mt-0.5">{selectedOrder.payment}</p>
                                </div>
                                <div className="border border-slate-100 p-3 rounded-xl">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase">Shipping</p>
                                    <p className="font-semibold text-slate-700 mt-0.5">{selectedOrder.shipping}</p>
                                </div>
                                <div className="border border-slate-100 p-3 rounded-xl">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase">Status</p>
                                    <span className={`inline-block px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold ${getStatusBadge(selectedOrder.status)}`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="space-y-2 pt-2 border-t border-slate-100">
                                <p className="font-bold text-slate-800">Items Ordered</p>
                                {selectedOrder.items?.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-1 text-slate-600">
                                        <span>{item.name} (x{item.qty})</span>
                                        <span className="font-semibold text-slate-800">{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Total Price */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100 font-bold text-sm">
                                <span className="text-slate-800">Total Amount</span>
                                <span className="text-emerald-600">{selectedOrder.total}</span>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-right">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-all"
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

export default Orders;