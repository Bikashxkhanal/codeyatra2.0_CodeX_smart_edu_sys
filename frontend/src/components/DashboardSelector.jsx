import { useSelector } from "react-redux";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";

const DashboardSelector = () => {
  // Pulling 'user' and 'isLoading' (or 'loading') from your auth slice
  const { user, isLoading } = useSelector((state) => state.auth);

  // 1. Check if we are still fetching the user data from the server
  // This prevents the switch statement from running on an empty user object
  if (isLoading === "loading" || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest animate-pulse">
          Syncing Session...
        </p>
      </div>
    );
  }

  // 2. Defensive check: If user exists but role is missing
  if (!user.role) {
    return (
      <div className="p-20 text-center">
        <div className="animate-bounce mb-4 text-indigo-600 italic">Please wait...</div>
        <h2 className="text-xl font-bold text-slate-800">Identifying Role</h2>
      </div>
    );
  }

  // 3. Strict Role Mapping
  // Using .toLowerCase() to ensure "Admin" and "admin" both work
  switch (user.role.toLowerCase()) {
    case "admin":
      return <AdminDashboard />;
    case "teacher":
    case "student":
      return <UserDashboard />;
    default:
      return (
        <div className="p-20 text-center">
          <h2 className="text-xl font-bold text-slate-800">Unrecognized Role</h2>
          <p className="text-slate-500">The role "{user.role}" does not have a dashboard assigned.</p>
        </div>
      );
  }
};

export default DashboardSelector;