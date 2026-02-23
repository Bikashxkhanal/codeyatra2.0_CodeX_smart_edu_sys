import React from "react";
import {DashboardLayout, ComplaintCard , FeedCard, StatCard} from '../components/index.js'
import { mockComplaints, mockFeed } from "../data/mockData";
import useFetch from "../hooks/useFetch";
import fetchStats from "../api/stats.api";


const AdminDashboard = () => {
 const { data, isLoading, isError, error } = useFetch("stats", fetchStats);
 console.log(error);
 

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;
//   console.log(data);
  
  return (
    <DashboardLayout>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value="250" />
        <StatCard title="Collaborations" value="34" />
        <StatCard title="Queries" value="67" />
        <StatCard title="Complaints" value="12" />

      </div>

      <h2 className="text-xl font-bold mb-4">Complaints</h2>
      {mockComplaints.map((c) => (
        <ComplaintCard key={c.id} complaint={c} />
      ))}

      <h2 className="text-xl font-bold mt-8 mb-4">Feed</h2>
      {mockFeed.map((item) => (
        <FeedCard key={item.id} item={item} />
      ))}
    </DashboardLayout>
  );
};

export default AdminDashboard;