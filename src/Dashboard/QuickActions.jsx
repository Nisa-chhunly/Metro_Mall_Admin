import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaShoppingCart, FaTags, FaUsers } from "react-icons/fa";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { title: "Add Product", icon: <FaBoxOpen />, path: "/products" },
    { title: "New Order", icon: <FaShoppingCart />, path: "/orders" },
    { title: "Add Category", icon: <FaTags />, path: "/categories" },
    { title: "Customers", icon: <FaUsers />, path: "/customers" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-5">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.path)}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 flex flex-col items-center justify-center transition"
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <span>{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;