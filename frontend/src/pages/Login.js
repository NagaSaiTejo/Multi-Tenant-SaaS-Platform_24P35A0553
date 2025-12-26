import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantSubdomain, setTenantSubdomain] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      email: email.trim(),
      password: password.trim(),
      tenantSubdomain: tenantSubdomain.trim(),
    };

    try {
      const res = await api.post("/auth/login", payload);

      const token = res.data?.data?.token;

      if (!token) {
        throw new Error("Token not returned from backend");
      }

      login(token);                // stores token + sets user
      navigate("/dashboard");
    } catch (err) {
      console.error("LOGIN ERROR", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          placeholder="Tenant Subdomain"
          value={tenantSubdomain}
          onChange={(e) => setTenantSubdomain(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
