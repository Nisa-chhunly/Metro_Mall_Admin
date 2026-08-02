import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import DashboardLayout from "../layout/DashboardLayout";
export default function Categories() {
  // 1. ព័ត៌មានដើម Categories
  const [categories, setCategories] = useState([
    { id: 1, name: "Footwear", slug: "/footwear", count: 124, status: "Active", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80" },
    { id: 2, name: "Electronics", slug: "/electronics", count: 387, status: "Active", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80" },
    { id: 3, name: "Apparel", slug: "/apparel", count: 296, status: "Active", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&auto=format&fit=crop&q=80" },
    { id: 4, name: "Home Appliances", slug: "/home-appliances", count: 98, status: "Active", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80" },
    { id: 5, name: "Beauty & Personal Care", slug: "/beauty", count: 143, status: "Active", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80" },
    { id: 6, name: "Sports & Outdoors", slug: "/sports-outdoors", count: 211, status: "Active", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80" },
    { id: 7, name: "Jewelry & Accessories", slug: "/jewelry", count: 85, status: "Active", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop&q=80" },
    { id: 8, name: "Toys & Hobbies", slug: "/toys", count: 172, status: "Active", image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&auto=format&fit=crop&q=80" },
  ]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Form Input States
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    count: "",
    image: "",
  });

  // បើក Modal សម្រាប់ Add
  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", slug: "", count: "", image: "" });
    setIsModalOpen(true);
  };

  // បើក Modal សម្រាប់ Edit
  const handleOpenEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      count: category.count,
      image: category.image,
    });
    setIsModalOpen(true);
  };

  // លុប Category
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((item) => item.id !== id));
    }
  };

  // រក្សាទុកទិន្នន័យ Add/Edit
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingCategory) {
      // កែប្រែ Category ចាស់
      setCategories(
        categories.map((item) =>
          item.id === editingCategory.id
            ? { ...item, ...formData, count: Number(formData.count) || 0 }
            : item
        )
      );
    } else {
      // បន្ថែម Category ថ្មី
      const newCategory = {
        id: Date.now(),
        name: formData.name,
        slug: formData.slug || `/${formData.name.toLowerCase().replace(/\s+/g, "-")}`,
        count: Number(formData.count) || 0,
        status: "Active",
        image:
          formData.image ||
          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&auto=format&fit=crop&q=80",
      };
      setCategories([newCategory, ...categories]);
    }

    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Categories</h1>
          <p className="text-xs text-slate-500">{categories.length} total categories</p>
        </div>
        
        {/* ប៊ូតុង Add Category */}
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#00c58a] hover:bg-[#00b07b] text-white rounded-lg text-xs font-semibold transition shadow-sm"
        >
          <FaPlus className="text-[10px]" /> Add Category
        </button>
      </div>

      {/* Grid Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Image Header */}
            <div className="relative h-28 w-full overflow-hidden bg-slate-100">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-100/90 backdrop-blur-sm text-emerald-700 font-semibold text-[10px] rounded-full">
                {category.status}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-3 space-y-2">
              <div>
                <h3 className="text-sm font-bold text-slate-800 truncate">{category.name}</h3>
                <p className="text-xs text-slate-400 font-medium">{category.slug}</p>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  <span className="font-bold text-slate-900">{category.count}</span> products
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleOpenEditModal(category)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1 border border-slate-200 hover:bg-slate-50 text-blue-500 rounded-lg text-xs font-medium transition"
                >
                  <FaEdit className="text-[10px]" /> Edit
                </button>

                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup (ដូចរូបភាព ១០០%) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-5 animate-in fade-in zoom-in duration-150">
            {/* Modal Title & Close Icon */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-[#1e293b]">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm p-1 transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Footwear"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Slug URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. /footwear"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Product Count
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.count}
                  onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
                />
              </div>

              {/* Action Buttons (Cancel / Create Category) */}
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
                  {editingCategory ? "Save Changes" : "Create Category"}
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