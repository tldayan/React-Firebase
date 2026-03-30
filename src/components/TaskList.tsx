import React from "react";

import TaskItem from "./TaskItem";
import type { Task } from "../types";
import styles from "../App.module.css";

type TaskListProps = {
  tasks: Task[];
  loading?: boolean; // new prop
  onUpdate: (id: string, updates: Partial<Omit<Task, "id">>) => void;
  onDelete: (id: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, loading, onUpdate, onDelete }) => {
  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );

  if (!tasks.length)
    return <p style={{ color: "white", textAlign: "center", fontSize: "1.2rem" }}>No tasks yet!</p>;

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;