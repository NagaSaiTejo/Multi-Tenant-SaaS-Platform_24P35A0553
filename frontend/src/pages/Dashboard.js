import { useEffect, useState } from "react";
import api from "../services/api";
export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data.data));
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Your Projects</h3>
      <ul>
        {projects.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}