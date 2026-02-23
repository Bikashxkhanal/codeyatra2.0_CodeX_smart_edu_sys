import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;