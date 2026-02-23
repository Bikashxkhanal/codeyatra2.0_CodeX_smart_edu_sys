import { useState } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import TextArea from "../TextArea/TextArea";
import { HelpCircle, Sparkles } from "lucide-react";

export default function QueryForm() {
  const [formData, setFormData] = useState({
    querytitle: "",
    query: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Query:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* Form Header */}
      <div className="mb-8 px-2 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <HelpCircle size={18} strokeWidth={2.5} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Community Support</span>
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Ask a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Query</span>
          </h2>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-[11px] font-bold text-slate-400 leading-tight uppercase tracking-tighter">
            Response time:<br />
            <span className="text-sky-500 text-xs">~24 Hours</span>
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-100/20 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="group transition-all">
               <InputBox
                label="Query Title"
                placeholder="e.g. How to integrate Redux with Thunk?"
                name="querytitle"
                value={formData.querytitle}
                onChange={handleChange}
                className="focus:ring-indigo-500/20"
                required
              />
              <p className="mt-2 text-[10px] text-slate-400 font-medium px-1">
                Keep it short and descriptive to get faster responses.
              </p>
            </div>

            <div className="group">
              <TextArea
                label="Detailed Description"
                placeholder="Describe your issue or question in detail..."
                name="query"
                rows={6}
                value={formData.query}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400">
                <Sparkles size={14} className="text-sky-400" />
                <span className="text-xs font-medium">Draft saved automatically</span>
            </div>
            
            <Button 
              type="submit" 
              variant="secondary"
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-indigo-200"
            >
              Post Query
            </Button>
          </div>
        </form>
      </div>

      {/* Trust Badge Footer */}
      <div className="mt-6 flex justify-center">
        <div className="px-4 py-2 bg-slate-50 rounded-full border border-slate-100 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                12 Teachers are currently online to help
            </span>
        </div>
      </div>
    </div>
  );
}