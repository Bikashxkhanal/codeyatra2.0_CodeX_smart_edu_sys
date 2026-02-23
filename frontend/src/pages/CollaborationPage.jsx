import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import { fetchAllCollaborations } from "../api/stats.api.js";
import CollaborationCard from "../components/Card/CollaborationCard";
import { Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const CollaborationPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useFetch("collaborations", fetchAllCollaborations);
    console.log(data);
    
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center animate-pulse text-slate-400 font-bold uppercase tracking-widest">
          Loading Opportunities...
        </div>
      </DashboardLayout>
    );
  }

  // Adjusted to match your API response structure (data.data.collaborations)
  const collaborations = data?.collaborations || [];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-6">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Partner <span className="text-indigo-600">Network</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Explore and join active collaboration proposals.
            </p>
          </div>
          
          <Link  to='/colaboration/create'
            onClick={() => navigate('/collaboration/create')}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
          >
            New Proposal
          </Link>
        </header>

        <div className="grid gap-8 relative min-h-[400px]">
          {/* Mapping Collaboration Cards */}
          {collaborations.map((collab) => (
            <CollaborationCard key={collab._id} collaboration={collab} />
          ))}

          {/* Enhanced Empty State */}
          {collaborations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
              <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mb-6">
                <Handshake size={32} className="text-sky-500 opacity-40" />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">No Active Proposals</h3>
              <p className="text-slate-400 text-sm font-medium mt-2 max-w-[320px] text-center">
                Looking for partners? Start a new collaboration request to connect with the community.
              </p>
              <button 
                onClick={() => navigate('/collaboration/create')}
                className="mt-8 px-8 py-3.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
              >
                Launch Proposal
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CollaborationPage;