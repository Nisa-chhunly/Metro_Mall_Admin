import { useState, useMemo } from "react";
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  Clock,
  Phone,
  User,
  Send,
  CheckCircle2,
  AlertCircle,
  Filter,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

const initialMessages = [
  {
    id: 1,
    name: "Sokha Chan",
    email: "sokha.chan@gmail.com",
    phone: "+855 12 987 654",
    subject: "Bulk Order Inquiry for Corporate Event",
    message:
      "Hello MetroMall Team,\n\nWe are planning a company gathering next month and would like to inquire about placing a bulk order for beverage crates and snack packages. Do you offer wholesale discounts or customized delivery schedules for orders exceeding $1,000?\n\nLooking forward to hearing from you soon.\nBest regards,\nSokha",
    date: "2026-08-02T14:30:00",
    status: "Unread", // Unread, Replied, Pending
    priority: "High",
  },
  {
    id: 2,
    name: "John Smith",
    email: "jsmith.phnompenh@yahoo.com",
    phone: "+855 92 112 233",
    subject: "Wrong Item Received in Order #MM-9821",
    message:
      "Hi Support,\n\nI received my order yesterday afternoon, but instead of the organic apples I ordered, I received green pears. Could you please arrange an exchange or issue a credit to my account?\n\nThank you,\nJohn",
    date: "2026-08-01T09:15:00",
    status: "Pending",
    priority: "High",
  },
  {
    id: 3,
    name: "Dara Heng",
    email: "dara.heng@techcambodia.com",
    phone: "+855 77 445 566",
    subject: "Partnership Opportunity & Supplier Query",
    message:
      "Dear MetroMall Management,\n\nWe represent a local organic farm produce cooperative based in Battambang. We are interested in distributing our products through your platform. Who would be the best person to speak with in your procurement team?\n\nRegards,\nDara Heng",
    date: "2026-07-30T16:45:00",
    status: "Replied",
    priority: "Normal",
  },
];

export default function Messages() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [replyText, setReplyText] = useState("");

  const activeMessage = useMemo(
    () => messages.find((m) => m.id === selectedId) || messages[0],
    [messages, selectedId]
  );

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesFilter = filter === "All" || m.status === filter;
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.subject.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [messages, filter, search]);

  const handleSelectMessage = (msg) => {
    setSelectedId(msg.id);
    // Automatically mark as read when opened
    if (msg.status === "Unread") {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, status: "Pending" } : m))
      );
    }
  };

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) {
      const remaining = messages.filter((m) => m.id !== id);
      if (remaining.length > 0) setSelectedId(remaining[0].id);
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setMessages((prev) =>
      prev.map((m) =>
        m.id === activeMessage.id ? { ...m, status: "Replied" } : m
      )
    );
    setReplyText("");
    alert(`Reply sent successfully to ${activeMessage.email}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Top Header & Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Customer Contact Messages
            </h1>
            <p className="text-sm text-gray-500">
              Manage inquiries submitted through your web contact form.
            </p>
          </div>

          <div className="flex gap-2 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {messages.filter((m) => m.status === "Unread").length} Unread
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              {messages.filter((m) => m.status === "Pending").length} Pending
            </span>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start h-[calc(100vh-220px)] min-h-[600px]">
          
          {/* Left Panel: Message List (4 Columns) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-100 space-y-3 bg-gray-50/50">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search sender, email, or subject..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1">
                {["All", "Unread", "Pending", "Replied"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      filter === tab
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200/60"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries List */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-gray-400 space-y-2">
                  <Mail className="w-8 h-8 mx-auto stroke-1" />
                  <p className="text-xs">No messages found</p>
                </div>
              ) : (
                filteredMessages.map((msg) => {
                  const isSelected = activeMessage?.id === msg.id;
                  return (
                    <div
                      key={msg.id}
                      onClick={() => handleSelectMessage(msg)}
                      className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                        isSelected
                          ? "bg-emerald-50/50 border-l-4 border-emerald-600"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span
                          className={`font-semibold text-xs truncate ${
                            msg.status === "Unread"
                              ? "text-gray-900 font-bold"
                              : "text-gray-700"
                          }`}
                        >
                          {msg.name}
                        </span>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">
                          {new Date(msg.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <h4
                        className={`text-xs mb-1 truncate ${
                          msg.status === "Unread"
                            ? "font-bold text-gray-900"
                            : "text-gray-600 font-medium"
                        }`}
                      >
                        {msg.subject}
                      </h4>

                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                        {msg.message}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            msg.status === "Unread"
                              ? "bg-emerald-100 text-emerald-800"
                              : msg.status === "Replied"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {msg.status}
                        </span>

                        {msg.priority === "High" && (
                          <span className="text-[10px] font-semibold text-red-600 flex items-center gap-1">
                            <AlertCircle size={10} /> Urgent
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Detailed View & Reply (7 Columns) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
            {activeMessage ? (
              <>
                {/* Header Action Bar */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={14} />
                    <span>
                      Received{" "}
                      {new Date(activeMessage.date).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(activeMessage.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Inquiry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Message Body Content */}
                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                  {/* Sender Profile Header */}
                  <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                        {activeMessage.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-900 text-sm">
                          {activeMessage.name}
                        </h2>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail size={12} /> {activeMessage.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone size={12} /> {activeMessage.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {activeMessage.subject}
                    </h3>
                  </div>

                  {/* Full Message Text */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                    {activeMessage.message}
                  </div>
                </div>

                {/* Quick Reply Form */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/30">
                  <form onSubmit={handleSendReply} className="space-y-3">
                    <label className="text-xs font-semibold text-gray-700 block">
                      Quick Response to {activeMessage.name}
                    </label>
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your response here..."
                      className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white resize-none"
                    ></textarea>

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[11px] text-gray-400">
                        Will be emailed directly to {activeMessage.email}
                      </span>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Send size={13} /> Send Reply
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-400 space-y-2">
                <MailOpen className="w-12 h-12 stroke-1" />
                <p className="text-xs">Select a message from the list to view details</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}