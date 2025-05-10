import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear auth info
    navigate("/signin"); // Redirect to sign-in
  };

  // Example user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Your Profile</h1>
      <p>
        <strong>Email:</strong> {user?.email || "Unknown"}
      </p>

      <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
        Logout
      </button>
    </div>
  );
}
