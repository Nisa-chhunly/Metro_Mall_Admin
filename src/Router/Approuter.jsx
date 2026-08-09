// 1. Swap BrowserRouter out for HashRouter in your import statement
import { HashRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import MainBanner from "../pages/CMS/MainBanner";
import PromoBanner from "../pages/CMS/PromoBanner";
import About from "../pages/CMS/About";
import ContactUs from "../pages/CMS/ContactUs";
import AdminUsers from "../pages/AdminUsers";
import Settings from "../pages/Settings";
import Customers from "../pages/Customers";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Promotions from "../pages/Promotions";
import Stocks from "../pages/Stocks";
import Messages from "../pages/Messages";
import SocialLinks from "../pages/CMS/Sociallinks";

const AppRouter = () => {
    return (
        // 2. Wrap your routes inside <HashRouter> (Notice: no basename attribute is needed here!)
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cms/footer/social" element={<SocialLinks />} />
                <Route path="/cms/hero/main/banner" element={<MainBanner />} />
                <Route path="/cms/hero/promo/banner" element={<PromoBanner />} />
                <Route path="/cms/footer/about" element={<About />} />
                <Route path="/cms/contact" element={<ContactUs />} />
                <Route path="/admin-users" element={<AdminUsers />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/stock" element={<Stocks />} />
                <Route path="/messages" element={<Messages />} />
            </Routes>
        </HashRouter>
    );
}

export default AppRouter;