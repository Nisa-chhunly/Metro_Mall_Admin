import React from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { month: "Jan", revenue: 1500 },
    { month: "Feb", revenue: 2300 },
    { month: "Mar", revenue: 2100 },
    { month: "Apr", revenue: 3200 },
    { month: "May", revenue: 3500 },
    { month: "Jun", revenue: 4100 },
];

const RevenueChart = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">
                Revenue
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="revenue"
                        fill="#16a34a"
                        radius={[8,8,0,0]}
                    />

                </BarChart>
            </ResponsiveContainer>

        </div>
    );
};

export default RevenueChart;