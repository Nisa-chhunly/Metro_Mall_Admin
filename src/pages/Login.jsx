import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // បញ្ជី Accounts ដែលអនុញ្ញាតឱ្យ Login
  const users = [
    { 
      username: "admin", 
      password: "1234", 
      name: "Alex Donovan", 
      role: "Super Admin",
      permissions: ["All permissions"]
    },
    { 
      username: "Manager", 
      password: "6666", 
      name: "Sarah Thompson", 
      role: "Manager",
      permissions: [
        "Products",
        "Orders",
        "Customers",
        "Reports"
      ]
    },
    { 
      username: "Staff", 
      password: "9999", 
      name: "Mike Reynolds", 
      role: "Staff",
      permissions: [
        "Orders",
        "Customers",
        "Messages"
      ]
    },
    {
      username: "Jennifer",
      password: "7777",
      name: "Jennifer Park",
      role: "Manager",
      permissions: [
        "Products",
        "Orders",
        "Cms",
        "Stock"
      ]
    },
    {
      username: "Dev",
      password: "8888",
      name: "Dev Account",
      role: "Staff",
      permissions: [
        "Products",
        "Orders",
      ]
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // 1. ពិនិត្យមើល field ទទេ (Blank checks)
    if (!trimmedUsername && !trimmedPassword) {
      setError("Please enter both Username and Password");
      return;
    }

    if (!trimmedUsername) {
      setError("Please enter your Username");
      return;
    }

    if (!trimmedPassword) {
      setError("Please enter your Password");
      return;
    }

    // 2. ស្វែងរក Username ក្នុងប្រព័ន្ធ
    const userExists = users.find(
      (u) => u.username.toLowerCase() === trimmedUsername.toLowerCase()
    );

    if (!userExists) {
      setError("Username does not exist");
      return;
    }

    // 3. ផ្ទៀងផ្ទាត់ Password
    if (userExists.password !== trimmedPassword) {
      setError("Incorrect password");
      return;
    }

    // 4. Save ព័ត៌មាន User ចូលក្នុង localStorage និង Navigate
    localStorage.setItem("currentUser", JSON.stringify(userExists));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-1">Admin Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Username</label>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <Button text="Login" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;