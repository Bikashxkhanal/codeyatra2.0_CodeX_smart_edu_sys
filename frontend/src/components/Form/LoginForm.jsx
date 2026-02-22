import { useState } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import FormCard from "../FormCard/FormCard";
import useMutate from "../../hooks/useMutate";
import { login } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { setCredintials } from "../../Stores/authSlice";

export default function LoginFormPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutate(login, {
    onSuccess: (data) => {
      setCredintials(data);
      navigate("/web/dashboard");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
      <FormCard className="w-full sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-10 sm:p-12 md:p-16 bg-white rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-10 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {errors && (
            <p className="text-red-600 text-sm bg-red-100 p-3 rounded">
              {errors?.message}
            </p>
          )}

          <InputBox
            type="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-gray-300 focus:ring-green-800 focus:border-green-800 rounded-lg py-3 px-4"
          />

          <InputBox
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border-gray-300 focus:ring-green-800 focus:border-green-800 rounded-lg py-3 px-4"
          />

          <Button
            type="submit"
            variant="login"
            className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-4 rounded-xl shadow-lg transition text-lg"
          >
            Login
          </Button>
        </form>
      </FormCard>
    </div>
  );
}