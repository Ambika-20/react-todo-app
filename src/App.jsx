function App() {
  return (
    <div>
      <h1>📝 My Todo App</h1>

      <p>The way to get started is to quit talking and begin doing⭐</p>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
        />

        <button>Add</button>
      </div>

      <h2>📋 Tasks</h2>

      <ul>
        <li>Learn React</li>
        <li>Build Todo App</li>
      </ul>
    </div>
  );
}

export default App;