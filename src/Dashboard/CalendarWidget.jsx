import React from "react";

const CalendarWidget = () => {

    const today = new Date();

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-4">

                Today's Date

            </h2>

            <div className="text-center">

                <h1 className="text-6xl font-bold text-green-600">

                    {today.getDate()}

                </h1>

                <p className="text-lg mt-2">

                    {today.toLocaleString("default",{
                        month:"long"
                    })}

                </p>

                <p className="text-gray-500">

                    {today.getFullYear()}

                </p>

            </div>

        </div>

    );

};

export default CalendarWidget;