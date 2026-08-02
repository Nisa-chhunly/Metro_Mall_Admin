import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import FooterSettings from "../pages/CMS/FooterSettings";
import HeaderHero from "../pages/CMS/HeaderHero";
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
const AppRouter=()=> {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cms/footer" element={<FooterSettings />} />
                <Route path="/cms/header" element={<HeaderHero />} />
                <Route path="/cms/about" element={<About />} />
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
        </BrowserRouter>
    );}

export default AppRouter
