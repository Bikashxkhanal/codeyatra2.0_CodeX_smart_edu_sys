import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import { useSelector } from "react-redux";

const DashboardSelector = () => {
  const { user } = useSelector((state) => state.auth);

  switch (user?.role) {
    case "admin":
      return <AdminDashboard />;
    case "teacher":
    case "student":
      return <UserDashboard />;
    default:
      return <div className="p-20 text-center">Identifying Role...</div>;
  }
};

export default DashboardSelector;