import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./AuthLayout";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      setError("Username is required!");
      return false;
    }
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

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Sign-up failed");
      }

      toast.success("Account created successfully!", {
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);

      let userFriendlyMessage = error.message;
      if (error.message.includes("Failed to fetch")) {
        userFriendlyMessage = "Network error. Please check your connection.";
      } else if (error.message.includes("Email already exists")) {
        userFriendlyMessage =
          "This email is already registered. Please use a different email.";
      }

      setError(userFriendlyMessage);
      toast.error(userFriendlyMessage, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In Clicked!");
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen p-4">
        <ToastContainer />
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaUser className="text-custom-purple mr-2" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full p-2 focus:outline-none"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="Password (min 6 chars)"
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
              {loading ? "Creating account..." : "Sign Up"}
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

          {/* Continue with Google */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition duration-300"
          >
            <FcGoogle className="text-2xl mr-3" />
            Continue with Google
          </button>

          {/* Already have an account? */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-custom-purple font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
