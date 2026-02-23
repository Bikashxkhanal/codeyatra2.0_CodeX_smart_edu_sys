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
    <div className="text-slate-900">
      <header className="glass-nav">
        <div className="brand-mark">CollabEd</div>
        <Link to="/login" className="cta-btn !px-5 !py-2.5">
          Login
        </Link>
      </header>

      <section className="hero-wrap">
        <div>
          <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
            Collaborate faster,
            <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
              {" "}learn smarter.
            </span>
          </h1>
          <p className="mb-8 max-w-2xl text-base text-slate-600 md:text-lg">
            CollabEd helps students and teachers raise requests, solve academic questions,
            and manage learning conversations in one focused workspace.
          </p>
          <Link to="/login" className="cta-btn">
            Get Started
          </Link>
        </div>

        <div className="hero-card">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Unified Learning Hub
          </p>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Ask, build, and solve together</h2>
          <p className="text-slate-600">
            Organize discussion threads, submit collaboration proposals, and get guided support
            without switching between fragmented tools.
          </p>
        </div>
      </section>

      <section className="feature-grid">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="feature-card text-center"
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
              <img src={feature.icon} alt={feature.title} className="w-10 h-10" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-900">{feature.title}</h3>
            <p className="text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
      </section>

      <footer className="mt-6 border-t border-slate-200/80 bg-white/70 py-6 text-center text-slate-600">
        <p>&copy; 2026 CollabEd. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EntryPage;
