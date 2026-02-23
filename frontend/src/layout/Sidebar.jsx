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

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full p-6">
      <div className="text-2xl font-black tracking-tight text-indigo-700 mb-10 px-2">
        Collab<span className="text-sky-500">Ed</span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Optional: Simple footer in sidebar */}
      <div className="pt-6 border-t border-slate-100">
        <p className="text-xs text-slate-400 font-medium px-2 italic">v1.0.2 Platform</p>
      </div>
    </div>
  );
};
export default Sidebar; 