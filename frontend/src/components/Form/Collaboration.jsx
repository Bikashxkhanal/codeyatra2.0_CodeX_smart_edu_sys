import { useState } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import TextArea from "../TextArea/TextArea";
import { Handshake, Send, Globe } from "lucide-react";

export default function CollaborationForm() {
  const [formData, setFormData] = useState({
    collaborationtitle: "",
    proposal: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Collaboration:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 pb-20">
      {/* Header Section */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2 text-sky-600 mb-1">
          <Handshake size={20} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Partner Network</span>
        </div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          New <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Collaboration</span>
        </h2>
        <p className="text-slate-400 text-sm font-medium mt-1">
          Propose a partnership or project to the CollabEd ecosystem.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-indigo-100/30 relative overflow-hidden">
        {/* Subtle Background Detail */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-sky-50 rounded-full blur-[80px] -mr-20 -mt-20 opacity-50"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="group">
              <InputBox
                label="Collaboration Title"
                placeholder="e.g. Annual Tech Symposium 2024"
                name="collaborationtitle"
                value={formData.collaborationtitle}
                onChange={handleChange}
                required
              />
              <div className="flex items-center gap-2 mt-2 px-1">
                <Globe size={12} className="text-slate-300" />
                <span className="text-[10px] text-slate-400 font-medium">
                  This title will be visible to potential stakeholders.
                </span>
              </div>
            </div>

            <div className="group">
              <TextArea
                label="Proposal Details"
                placeholder="Outline the objectives, benefits, and timeline of your proposal..."
                name="proposal"
                rows={8}
                value={formData.proposal}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Action Area */}
          <div className="pt-6 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-slate-800">Review Process</p>
              <p className="text-[10px] text-slate-400 font-medium">Typically reviewed within 3-5 business days.</p>
            </div>

            <Button 
              type="submit" 
              variant="primary"
              className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer px-10 py-4 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-indigo-200"
            >
              <Send size={16} />
              Publish Proposal
            </Button>
          </div>
        </form>
      </div>

      {/* Support Footer */}
      <div className="mt-8 text-center">
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
          Need immediate assistance? <span className="text-indigo-600 cursor-pointer hover:underline">Contact Support</span>
        </p>
      </div>
    </div>
  );
}