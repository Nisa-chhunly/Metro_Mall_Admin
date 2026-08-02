import React from "react";
import { topProducts } from "../DashboardData";

const TopProducts = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-5">
        Top Selling Products
      </h2>

      <div className="space-y-5">
        {topProducts.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>{item.sold} Sold</span>
            </div>

            <div className="bg-gray-200 h-3 rounded-full">
              <div
                className="bg-green-600 h-3 rounded-full"
                style={{ width: `${item.sold / 1.2}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;