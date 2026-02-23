import React from "react";
import { LogOut, UserCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Stores/authSlice";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Menu } from "lucide-react";


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch()
    dispatch(logout());
  };

  return (
    <header className="flex justify-between items-center py-4 w-full">
      {/* User info */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
          <UserCircle size={24} strokeWidth={2} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-slate-800 text-sm md:text-base">
            {user?.fullName || "Admin User"}
          </span>
          <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">
            {user?.role || "Administrator"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-white border border-red-100 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all font-bold text-sm shadow-sm active:scale-95"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
};

export default Navbar;