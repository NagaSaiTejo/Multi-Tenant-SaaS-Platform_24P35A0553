import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    tenantName: "",
    subdomain: "",
    adminEmail: "",
    adminPassword: "",
    adminFullName: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register-tenant", form);
      setMsg("Tenant registered. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setMsg("Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Register Tenant</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input name="tenantName" placeholder="Company Name" onChange={handleChange} /><br />
        <input name="subdomain" placeholder="Subdomain" onChange={handleChange} /><br />
        <input name="adminFullName" placeholder="Admin Name" onChange={handleChange} /><br />
        <input name="adminEmail" placeholder="Admin Email" onChange={handleChange} /><br />
        <input name="adminPassword" type="password" placeholder="Password" onChange={handleChange} /><br />
        <button>Register</button>
      </form>
    </div>
  );
}
