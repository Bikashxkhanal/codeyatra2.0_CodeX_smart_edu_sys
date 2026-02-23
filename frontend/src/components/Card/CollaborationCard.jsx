import React from "react";
import { Globe, ArrowRight, User } from "lucide-react";

const CollaborationCard = ({ collaboration }) => {
  const { title, discription, createdAt, owner } = collaboration;

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-sky-50 text-sky-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Active Project
            </span>
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>

          <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-sky-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-2">
            {discription}
          </p>
        </div>

        {/* Right Side: Owner/Action */}
        <div className="md:w-56 flex flex-col justify-between border-l border-slate-50 md:pl-8">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <User size={18} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-700 leading-none">
                {owner?.fullName || "CollabEd Partner"}
              </p>
              <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase">Author</p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 hover:bg-sky-600 hover:text-white rounded-xl text-slate-600 text-[10px] font-black uppercase tracking-widest transition-all">
            Review Proposal
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaborationCard;