import React from "react";

import TaskItem from "./TaskItem";
import type { Task } from "../types";

type TaskListProps = {
  tasks: Task[];
  onUpdate: (id: string, updates: Partial<Omit<Task, "id">>) => void;
  onDelete: (id: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  if (!tasks.length) return <p>No tasks yet!</p>;

  return (
    <div>
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