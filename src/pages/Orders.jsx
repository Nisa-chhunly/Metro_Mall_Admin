import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';

// ==========================================
//  SVG Icons
// ==========================================
const SearchIcon = () => (
    <svg className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const EyeIcon = () => (
    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const ChevronLeftIcon = () => (
    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
);

// Initial Data
const initialOrders = [
    { id: '#ORD-2041', name: 'Sarah Johnson', email: 'sarah.j@email.com', avatar: 'S', date: 'Jul 19, 2026', total: '$284.00', payment: 'Visa', shipping: 'Express', status: 'Delivered' },
    { id: '#ORD-2040', name: 'Michael Chen', email: 'mchen@email.com', avatar: 'M', date: 'Jul 19, 2026', total: '$156.50', payment: 'Stripe', shipping: 'Standard', status: 'Processing' },
    { id: '#ORD-2039', name: 'Emily Watson', email: 'ewatson@email.com', avatar: 'E', date: 'Jul 18, 2026', total: '$432.00', payment: 'PayPal', shipping: 'Express', status: 'Shipped' },
    { id: '#ORD-2038', name: 'James Rivera', email: 'jrivera@email.com', avatar: 'J', date: 'Jul 18, 2026', total: '$89.99', payment: 'Visa', shipping: 'Economy', status: 'Pending' },
    { id: '#ORD-2037', name: 'Aisha Patel', email: 'apatel@email.com', avatar: 'A', date: 'Jul 17, 2026', total: '$675.00', payment: 'Mastercard', shipping: 'Express', status: 'Delivered' },
    { id: '#ORD-2036', name: 'Tom Bradley', email: 'tbradley@email.com', avatar: 'T', date: 'Jul 17, 2026', total: '$1,299.00', payment: 'Stripe', shipping: 'Express', status: 'Shipped' },
];

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const Orders = () => {
    const [orders] = useState(initialOrders);
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Style resolver for status badge
    const getStatusStyles = (status) => {
        const badgeStyles = {
            Delivered: 'bg-emerald-50 text-emerald-600 border-emerald-200',
            Processing: 'bg-blue-50 text-blue-600 border-blue-200',
            Shipped: 'bg-purple-50 text-purple-600 border-purple-200',
            Pending: 'bg-amber-50 text-amber-600 border-amber-200',
            Cancelled: 'bg-rose-50 text-rose-600 border-rose-200',
        };
        return badgeStyles[status] || 'bg-slate-50 text-slate-600 border-slate-200';
    };

    // Filter Logic
    const filteredOrders = orders.filter((order) => {
        const matchesTab = activeTab === 'All' || order.status === activeTab;
        const query = searchQuery.toLowerCase().trim();
        
        const matchesSearch =
            order.id.toLowerCase().includes(query) ||
            order.name.toLowerCase().includes(query) ||
            order.email.toLowerCase().includes(query);

        return matchesTab && matchesSearch;
    });

    return (
        <DashboardLayout>
            <div className="space-y-6 font-sans">
                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Orders</h1>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{orders.length} total orders</p>
                </div>

                {/* Main Content Box */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                    {/* Search and Filters Bar */}
                    <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
                        <div className="relative flex-1 max-w-md">
                            <SearchIcon />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search order ID or customer..."
                                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/70 p-1 rounded-xl text-xs font-medium text-slate-600">
                            {['All', ...statusOptions].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-1.5 rounded-lg transition-all ${
                                        activeTab === tab
                                            ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                                            : 'hover:text-slate-900 hover:bg-slate-200/50'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200/70 text-slate-400 font-bold uppercase tracking-wider">
                                    <th className="py-3 px-5">Order ID</th>
                                    <th className="py-3 px-5">Customer</th>
                                    <th className="py-3 px-5">Date</th>
                                    <th className="py-3 px-5">Total</th>
                                    <th className="py-3 px-5">Payment</th>
                                    <th className="py-3 px-5">Shipping</th>
                                    <th className="py-3 px-5">Status</th>
                                    <th className="py-3 px-5 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="py-3.5 px-5 font-bold text-slate-900">{order.id}</td>
                                            <td className="py-3.5 px-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                                                        {order.avatar}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 leading-tight">{order.name}</p>
                                                        <p className="text-[11px] text-slate-400">{order.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-5 text-slate-500">{order.date}</td>
                                            <td className="py-3.5 px-5 font-bold text-slate-900">{order.total}</td>
                                            <td className="py-3.5 px-5 text-slate-600">{order.payment}</td>
                                            <td className="py-3.5 px-5 text-slate-600">{order.shipping}</td>

                                            {/* Static Status Badge */}
                                            <td className="py-3.5 px-5">
                                                <span
                                                    className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusStyles(
                                                        order.status
                                                    )}`}
                                                >
                                                    ● {order.status}
                                                </span>
                                            </td>

                                            <td className="py-3.5 px-5 text-center">
                                                <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100/80 hover:text-slate-900 transition-all shadow-xs">
                                                    <EyeIcon /> View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-8 text-slate-400">
                                            No matching orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer / Pagination Section */}
                    <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <p>
                            Showing {filteredOrders.length} of {orders.length} orders
                        </p>
                        <div className="flex items-center gap-1">
                            <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-50">
                                <ChevronLeftIcon />
                            </button>
                            <button className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600">
                                <ChevronRightIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Orders;