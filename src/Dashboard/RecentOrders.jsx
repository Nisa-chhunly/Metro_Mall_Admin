import React from "react";
import { recentOrders } from "../DashboardData";

const RecentOrders = () => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipping":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-3">Order</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="py-4">{order.id}</td>
              <td>{order.customer}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
              <td>{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;