import React from "react";
import { MessageSquare, Clock, User, ChevronRight } from "lucide-react";

const QueryCard = ({ query }) => {
  const { title, discription, createdAt, owner } = query;

  // Format date nicely (e.g., Oct 24, 2023)
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 p-7 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden">
      
      {/* Decorative Gradient Bar on Hover */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex flex-col h-full">
        {/* Header: Author & Date */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <User size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-800 leading-tight">
                {owner?.fullName || "Anonymous"}
              </h4>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                {owner?.role || "Member"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock size={14} />
            <span className="text-[10px] font-bold tracking-tighter uppercase">{formattedDate}</span>
          </div>
        </div>

        {/* Content: Title & Description */}
        <div className="flex-1 mb-6">
          <h3 className="text-xl font-extrabold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">
            {discription}
          </p>
        </div>

        {/* Footer: Action & Interactions */}
        <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5 text-slate-400">
                <MessageSquare size={16} />
                <span className="text-xs font-bold">Discuss</span>
             </div>
          </div>

          <button className="flex items-center gap-1 text-xs font-black text-indigo-600 uppercase tracking-widest group/btn">
            View Details
            <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryCard;