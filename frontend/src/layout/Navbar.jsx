import React from "react";
import { LogOut, UserCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Stores/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 shadow-md w-full gap-3 sm:gap-0">
      {/* Left: User info */}
      <div className="flex items-center gap-2">
        <UserCircle size={32} className="text-gray-500" />
        <div className="flex flex-col">
          <span className="font-medium text-gray-800 text-sm sm:text-base">
            {user?.fullName || "Admin"}
          </span>
          <span className="text-xs sm:text-sm text-gray-500">{user?.role || "Admin"}</span>
        </div>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition text-xs sm:text-sm"
      >
        <LogOut size={16} className="sm:mr-1" />
        <span className="hidden sm:inline">Logout</span> {/* Show text only on sm+ */}
      </button>
    </header>
  );
};

export default Navbar;