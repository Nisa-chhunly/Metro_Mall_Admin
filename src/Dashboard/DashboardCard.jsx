import React from "react";

const DashboardCard = ({
    title,
    value,
    icon,
    color,
    subtitle
}) => {

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <div className="flex justify-between">

                <div>

                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>

                    <p className="text-green-600 text-sm mt-2">
                        {subtitle}
                    </p>

                </div>

                <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl`}>

                    {icon}

                </div>

            </div>

        </div>

    );

};

export default DashboardCard;