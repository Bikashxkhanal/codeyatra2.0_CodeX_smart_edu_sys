import React from "react";

const NoticeCard = ({ notice }) => {
  const { title, description, createdAt, creator } = notice;
  
  return (
    <div className="group relative bg-white p-6 rounded-[2rem] border border-indigo-50 shadow-sm hover:shadow-xl hover:shadow-indigo-100/30 transition-all duration-300 overflow-hidden">
      {/* Decorative Gradient Accent */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-sky-400 group-hover:w-2 transition-all"></div>

      <div className="flex flex-col h-full">
        {/* Header: Title & Date */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-xl font-black text-slate-800 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          <span className="shrink-0 px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-100">
            {new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Notice Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        {/* Footer: Creator Info */}
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar Placeholder */}
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100 uppercase">
              {creator?.fullName?.charAt(0)}
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 leading-none">
                {creator?.fullName}
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                @{creator?.username}
              </span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-tighter">
            {creator?.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;