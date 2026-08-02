import React from "react";
import { activities } from "../DashboardData";

const ActivityTimeline = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-5">
        Activity Timeline
      </h2>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="border-l-4 border-green-500 pl-4"
          >
            <h3 className="font-semibold">
              {activity.title}
            </h3>

            <p className="text-sm text-gray-500">
              {activity.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;