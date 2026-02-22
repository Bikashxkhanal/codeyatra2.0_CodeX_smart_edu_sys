import { useState } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import FormCard from "../FormCard/FormCard";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <FormCard title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputBox
          type="email"
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <InputBox
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="login">
          Login
        </Button>
      </form>
    </FormCard>
  );
}