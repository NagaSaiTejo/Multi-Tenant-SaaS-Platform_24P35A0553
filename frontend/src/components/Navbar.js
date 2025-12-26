import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: 10, background: "#222", color: "white" }}>
      <span style={{ fontWeight: "bold", marginRight: 20 }}>Multi-Tenant SaaS</span>

      <Link to="/dashboard" style={{ color: "white", marginRight: 10 }}>Dashboard</Link>
      <Link to="/projects" style={{ color: "white", marginRight: 10 }}>Projects</Link>

      {user.role === "tenant_admin" && (
        <Link to="/users" style={{ color: "white", marginRight: 10 }}>Users</Link>
      )}

      <span style={{ float: "right" }}>
        {user.email} ({user.role})
        <button onClick={handleLogout} style={{ marginLeft: 10 }}>Logout</button>
      </span>
    </div>
  );
}
