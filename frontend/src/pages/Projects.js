import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Projects() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    api.get("/projects").then(res => {
      setProjects(res.data.data);
    });
  }, []);

  const add = async () => {
    try {
      const res = await api.post("/projects", {
        name,
        tenant_id: user.tenant_id    // 🔥 required
      });

      setProjects([...projects, res.data.data]);
      setName("");
    } catch (err) {
      console.error("ADD PROJECT ERROR", err.response?.data || err.message);
      alert("Failed to add project");
    }
  };

  const del = async (id) => {
    await api.delete(`/projects/${id}`);
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2>Projects</h2>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="New project" />
      <button onClick={add}>Add</button>

      <ul>
        {projects.map(p => (
          <li key={p.id}>
            {p.name}
            <button onClick={() => del(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
