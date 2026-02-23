import React from "react";
import useFetch from "../hooks/useFetch.js";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import { fetchAllQueries } from "../api/stats.api.js";
import QueryCard from "../components/Card/QueryCard";
import { MessageSquare } from "lucide-react";
const QueriesPage = () => {
  const { data, isLoading } = useFetch("queries", fetchAllQueries);
    console.log(data);
    
  if (isLoading) return <div className="p-10 text-center animate-pulse">Loading Queries...</div>;
  
  console.log(data);
  

  return (
    <DashboardLayout>
    <div className="max-w-5xl mx-auto p-6">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Community <span className="text-indigo-600">Queries</span></h1>
        <p className="text-slate-500 mt-2 font-medium">Insights and discussions from the CollabEd community.</p>
      </header>

    <div className="grid gap-8 relative min-h-[400px]">
  {/* 1. The Query Cards Mapping */}
  {data?.queries?.map((query) => (
    <QueryCard key={query._id} query={query} />
  ))}

  {/* 2. Enhanced Empty State */}
  {data?.queries?.length === 0 && (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <MessageSquare size={32} className="text-indigo-600 opacity-40" />
      </div>
      <h3 className="text-xl font-black text-slate-800 tracking-tight">No Queries Found</h3>
      <p className="text-slate-400 text-sm font-medium mt-2 max-w-[280px] text-center">
        It looks like the community is quiet today. Why not be the first to ask something?
      </p>
      <button 
        onClick={() => navigate('/queries/create')}
        className="mt-8 px-6 py-3 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
      >
        Ask a Query
      </button>
    </div>
  )}
</div>
    </div>
    </DashboardLayout>
  );
};

export default QueriesPage;