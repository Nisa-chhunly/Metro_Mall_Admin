import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { 
  Pencil, Trash2, ShieldCheck, Shield, User, Plus, X 
} from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Alex Donovan",
    email: "alex@metromall.com",
    username: "alex_donovan",
    role: "Super Admin",
    permissions: ["All permissions"],
    status: "Active",
    lastLogin: "Jul 20, 2026 · 9:14 AM",
    avatarBg: "bg-emerald-100 text-emerald-700",
    initials: "AD",
  },
  {
    id: 2,
    name: "Sarah Thompson",
    email: "sarah.t@metromall.com",
    username: "sarah_mgr",
    role: "Manager",
    permissions: ["Products", "Orders", "Customers", "Reports"],
    status: "Active",
    lastLogin: "Jul 19, 2026 · 4:30 PM",
    avatarBg: "bg-blue-100 text-blue-600",
    initials: "ST",
  },
  {
    id: 3,
    name: "Mike Reynolds",
    email: "mike.r@metromall.com",
    username: "mike_staff",
    role: "Staff",
    permissions: ["Orders", "Customers", "Messages"],
    status: "Active",
    lastLogin: "Jul 18, 2026 · 11:20 AM",
    avatarBg: "bg-purple-100 text-purple-600",
    initials: "MR",
  },
  {
    id: 4,
    name: "Jennifer Park",
    email: "jennifer.p@metromall.com",
    username: "jennifer_mgr",
    role: "Manager",
    permissions: ["Products", "Orders", "CMS", "Reviews", "Stock"],
    status: "Active",
    lastLogin: "Jul 20, 2026 · 8:55 AM",
    avatarBg: "bg-amber-100 text-amber-700",
    initials: "JP",
  },
  {
    id: 5,
    name: "Dev Account",
    email: "dev@metromall.com",
    username: "dev_admin",
    role: "Staff",
    permissions: ["Products", "Gallery"],
    status: "Inactive",
    lastLogin: "Jun 15, 2026 · 2:10 PM",
    avatarBg: "bg-rose-100 text-rose-600",
    initials: "DA",
  },
];

const availablePermissions = [
  "Products", "Orders", "Customers",
  "Reviews", "Promotions", "Cms",
  "Stock", "Messages", "Gallery",
  "Settings", "Reports"
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    role: "Staff",
    status: "Active",
    permissions: [],
  });

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      permissions: user.permissions.includes("All permissions") 
        ? [...availablePermissions] 
        : [...user.permissions],
    });
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setFormData({
      name: "",
      username: "",
      email: "",
      role: "Staff",
      status: "Active",
      permissions: ["Products"],
    });
    setIsModalOpen(true);
  };

  const togglePermission = (perm) => {
    setFormData((prev) => {
      const exists = prev.permissions.includes(perm);
      if (exists) {
        return { ...prev, permissions: prev.permissions.filter((p) => p !== perm) };
      } else {
        return { ...prev, permissions: [...prev.permissions, perm] };
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Automatically set Super Admin permissions
    const finalPermissions = formData.role === "Super Admin" 
      ? ["All permissions"] 
      : formData.permissions;

    if (currentUser) {
      setUsers(users.map((u) => u.id === currentUser.id ? { ...u, ...formData, permissions: finalPermissions } : u));
      showSuccessAlert("User updated successfully!");
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        permissions: finalPermissions,
        lastLogin: "Never",
        avatarBg: "bg-emerald-100 text-emerald-700",
        initials: formData.name ? formData.name.substring(0, 2).toUpperCase() : "AU",
      };
      setUsers([...users, newUser]);
      showSuccessAlert("New user created successfully!");
    }
    setIsModalOpen(false);
  };

  const showSuccessAlert = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
      showSuccessAlert("User deleted successfully!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-slate-50/50 min-h-screen text-slate-700">
        
        {successMessage && (
          <div className="mb-6 w-full bg-emerald-50 border border-emerald-200 text-[#00a86b] font-semibold text-xs py-3 px-4 rounded-xl text-center transition-all animate-in fade-in duration-200">
            {successMessage}
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Users</h1>
            <p className="text-xs text-slate-400 mt-0.5">{users.length} admin accounts</p>
          </div>
          <button
            onClick={handleAddUser}
            className="bg-[#00a86b] hover:bg-[#008f5b] text-white px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" /> Add Admin User
          </button>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {users.filter(u => u.role === "Super Admin").length}
              </div>
              <div className="text-xs font-bold text-purple-600">Super Admin</div>
              <div className="text-[11px] text-slate-400">Full system access</div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {users.filter(u => u.role === "Manager").length}
              </div>
              <div className="text-xs font-bold text-blue-600">Manager</div>
              <div className="text-[11px] text-slate-400">Department management</div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {users.filter(u => u.role === "Staff").length}
              </div>
              <div className="text-xs font-bold text-slate-700">Staff</div>
              <div className="text-[11px] text-slate-400">Limited access</div>
            </div>
          </div>
        </div>

        {/* User Table Card */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">USER</th>
                  <th className="py-4 px-6">USERNAME</th>
                  <th className="py-4 px-6">ROLE</th>
                  <th className="py-4 px-6">PERMISSIONS</th>
                  <th className="py-4 px-6">STATUS</th>
                  <th className="py-4 px-6">LAST LOGIN</th>
                  <th className="py-4 px-6 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {users.map((user) => {
                  const displayPerms = user.permissions.slice(0, 3);
                  const extraCount = user.permissions.length - 3;

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition">
                      {/* User Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${user.avatarBg} font-bold text-xs flex items-center justify-center`}>
                            {user.initials}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{user.name}</div>
                            <div className="text-[11px] text-slate-400">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Username */}
                      <td className="py-4 px-6 text-slate-500 font-medium">
                        @{user.username}
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          user.role === "Super Admin"
                            ? "bg-purple-100/70 text-purple-700"
                            : user.role === "Manager"
                            ? "bg-blue-100/70 text-blue-700"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {user.role === "Super Admin" && <ShieldCheck className="w-3 h-3" />}
                          {user.role === "Manager" && <Shield className="w-3 h-3" />}
                          {user.role === "Staff" && <User className="w-3 h-3" />}
                          {user.role}
                        </span>
                      </td>

                      {/* Permissions */}
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {user.permissions.includes("All permissions") ? (
                            <span className="text-purple-600 font-bold text-xs">All permissions</span>
                          ) : (
                            <>
                              {displayPerms.map((perm, i) => (
                                <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-medium">
                                  {perm.toLowerCase()}
                                </span>
                              ))}
                              {extraCount > 0 && (
                                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[11px] font-bold">
                                  +{extraCount}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          user.status === "Active"
                            ? "bg-emerald-100/80 text-emerald-700"
                            : "bg-rose-100/80 text-rose-600"
                        }`}>
                          {user.status}
                        </span>
                      </td>

                      {/* Last Login */}
                      <td className="py-4 px-6 text-slate-400 text-[11px]">
                        {user.lastLogin}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-blue-600 rounded-lg transition"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          {user.role !== "Super Admin" && (
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="p-1.5 hover:bg-rose-50 text-rose-400 hover:text-rose-600 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* EDIT / ADD MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              
              {/* Modal Header */}
              <div className="p-6 pb-2 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900">
                  {currentUser ? "Edit User" : "Add New User"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSave} className="p-6 pt-2 space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00a86b]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Username</label>
                    <input
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00a86b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00a86b]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:border-[#00a86b]"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:border-[#00a86b]"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Permissions</label>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                    {availablePermissions.map((perm) => {
                      const isChecked = formData.permissions.includes(perm);
                      return (
                        <div
                          key={perm}
                          onClick={() => togglePermission(perm)}
                          className={`cursor-pointer border rounded-xl p-2.5 flex items-center gap-2 transition ${
                            isChecked
                              ? "border-[#00a86b] bg-emerald-50/50 text-[#00a86b]"
                              : "border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-100/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="w-3.5 h-3.5 accent-[#00a86b] rounded cursor-pointer"
                          />
                          <span className="text-xs font-medium">{perm}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#00a86b] hover:bg-[#008f5b] text-white rounded-xl text-xs font-semibold shadow-sm transition"
                  >
                    Save User
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;