import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { StatCard , FeedCard} from "../components/index.js";
import { PlusCircle, MessageSquare, Users } from "lucide-react";
import { mockFeed } from "../data/mockData";

const UserDashboard = () => {
  return (
    <DashboardLayout>
      {/* Welcome Header & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Student <span className="text-indigo-600">Feed</span>
          </h1>
          <p className="text-slate-500 font-medium">Explore queries and collaborate with peers.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-indigo-100 text-indigo-600 px-5 py-3 rounded-2xl font-bold shadow-sm hover:bg-indigo-50 transition-all active:scale-95">
            <PlusCircle size={20} />
            New Query
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
            <Users size={20} />
            Start Collaboration
          </button>
        </div>
      </div>

      {/* User Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-[2rem] border border-indigo-50 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">My Queries</p>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-black text-slate-900">12</h3>
            <span className="text-indigo-500 font-bold text-sm mb-1 pb-1">Active</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-[2rem] border border-indigo-50 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Collaborations</p>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-black text-slate-900">05</h3>
            <span className="text-sky-500 font-bold text-sm mb-1 pb-1">Joined</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-indigo-50 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Pending</p>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-black text-slate-900">03</h3>
            <span className="text-rose-500 font-bold text-sm mb-1 pb-1">Responses</span>
          </div>
        </div>
      </div>

      {/* Feed Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-2">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Recent Activity</h2>
          <div className="h-px flex-1 bg-slate-100"></div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {mockFeed.map((item) => (
            <div key={item.id} className="group relative bg-white p-6 rounded-[2.5rem] border border-indigo-50 shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300">
              {/* This wraps your FeedCard and adds the necessary interactivity for the user dashboard */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <FeedCard item={item} />
                </div>
                
                {/* User Interactivity Buttons */}
                <div className="flex items-center gap-2 shrink-0 md:pl-6">
                  {item.type === 'query' ? (
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-sky-50 text-sky-600 px-6 py-3 rounded-2xl font-bold hover:bg-sky-100 transition-colors">
                      <MessageSquare size={18} />
                      Post Response
                    </button>
                  ) : (
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 shadow-md transition-all active:scale-95">
                      <Users size={18} />
                      Collaborate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;