import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Users() {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    api.get("/users").then(res => {
      setUsers(res.data.data);
    });
  }, []);

  const addUser = async () => {
    try {
      const res = await api.post("/users", {
        full_name: fullName,
        email,
        password,
        tenant_id: user.tenant_id   // 🔥 required
      });

      setUsers([...users, res.data.data]);
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("ADD USER ERROR", err.response?.data || err.message);
      alert("Failed to add user");
    }
  };

  const del = async (id) => {
    await api.delete(`/users/${id}`);
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2>Users</h2>

      <input placeholder="Full name" value={fullName} onChange={e => setFullName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={addUser}>Add User</button>

      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.full_name} ({u.email})
            <button onClick={() => del(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
