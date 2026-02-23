import React from "react";
import {
  DashboardLayout,
  ComplaintCard,
  FeedCard,
  StatCard,
} from "../components/index.js";

import { mockComplaints, mockFeed } from "../data/mockData";
import useFetch from "../hooks/useFetch";
import fetchStats from "../api/stats.api";

const AdminDashboard = () => {
  const { data, isLoading, isError, error } = useFetch("stats", fetchStats);

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="text-center py-10">Loading dashboard...</div>
      </DashboardLayout>
    );

  if (isError)
    return (
      <DashboardLayout>
        <div className="text-center text-red-500 py-10">
          Error: {error.message}
        </div>
      </DashboardLayout>
    );

  // Prepare stats dynamically
  const statsData = [
    { title: "Total Users", value: data?.totalUsers || 0 },
    { title: "Collaborations", value: data?.collaborations || 0 },
    { title: "Queries", value: data?.queries || 0 },
    { title: "Complaints", value: data?.complaints || 0 },
  ];

  return (
    <DashboardLayout>
      {/* Stats Grid */}
     {/* Stats Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  {statsData.map((stat, index) => (
    <StatCard key={index} title={stat.title} value={stat.value} />
  ))}
</div>
      {/* Complaints Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Complaints</h2>
        <div className="flex flex-col gap-4">
          {mockComplaints.map((c) => (
            <ComplaintCard key={c.id} complaint={c} />
          ))}
        </div>
      </section>

      {/* Feed Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Feed</h2>
        <div className="flex flex-col gap-4">
          {mockFeed.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;