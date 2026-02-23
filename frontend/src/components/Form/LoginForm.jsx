import { useState } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import FormCard from "../FormCard/FormCard";
import useMutate from "../../hooks/useMutate";
import { login } from "../../api/auth.api";
import { useNavigate, Link } from "react-router-dom";
import { setCredintials } from "../../Stores/authSlice";
import { useDispatch } from "react-redux";

export default function LoginFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutate(login, {
    onSuccess: (data) => {
      dispatch(setCredintials(data?.data));
      navigate("/dashboard");
    },
    onError: (data) => {
      setErrors(data);
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4">
      {/* Background Aesthetic Blobs (Matching EntryPage) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <FormCard className="relative w-full max-w-md p-8 md:p-12 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white">
        {/* Logo/Brand Name */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-black tracking-tight text-indigo-700">
            Collab<span className="text-sky-500">Ed</span>
          </Link>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-6">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Please enter your details to sign in.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors && (
            <div className="text-red-600 text-xs font-medium bg-red-50 border border-red-100 p-4 rounded-xl animate-shake">
              {errors?.message || "Invalid credentials, please try again."}
            </div>
          )}

          <div className="space-y-1">
            <InputBox
              type="email"
              label="Email Address"
              name="email"
              placeholder="name@university.edu"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 rounded-xl py-3.5 transition-all outline-none"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <a href="#" className="text-xs font-bold text-indigo-600 hover:text-sky-500">Forgot?</a>
            </div>
            <InputBox
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-white border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 rounded-xl py-3.5 transition-all outline-none"
            />
          </div>

          <Button
            type="submit"
            disabled={mutation.isLoading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-xl shadow-indigo-100 transition-all duration-300 transform 
              ${mutation.isLoading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95'
              }`}
          >
            {mutation.isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

       
      
      </FormCard>
    </div>
  );
}