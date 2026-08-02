import React from "react";
import { lowStock } from "../DashboardData";
import { FaExclamationTriangle } from "react-icons/fa";

const LowStock = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-5">
        Low Stock Alert
      </h2>

      <div className="space-y-4">
        {lowStock.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-3"
          >
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="text-red-500" />

              <span>{item.name}</span>
            </div>

            <span className="text-red-500 font-semibold">
              {item.stock} Left
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStock;