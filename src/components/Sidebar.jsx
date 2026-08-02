import React, { useState } from "react";
import { NavLink } from "react-router-dom";

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
} from "react-icons/fa";

import { hasPermission } from "../utils/permission";


const Sidebar = () => {

  const [openCMS, setOpenCMS] = useState(false);


  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all ${
      isActive
        ? "bg-green-500 text-white"
        : "hover:bg-green-600"
    }`;


  // permission wrapper
  const canAccess = (permission)=>{
    return hasPermission(permission);
  };


  return (
    <div className="w-72 bg-green-700 text-white min-h-screen flex flex-col">


      {/* Logo */}
      <div className="p-3 border-b border-green-600">
        <h1 className="text-3xl font-bold">
          MetroMall
        </h1>

        <p className="text-green-200 text-sm">
          Admin Panel
        </p>
      </div>



      <div className="flex-1 overflow-y-auto px-4 py-5">


        <p className="text-xs uppercase text-green-200 mb-2">
          Main
        </p>


        <NavLink 
          to="/dashboard" 
          className={menuClass}
        >
          <FaHome/>
          Dashboard
        </NavLink>



        {/* PRODUCT */}
        {(canAccess("Products") ||
          canAccess("Stock") ||
          canAccess("Promotions")) && (

        <>
        <p className="text-xs uppercase text-green-200 mt-6 mb-2">
          Product Management
        </p>


        {canAccess("Products") && (
        <NavLink 
          to="/products" 
          className={menuClass}
        >
          <FaBoxOpen/>
          Products
        </NavLink>
        )}



        {canAccess("Categories") && (
        <NavLink 
          to="/categories" 
          className={menuClass}
        >
          <FaTags/>
          Categories
        </NavLink>
        )}



        {canAccess("Stock") && (
        <NavLink 
          to="/stock" 
          className={menuClass}
        >
          <FaWarehouse/>
          Stock
        </NavLink>
        )}



        {canAccess("Promotions") && (
        <NavLink 
          to="/promotions" 
          className={menuClass}
        >
          <FaGift/>
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
        <NavLink 
          to="/orders" 
          className={menuClass}
        >
          <FaShoppingCart/>
          Orders
        </NavLink>
        )}



        {canAccess("Customers") && (
        <NavLink 
          to="/customers" 
          className={menuClass}
        >
          <FaUsers/>
          Customers
        </NavLink>
        )}



        {canAccess("Messages") && (
        <NavLink 
          to="/messages" 
          className={menuClass}
        >
          <FaEnvelope/>
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
          onClick={()=>setOpenCMS(!openCMS)}
          className="flex justify-between items-center w-full p-3 rounded-lg hover:bg-green-600"
        >

          <span className="flex items-center gap-3">
            <FaImages/>
            CMS
          </span>

          {
          openCMS 
          ? <FaChevronUp/>
          : <FaChevronDown/>
          }

        </button>



        {openCMS && (

        <div className="ml-6 mt-2 space-y-1">


          <NavLink 
          to="/cms/header" 
          className={menuClass}
          >
            <FaWindowMaximize/>
            Header & Hero
          </NavLink>


          <NavLink 
          to="/cms/about" 
          className={menuClass}
          >
            <FaInfoCircle/>
            About
          </NavLink>


          <NavLink 
          to="/cms/contact" 
          className={menuClass}
          >
            <FaPhoneAlt/>
            Contact Us
          </NavLink>


          <NavLink 
          to="/cms/footer" 
          className={menuClass}
          >
            <FaWindowMaximize/>
            Footer Settings
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

      </div>



      {/* Logout */}
      <div className="border-t border-green-600 p-4">

        <NavLink
          to="/"
          onClick={()=>{
            localStorage.removeItem("currentUser");
          }}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 transition"
        >

          <FaSignOutAlt/>
          Logout

        </NavLink>

      </div>


    </div>
  );
};


export default Sidebar;