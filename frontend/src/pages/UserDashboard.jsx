import DashboardLayout from "../layout/DashboardLayout";
import StatCard from "../components/StatCard";
import FeedCard from "../components/FeedCard";
import { mockFeed } from "../data/mockData";

const UserDashboard = () => {
  return (
    <DashboardLayout>
      {/* User Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard title="My Queries" value="12" />
        <StatCard title="My Collaborations" value="5" />
        <StatCard title="Pending Responses" value="3" />
      </div>

      {/* Feed Section */}
      <h2 className="text-xl font-bold mb-4">Feed</h2>
      {mockFeed.map((item) => (
        <FeedCard key={item.id} item={item} />
      ))}
    </DashboardLayout>
  );
};

export default UserDashboard;