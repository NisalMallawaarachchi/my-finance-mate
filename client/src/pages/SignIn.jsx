import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email)) {
      setError("Enter a valid email address!");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError(null);

    if (!validateForm()) return;

    dispatch(signInStart());

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Invalid email or password.");
      }

      const data = await res.json();
      dispatch(signInSuccess(data)); // Dispatch success action with user data
      toast.success("Sign-in successful!");
      setTimeout(() => navigate("/dashboard"), 2000); 
    } catch (err) {
      dispatch(signInFailure(err.message)); // Dispatch failure action with error message
      toast.error(err.message);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen p-4">
        <ToastContainer position="top-center" />
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaEnvelope className="text-custom-purple mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 focus:outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="flex items-center border-b border-gray-300 py-2 relative">
              <FaLock className="text-custom-purple mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-2 focus:outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 text-gray-500 hover:text-custom-purple transition duration-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-custom-purple-button hover:bg-custom-purple-button text-white py-2 rounded-lg font-semibold transition duration-300"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Display Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center mt-2">
                {error}
              </div>
            )}
          </form>

          {/* OR Divider */}
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <OAuth />

          {/* Don't have an account? */}
          <p className="text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-custom-purple font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
