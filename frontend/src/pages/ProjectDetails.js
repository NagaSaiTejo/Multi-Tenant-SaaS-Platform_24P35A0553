import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProjectDetails() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    api.get(`/projects/${id}/tasks`).then(res => setTasks(res.data.data.tasks));
  }, [id]);

  const addTask = async () => {
    const res = await api.post(`/projects/${id}/tasks`, { title });
    setTasks([...tasks, res.data.data]);
    setTitle("");
  };

  const markDone = async (taskId) => {
    await api.patch(`/tasks/${taskId}/status`, { status: "completed" });
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: "completed" } : t));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.title} - {t.status}
            {t.status !== "completed" && (
              <button onClick={() => markDone(t.id)}>Done</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
