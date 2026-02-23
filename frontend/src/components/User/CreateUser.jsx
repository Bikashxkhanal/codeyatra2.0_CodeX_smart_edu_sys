import React, { useState, useEffect } from "react";
import useMutate from "../../hooks/useMutate";
import { createUser } from "../../api/auth.api";
import DashboardLayout from "../../layout/DashboardLayout";


const UserCreationForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "student",
    password: "",
    username: "",
    usernameEdited: false,
  });

  const [errors, setErrors] = useState({});

  // Generate username from fullName
  useEffect(() => {
    if (form.fullName && !form.usernameEdited) {
      const generated = form.fullName
        .toLowerCase()
        .replace(/\s+/g, ".")
        .replace(/[^a-z0-9.]/g, "");
      setForm((prev) => ({ ...prev, username: generated }));
    }
  }, [form.fullName]);

  
  const mutation = useMutate(createUser, {
    invalidateQueries: "users", 
    onSuccess: () => {
      toast.success("User created successfully!");
      setForm({
        fullName: "",
        email: "",
        role: "User",
        password: "",
        username: "",
        usernameEdited: false,
      });
      setErrors({});
    },
    onError: (err) => {
      toast.error(err?.message || "Something went wrong!");
    },
  });

  // Client-side validation
  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email is invalid";
    if (!form.password.trim()) errs.password = "Password is required";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password))
      errs.password =
        "Password must be 8+ chars, include upper, lower, and number";
    if (!form.username.trim()) errs.username = "Username is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form); 
  };

  return (
    <DashboardLayout >
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800">Create User</h2>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
            name="fullName"
          type="text"
          value={form.fullName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, fullName: e.target.value }))
          }
          className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

     
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
        name="username"
          type="text"
          value={form.username}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              username: e.target.value,
              usernameEdited: true,
            }))
          }
          className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="john.doe"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
        name="email"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
        name="role"
          value={form.role}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, role: e.target.value }))
          }
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
        name="password"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
          className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="StrongPassword123"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {mutation.isLoading ? "Creating..." : "Create User"}
      </button>
    </form>
   </DashboardLayout>
  );
};

export default UserCreationForm;