import { useState} from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/authApi";
import ErrorMessage from "./ErrorMessage";
import { IoEye, IoEyeOff } from "react-icons/io5"; 
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useAuth();

  const handleLogin = async (data) => {
    try {
      const response = await loginAPI(data);
      login(response.data.token);
      toast.success("Logged in Successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="bg-muted/25 p-6 rounded-2xl shadow-lg w-full"
    >
      <h2 className="text-xl font-bold text-primary text-center mb-6">
        Login to Xpenso
      </h2>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        })}
        className="input"
      />
      <ErrorMessage message={errors.email?.message} />

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
              message:
                "Password must contain uppercase, lowercase, number, and symbol",
            },
          })}
          className="input pr-10"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-2 flex items-center text-primary"
        >
          {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
        </button>
      </div>
      <ErrorMessage message={errors.password?.message} />

      {/* Button */}
      <button className="w-full p-3 bg-primary text-white rounded-lg hover:bg-secondary transition-all">
        Login
      </button>
    </form>
  );
};

export default Login;
