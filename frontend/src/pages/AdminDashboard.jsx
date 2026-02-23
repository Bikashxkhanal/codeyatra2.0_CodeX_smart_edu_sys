import React from "react";
import {
  DashboardLayout,
  ComplaintCard,
  FeedCard,
  NoticeCard,
  StatCard,
} from "../components/index.js";
import { useSelector } from "react-redux";

import { mockComplaints, mockFeed } from "../data/mockData";
import useFetch from "../hooks/useFetch";
import fetchStats from "../api/stats.api";

const AdminDashboard = () => {
  const { data, isLoading, isError, error } = useFetch("stats", fetchStats);
  const {user} = useSelector((state) => state.auth);

  const notice = {
    title : 'class suspended',
      description : "class for tomorrow suspended" ,
     createdAt : "2025-11-12" ,
        creator : user
  }

  console.log(user);
  
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
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  {statsData.map((stat, index) => (
    <StatCard key={index} title={stat.title} value={stat.value} />
  ))}
</div>
    <div className="w-full flex flex-col gap-3">
    <h1 className="text-4xl text-blue-600 font-bold">Notices</h1>
     <NoticeCard  notice={notice}/> 
     <NoticeCard  notice={notice}/> 
     </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;