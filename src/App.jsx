function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") {
      return;
    }

    setTasks([...tasks, task]);

    setTask("");
  }

  return (
    <div>
      <h1>📝 My Todo App</h1>

      <p>The way to get started is to quit talking and begin doing⭐</p>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)} 
        />

        <button onClick={addTask}>Add</button>
      </div>

      <h2>📋 Tasks</h2>

      <ul>
        {tasks.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;