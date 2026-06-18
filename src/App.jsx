import { useState } from "react";
import "./App.css";

const FILTERS = ["all", "active", "done"];

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  function addTask() {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput("");
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function clearCompleted() {
    setTasks(tasks.filter(t => !t.completed));
  }

  const visible = tasks.filter(t =>
    filter === "all" ? true : filter === "done" ? t.completed : !t.completed
  );

  const doneCount = tasks.filter(t => t.completed).length;
  const leftCount = tasks.length - doneCount;

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-eyebrow">workspace</span>
        <h1 className="app-title">my tasks</h1>
        <p className="app-subtitle">stay focused, ship things.</p>
      </header>

      <div className="stats">
        <div className="stat stat--left">
          <span className="stat-num">{leftCount}</span> remaining
        </div>
        <div className="stat stat--done">
          <span className="stat-num">{doneCount}</span> done
        </div>
      </div>

      <div className="add-task">
        <input
          className="add-task-input"
          type="text"
          placeholder="add a task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
        />
        <button className="add-task-btn" onClick={addTask} aria-label="add task">
          +
        </button>
      </div>

      <div className="filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-btn${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">☑</div>
          <p className="empty-label">
            {filter === "done" ? "nothing completed yet"
              : filter === "active" ? "all caught up!"
              : "no tasks yet"}
          </p>
          {filter === "all" && (
            <p className="empty-hint">type above and press enter</p>
          )}
        </div>
      ) : (
        <ul className="task-list">
          {visible.map(task => (
            <li key={task.id} className={`task-item${task.completed ? " done" : ""}`}>
              <label className="task-check">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <div className="task-check-box">
                  <svg viewBox="0 0 12 10">
                    <polyline points="1.5 5.5 4.5 8.5 10.5 1.5" />
                  </svg>
                </div>
              </label>

              <div className="task-body">
                <div className="task-text">{task.text}</div>
              </div>

              <div className="task-actions">
                <button
                  className="task-action-btn delete"
                  onClick={() => deleteTask(task.id)}
                  aria-label="delete task"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {doneCount > 0 && (
        <button className="clear-btn" onClick={clearCompleted}>
          clear {doneCount} completed
        </button>
      )}
    </div>
  );
}

export default App;