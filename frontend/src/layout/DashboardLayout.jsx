import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar";
import { Menu, X } from "lucide-react";
import useFetch from "../hooks/useFetch.js";
import { verifyAuth } from "../api/auth.api.js";
import { useDispatch } from "react-redux";
import { setCredintials } from "../Stores/authSlice.js";
import { useEffect } from "react";


const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // ... (keeping your hooks/logic)

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop/Mobile Container */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-indigo-50 shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0 w-64
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Unified Navbar Container */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-indigo-50">
          <div className="flex items-center px-4 md:px-8">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 mr-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Navbar />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto w-full animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;