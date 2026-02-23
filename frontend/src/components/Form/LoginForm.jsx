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
    <div className="form-page-bg flex items-center justify-center">
      <FormCard className="form-shell w-full sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-10 sm:p-12 md:p-16">
        <h2 className="form-title mb-10 text-center md:text-5xl">
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
            className="elevated-input py-3 px-4"
          />

          <InputBox
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="elevated-input py-3 px-4"
          />

          <Button
            type="submit"
            variant="login"
            className="w-full py-4 text-lg"
          >
            Login
          </Button>
        </form>
      </FormCard>
    </div>
  );
}
