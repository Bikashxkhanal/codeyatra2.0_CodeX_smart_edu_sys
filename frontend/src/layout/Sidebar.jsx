import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

export const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/users",
    icon: Users,
  },
  {
    label: "Complaints",
    path: "/complaints",
    icon: AlertTriangle,
  },
  {
    label: "Queries",
    path: "/queries",
    icon: MessageSquare,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      {/* 🖥 Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-white shadow-lg fixed left-0 top-0 p-4">
        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* 📱 Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t flex justify-around py-2 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center text-xs ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
            >
              <Icon size={22} />
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;