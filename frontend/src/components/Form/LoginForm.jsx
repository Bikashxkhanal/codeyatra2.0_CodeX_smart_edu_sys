import { useState } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import FormCard from "../FormCard/FormCard";
import useMutate from "../../hooks/useMutate";
import { login } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { setCredintials } from "../../Stores/authSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


const mutation = useMutate(login,
  
  {
      //on successful login , must route to dashboard
     onSuccess : (data) => {
      //set the data to the auth state then navigate to dashboard
        setCredintials(data);
        navigate('/web/dashboard');
      },

      //if error, error should be shown 
        onError : (data ) => {
          console.log(data);
            setErrors(data);
        }

})
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData)
    console.log("Login Data:", formData);
  };

  return (
    <FormCard title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-5">
        {errors && 
        <p className="py-2 text-red-700">{errors?.message}</p>
        }
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