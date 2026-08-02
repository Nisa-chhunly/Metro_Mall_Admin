import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaDownload, FaSearch, FaTimes } from "react-icons/fa";
import DashboardLayout from "../layout/DashboardLayout";
export default function Products() {
  // 1. Initial Products Data State
  const [products, setProducts] = useState([
    { id: 1, name: "Nike Air Max 270", category: "Footwear", price: 150, stock: 84, status: "Active", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&auto=format&fit=crop&q=80" },
    { id: 2, name: "Sony WH-1000XM5", category: "Electronics", price: 380, stock: 23, status: "Active", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=80" },
    { id: 3, name: "Levi's 511 Slim Jeans", category: "Apparel", price: 79, stock: 156, status: "Active", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=100&auto=format&fit=crop&q=80" },
    { id: 4, name: "Dyson V15 Vacuum", category: "Home Appliances", price: 699, stock: 12, status: "Active", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100&auto=format&fit=crop&q=80" },
    { id: 5, name: "Adidas Ultraboost Light", category: "Footwear", price: 190, stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=100&auto=format&fit=crop&q=80" },
  ]);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Footwear",
    price: "",
    stock: "",
    image: "",
  });

  // ----------------------------------------------------
  // 📥 Export CSV Logic
  // ----------------------------------------------------
  const handleExportCSV = () => {
    if (products.length === 0) {
      alert("No data to export!");
      return;
    }

    const headers = ["ID,Name,Category,Price,Stock,Status\n"];
    const rows = products.map(
      (p) => `${p.id},"${p.name}",${p.category},$${p.price},${p.stock},${p.status}\n`
    );

    const blob = new Blob([headers, ...rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Products_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  // ----------------------------------------------------
  // ➕ Add & ✏️ Edit Logic
  // ----------------------------------------------------
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: "", category: "Footwear", price: "", stock: "", image: "" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                price: Number(formData.price) || 0,
                stock: Number(formData.stock) || 0,
              }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price) || 0,
        stock: Number(formData.stock) || 0,
        status: "Active",
        image:
          formData.image ||
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80",
      };
      setProducts([newProduct, ...products]);
    }

    setIsModalOpen(false);
  };

  // ----------------------------------------------------
  // 🔍 Filter & Search Logic
  // ----------------------------------------------------
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoriesList = ["All", "Footwear", "Electronics", "Apparel", "Home Appliances"];

  return (
    <DashboardLayout>
    <div className="space-y-4">
      {/* Top Header Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Products</h1>
          <p className="text-xs text-slate-500">{products.length} total products</p>
        </div>

        {/* Action Buttons (Export CSV + Add Product) */}
        <div className="flex items-center gap-2">
          {/* 1. Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition shadow-sm"
          >
            <FaDownload className="text-[10px] text-slate-500" /> Export CSV
          </button>

          {/* 2. Add Product Button */}
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#00c58a] hover:bg-[#00b07b] text-white rounded-lg text-xs font-semibold transition shadow-sm"
          >
            <FaPlus className="text-[10px]" /> Add Product
          </button>
        </div>
      </div>

      {/* Search Bar & Category Filters Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700 bg-slate-50/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#00c58a] text-white font-semibold"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-3.5 w-10">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>
                <th className="p-3.5">Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Stock</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5">
                      <input type="checkbox" className="rounded border-slate-300" />
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-9 h-9 rounded-lg object-cover border border-slate-200 bg-slate-100"
                        />
                        <span className="font-bold text-slate-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-500 font-medium">{product.category}</td>
                    <td className="p-3.5 font-bold text-slate-800">${product.price}</td>
                    <td className="p-3.5 text-slate-600 font-medium">{product.stock}</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 bg-emerald-100/80 text-emerald-700 font-semibold text-[10px] rounded-full">
                        {product.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-600 font-medium text-xs"
                        >
                          <FaEdit className="text-[10px]" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium text-xs"
                        >
                          <FaTrash className="text-[10px]" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400 font-medium">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-800">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nike Air Max"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700 bg-white"
                >
                  <option value="Footwear">Footwear</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Home Appliances">Home Appliances</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Stock</label>
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 text-xs font-semibold border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-semibold bg-[#00c58a] hover:bg-[#00b07b] text-white rounded-lg transition"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  );
}