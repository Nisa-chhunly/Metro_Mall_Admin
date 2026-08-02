import React from "react";

const WelcomeBanner = () => {

    const today = new Date();

    return (

        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl text-white p-8 mb-8 shadow-lg">

            <h1 className="text-4xl font-bold">

                Welcome Back, Admin!

            </h1>

            <p className="mt-2 text-green-100">

                MetroMall Management Dashboard

            </p>

            <p className="mt-6">

                {today.toDateString()}

            </p>

        </div>

    );

};

export default WelcomeBanner;