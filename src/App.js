import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (savedTasks) {
    setTasks(savedTasks);
  }
}, []);

  // Add or Update Task
  const handleAdd = () => {
    if (!input.trim()) return;

    if (editId !== null) {
      setTasks(tasks.map(task =>
        task.id === editId ? { ...task, text: input } : task
      ));
      setEditId(null);
    } else {
      setTasks([
        ...tasks,
        { id: Date.now(), text: input, completed: false }
      ]);
    }

    setInput("");
  };

  // Delete Task
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle Complete
  const handleToggle = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Edit Task
  const handleEdit = (task) => {
    setInput(task.text);
    setEditId(task.id);
  };

  return (
    <div className="container">
      <h2>Todo List</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
            />

            <span className={task.completed ? "completed" : ""}>
              {task.text}
            </span>

            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;