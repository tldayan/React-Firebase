import React, { useState, useMemo, useEffect } from "react";
import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types";
import styles from "./App.module.css";

const App: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<"All" | Task["status"]>("All");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

 
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
      <h1 className={styles.title}>Realtime Todo Board</h1>

      <TaskForm onAdd={addTask} />

      <div style={{ margin: "10px 45px", color: "white" }}>
        <strong>Todo:</strong> {counters.Todo} &nbsp;
        <strong>In Progress:</strong> {counters["In Progress"]} &nbsp;
        <strong>Done:</strong> {counters.Done}
      </div>

      <div className={styles.sortList}>
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


      <TaskList
        tasks={filteredTasks}
        loading={isLoading}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default App;