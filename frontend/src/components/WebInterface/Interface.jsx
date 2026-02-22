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
    <div className="font-sans text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6 bg-gradient-to-r from-indigo-100 to-sky-100 shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-indigo-700">CollabEd</div>
        <Link to="/login" className="px-6 py-2 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-purple-500 transition">
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center py-32 px-6 bg-gradient-to-r from-indigo-500 to-sky-500 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Collaborate. Learn. Solve.
        </h1>
        <p className="max-w-2xl text-lg md:text-xl mb-8 drop-shadow-sm">
          CollabEd allows students and teachers to raise collaboration requests, answer queries,
          and work together to enhance learning and engagement.
        </p>
        <a
          href="#"
          className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-md hover:bg-purple-500 hover:text-white transition"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-indigo-100 flex flex-wrap justify-center gap-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-8 w-64 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="bg-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <img src={feature.icon} alt={feature.title} className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white text-center py-6 mt-12">
        <p>&copy; 2026 CollabEd. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EntryPage;