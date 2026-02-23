import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // 1. Import useSelector
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  MessageSquare,
  Handshake, // Changed collaboration icon for distinction
} from "lucide-react";

// 2. Define which roles can see which items
export const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "teacher", "student"], // Everyone
  },
  {
    label: "Users",
    path: "/users",
    icon: Users,
    roles: ["admin"], // ADMIN ONLY
  },
  {
    label: "Complaints",
    path: "/complaints",
    icon: AlertTriangle,
    roles: ["admin", "teacher"], // Staff only
  },
  {
    label: "Queries",
    path: "/queries",
    icon: MessageSquare,
    roles: ["admin", "teacher", "student"],
  },
  {
    label: "Collaboration",
    path: "/colaboration",
    icon: Handshake,
    roles: ["admin", "teacher", "student"],
  },
];

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  
  // 3. Get the current user from Redux
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role?.toLowerCase();

  return (
    <div className="flex flex-col h-full p-6">
      <div className="text-2xl font-black tracking-tight text-indigo-700 mb-10 px-2">
        Collab<span className="text-sky-500">Ed</span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems
          // 4. Filter the items based on the user's role
          .filter((item) => item.roles.includes(userRole))
          .map((item) => {
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

      <div className="pt-6 border-t border-slate-100">
        <p className="text-xs text-slate-400 font-medium px-2 italic uppercase tracking-widest">
           {userRole} Mode
        </p>
      </div>
    </div>
  );
};

export default Sidebar;