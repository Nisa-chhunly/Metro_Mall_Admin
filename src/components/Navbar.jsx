import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import {
  FaBell,
  FaSearch
} from "react-icons/fa";


const Navbar = () => {

 const location = useLocation();
const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem("currentUser");
  navigate("/");
};
const [openProfile, setOpenProfile] = useState(false);

  const titles = {
    "/dashboard": "Dashboard",
    "/products": "Products",
    "/categories": "Categories",
    "/stock": "Stock",
    "/promotions": "Promotions",
    "/orders": "Orders",
    "/customers": "Customers",
    "/messages": "Messages",
    "/admin-users": "Admin Users",
    "/settings": "Settings",
    "/cms/footer": "Footer Settings",
    "/cms/header": "Header & Hero",
    "/cms/about": "About",
    "/cms/contact": "Contact Us"
  };


  const [currentUser, setCurrentUser] = useState({
    name: "Admin",
    role: "Super Admin",
  });



  useEffect(() => {

    const savedUser = localStorage.getItem("currentUser");

    if(savedUser){
      setCurrentUser(JSON.parse(savedUser));
    }

  }, []);



  return (

    <div className="flex justify-between items-center px-8 py-4 bg-white border-b border-slate-100">


      {/* Page Title */}
      <div>

        <h1 className="text-3xl font-bold text-green-700">

          {titles[location.pathname] || "Dashboard"}

        </h1>


        <p className="text-gray-500 text-sm">

          MetroMall Admin Panel

        </p>

      </div>



      {/* Right Section */}
      <div className="flex items-center gap-5">


        {/* Search */}
        <div className="relative">

          <FaSearch 
            className="absolute top-3 left-3 text-gray-400"
          />


          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
          />

        </div>



        {/* Notification */}
        <FaBell
          size={22}
          className="text-gray-600 cursor-pointer"
        />



        {/* User Profile */}
        <div className="relative">

  <button
    onClick={() => setOpenProfile(!openProfile)}
    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition"
  >

    <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
      <User className="w-5 h-5" />
    </div>

    <div className="text-left hidden md:block">
      <h4 className="text-sm font-semibold text-slate-800">
        {currentUser.name}
      </h4>

      <p className="text-xs text-slate-500">
        {currentUser.role}
      </p>
    </div>

    <ChevronDown
      className={`w-4 h-4 transition ${
        openProfile ? "rotate-180" : ""
      }`}
    />

  </button>


  {openProfile && (

    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">

      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100">

        <p className="font-semibold text-slate-800">
          {currentUser.name}
        </p>

        <p className="text-xs text-slate-500">
          {currentUser.role}
        </p>

      </div>

      {/* Menu */}

      <button
        onClick={() => {
          navigate("/settings");
          setOpenProfile(false);
        }}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition text-sm"
      >
        <Settings className="w-4 h-4" />
        Settings
      </button>

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition text-sm"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>

    </div>

  )}

</div>
</div>

    </div>

  );

};


export default Navbar;