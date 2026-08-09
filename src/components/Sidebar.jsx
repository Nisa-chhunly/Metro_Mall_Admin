import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  FaHome,
  FaBoxOpen,
  FaTags,
  FaWarehouse,
  FaGift,
  FaShoppingCart,
  FaUsers,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaImages,
  FaInfoCircle,
  FaPhoneAlt,
  FaWindowMaximize,
  FaCog,
  FaUserShield,
  FaSignOutAlt,
  FaShareAlt,
} from "react-icons/fa";

import { hasPermission } from "../utils/permission";

const Sidebar = () => {
  const location = useLocation();

  const [openCMS, setOpenCMS] = useState(false);
  const [openHero, setOpenHero] = useState(false);
  const [openFooter, setOpenFooter] = useState(false);

  // Automatically keep parent accordions open if child routes match the URL
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/cms")) {
      setOpenCMS(true);
    }

    if (path.startsWith("/cms/hero")) {
      setOpenHero(true);
    }

    if (path.startsWith("/cms/footer")) {
      setOpenFooter(true);
    }
  }, [location.pathname]);

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all ${
      isActive
        ? "bg-green-500 text-white"
        : "hover:bg-green-600"
    }`;

  const subMenuClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-lg transition-all text-sm ${
      isActive
        ? "bg-green-500 text-white"
        : "hover:bg-green-600"
    }`;

  const canAccess = (permission) => hasPermission(permission);

  return (
    <div className="w-72 bg-green-700 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-3 border-b border-green-600">
        <h1 className="text-3xl font-bold">MetroMall</h1>
        <p className="text-green-200 text-sm">Admin Panel</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* MAIN */}
        <p className="text-xs uppercase text-green-200 mb-2">Main</p>

        <NavLink to="/dashboard" className={menuClass}>
          <FaHome />
          Dashboard
        </NavLink>

        {/* PRODUCT MANAGEMENT */}
        {(canAccess("Products") ||
          canAccess("Categories") ||
          canAccess("Stock") ||
          canAccess("Promotions")) && (
          <>
            <p className="text-xs uppercase text-green-200 mt-6 mb-2">
              Product Management
            </p>

            {canAccess("Products") && (
              <NavLink to="/products" className={menuClass}>
                <FaBoxOpen />
                Products
              </NavLink>
            )}

            {canAccess("Categories") && (
              <NavLink to="/categories" className={menuClass}>
                <FaTags />
                Categories
              </NavLink>
            )}

            {canAccess("Stock") && (
              <NavLink to="/stock" className={menuClass}>
                <FaWarehouse />
                Stock
              </NavLink>
            )}

            {canAccess("Promotions") && (
              <NavLink to="/promotions" className={menuClass}>
                <FaGift />
                Promotions
              </NavLink>
            )}
          </>
        )}

        {/* TRANSACTION */}
        {(canAccess("Orders") ||
          canAccess("Customers") ||
          canAccess("Messages")) && (
          <>
            <p className="text-xs uppercase text-green-200 mt-6 mb-2">
              Transaction
            </p>

            {canAccess("Orders") && (
              <NavLink to="/orders" className={menuClass}>
                <FaShoppingCart />
                Orders
              </NavLink>
            )}

            {canAccess("Customers") && (
              <NavLink to="/customers" className={menuClass}>
                <FaUsers />
                Customers
              </NavLink>
            )}

            {canAccess("Messages") && (
              <NavLink to="/messages" className={menuClass}>
                <FaEnvelope />
                Messages
              </NavLink>
            )}
          </>
        )}

        {/* CMS */}
        {canAccess("Cms") && (
          <>
            <p className="text-xs uppercase text-green-200 mt-6 mb-2">
              Content Management
            </p>

            <button
              type="button"
              onClick={() => setOpenCMS((prev) => !prev)}
              className="flex justify-between items-center w-full p-3 rounded-lg hover:bg-green-600 transition"
            >
              <span className="flex items-center gap-3">
                <FaImages />
                CMS
              </span>

              {openCMS ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openCMS && (
              <div className="ml-4 mt-2 space-y-2">
                {/* HERO */}
                <button
                  type="button"
                  onClick={() => setOpenHero((prev) => !prev)}
                  className="flex justify-between items-center w-full p-2 rounded-lg hover:bg-green-600 transition"
                >
                  <span className="flex items-center gap-3">
                    <FaImages />
                    Hero
                  </span>

                  {openHero ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {openHero && (
                  <div className="ml-6 space-y-1">
                    <NavLink
                      to="/cms/hero/main/banner"
                      className={subMenuClass}
                    >
                      <FaWindowMaximize />
                      Main Banner
                    </NavLink>

                    <NavLink
                      to="/cms/hero/promo/banner"
                      className={subMenuClass}
                    >
                      <FaWindowMaximize />
                      Promotion Banner
                    </NavLink>
                  </div>
                )}

                {/* FOOTER SETTINGS */}
                <button
                  type="button"
                  onClick={() => setOpenFooter((prev) => !prev)}
                  className="flex justify-between items-center w-full p-2 rounded-lg hover:bg-green-600 transition"
                >
                  <span className="flex items-center gap-3">
                    <FaWindowMaximize />
                    Footer Settings
                  </span>

                  {openFooter ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {openFooter && (
                  <div className="ml-6 space-y-1">
                    <NavLink to="/cms/footer/about" className={subMenuClass}>
                      <FaInfoCircle />
                      About
                    </NavLink>

                    <NavLink to="/cms/footer/social" className={subMenuClass}>
                      <FaShareAlt />
                      Social Media Links
                    </NavLink>
                  </div>
                )}

                {/* CONTACT PAGE */}
                <NavLink to="/cms/contact" className={subMenuClass}>
                  <FaPhoneAlt />
                  Contact Us
                </NavLink>
              </div>
            )}
          </>
        )}

        {/* SYSTEM */}
        {(canAccess("Settings") || canAccess("Admin Users")) && (
          <>
            <p className="text-xs uppercase text-green-200 mt-6 mb-2">
              System
            </p>

            {canAccess("Admin Users") && (
              <NavLink to="/admin-users" className={menuClass}>
                <FaUserShield />
                Admin Users
              </NavLink>
            )}

            {canAccess("Settings") && (
              <NavLink to="/settings" className={menuClass}>
                <FaCog />
                Settings
              </NavLink>
            )}
          </>
        )}

        {/* LOGOUT */}
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 transition">
          <NavLink
            to="/"
            onClick={() => {
              localStorage.removeItem("currentUser");
            }}
            className="flex items-center gap-3 w-full"
          >
            <FaSignOutAlt />
            Logout
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;