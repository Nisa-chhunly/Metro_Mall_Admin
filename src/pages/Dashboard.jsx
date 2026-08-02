import React from "react";

import DashboardLayout from "../layout/DashboardLayout";
import SalesChart from "../Dashboard/SaleChart";
import RevenueChart from "../Dashboard/RevenueChart";
import DashboardCard from "../Dashboard/DashboardCard";
import WelcomeBanner from "../Dashboard/WelcomeBanner";
import RecentOrders from "../Dashboard/RecentOrders";
import TopProducts from "../Dashboard/TopProducts";
import LowStock from "../Dashboard/LowStock";
import ActivityTimeline from "../Dashboard/ActivityTimeLine";
import CalendarWidget from "../Dashboard/CalendarWidget";
import QuickActions from "../Dashboard/QuickActions";
import {

    FaBoxOpen,
    FaShoppingCart,
    FaUsers,
    FaDollarSign

} from "react-icons/fa";

const Dashboard = () => {

    return (
<DashboardLayout>

    <WelcomeBanner />

    {/* Statistics */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard

                    title="Products"

                    value="256"

                    subtitle="+15 this week"

                    color="bg-green-600"

                    icon={<FaBoxOpen />}

                />

                <DashboardCard

                    title="Orders"

                    value="43"

                    subtitle="+8 today"

                    color="bg-blue-500"

                    icon={<FaShoppingCart />}

                />

                <DashboardCard

                    title="Customers"

                    value="120"

                    subtitle="+3 today"

                    color="bg-orange-500"

                    icon={<FaUsers />}

                />

                <DashboardCard

                    title="Revenue"

                    value="$3,500"

                    subtitle="+12%"

                    color="bg-purple-600"

                    icon={<FaDollarSign />}

                />
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        <SalesChart />
        <RevenueChart />
    </div>

    {/* Orders & Products */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        <RecentOrders />
        <TopProducts />
    </div>

    {/* Stock & Activity */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        <LowStock />
        <ActivityTimeline />
    </div>

    {/* Bottom */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8 mb-8">
        <CalendarWidget />
        <QuickActions />
    </div>

</DashboardLayout>

    );

};

export default Dashboard;