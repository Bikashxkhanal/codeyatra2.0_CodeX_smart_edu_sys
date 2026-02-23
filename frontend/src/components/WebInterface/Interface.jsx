import React from "react";
import { Link } from "react-router-dom";

const EntryPage = () => {
  const features = [
    {
      title: "Raise Queries",
      description: "Ask questions anytime, get answers from peers or teachers.",
      icon: "https://img.icons8.com/color/96/query.png",
    },
    {
      title: "Collaborate",
      description: "Work on projects or assignments together with your classmates.",
      icon: "https://img.icons8.com/color/96/collaboration.png",
    },
    {
      title: "Guidance",
      description: "Teachers can provide guidance and support to students anytime.",
      icon: "https://img.icons8.com/color/96/teacher.png",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-indigo-100">
        <div className="text-3xl font-black tracking-tight text-indigo-700">
          Collab<span className="text-sky-500">Ed</span>
        </div>
        <Link 
          to="/login" 
          className="px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300"
        >
          Login
        </Link>
      </header>

      {/* Modern Split Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="container mx-auto px-8 lg:flex items-center gap-12">
          
          {/* Left Side: Content */}
          <div className="lg:w-1/2 text-left space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-1.5 mb-2 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full">
              Education Redefined
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-slate-900">
              Collaborate. <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                Learn. Solve.
              </span>
            </h1>
            <p className="max-w-xl text-lg lg:text-xl text-gray-600 leading-relaxed">
              Empowering students and teachers to bridge the gap through real-time 
              collaboration. Solve queries, share knowledge, and grow together in a 
              unified digital classroom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all">
                Get Started Free
              </button>
              <button className="px-10 py-4 bg-white text-indigo-700 font-bold rounded-xl border-2 border-indigo-50 hover:bg-indigo-50 transition-all">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Side: Image/Visual */}
          <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
                alt="Students collaborating" 
                className="rounded-3xl shadow-2xl transition duration-500 group-hover:scale-[1.02]"
              />
              {/* Floating Badge Example */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-indigo-50">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold">✓</div>
                <div>
                  <div className="text-sm font-bold text-slate-800">10k+ Users</div>
                  <div className="text-xs text-gray-500">Active Daily</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose CollabEd?</h2>
          <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-10 w-full md:w-80 text-left border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="bg-indigo-50 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <img src={feature.icon} alt={feature.title} className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center py-10">
        <p className="text-sm">© 2026 CollabEd. Built for the future of education.</p>
      </footer>
    </div>
  );
};

export default EntryPage;