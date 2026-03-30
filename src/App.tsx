import React, { useState, useMemo } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types";
import styles from "./App.module.css";

const App: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<"All" | Task["status"]>("All");


  const filteredTasks = useMemo(() => {
    if (filter === "All") return tasks;
    return tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);


  const counters = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.status]++;
        return acc;
      },
      { Todo: 0, "In Progress": 0, Done: 0 }
    );
  }, [tasks]);

  return (
    <div className={styles.mainContainer}>
      <div>
      <h1 className={styles.title}>Realtime Todo Board</h1>


      <TaskForm onAdd={addTask} />


      <div style={{ marginBottom: "10px" }}>
        <strong>Todo:</strong> {counters.Todo} &nbsp;
        <strong>In Progress:</strong> {counters["In Progress"]} &nbsp;
        <strong>Done:</strong> {counters.Done}
      </div>


      <div style={{ marginBottom: "20px" }}>
        {(["All", "Todo", "In Progress", "Done"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`${styles.filterButton} ${
              filter === f ? styles.activeFilter : ""
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} />
            </div>
    </div>
  );
};

export default App;