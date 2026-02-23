import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  MessageSquare,
  Handshake,
  Bell,
  Rss,
} from "lucide-react";

const adminLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/complaints", icon: AlertTriangle, label: "Complaints" },
  { to: "/admin/feed", icon: Rss, label: "Feed" },
];

const userLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/feed", icon: Rss, label: "Feed" },
];

const Sidebar = () => {
  const currentUser = {
    fullName : "Bikash khanal", 
    role : "admin"
  }
  const location = useLocation();

  const isAdmin = currentUser?.role === "admin";
  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-md p-6">
      <h2 className="text-xl font-bold mb-8 text-blue-600">
        {isAdmin ? "Admin Panel" : "User Panel"}
      </h2>

      <nav className="space-y-2">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;

          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-100"
              }`}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;