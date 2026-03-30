import React, { useState } from "react";
import type { Task } from "../types";
import styles from "../App.module.css";

type TaskItemProps = {
  task: Task;
  onUpdate: (id: string, updates: Partial<Omit<Task, "id">>) => void;
  onDelete: (id: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {


  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate(task.id, { status: e.target.value as Task["status"] });
  };

  const handleSubmit = () => {
    if (!editTitle.trim()) return;
    onUpdate(task.id, { title: editTitle.trim() });
    setIsEditing(false);
  };

  return (
    <div className={styles.taskItem}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className={styles.taskInput}
          />

          <button className={styles.saveButton} onClick={handleSubmit}>
            Save
          </button>

          <button
            className={styles.cancelButton}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className={styles.taskTitle}>{task.title}</span>
          <select
            value={task.status}
            onChange={handleStatusChange}
            className={styles.statusDropdown}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button className={styles.editButton} onClick={() => setIsEditing(true)}>
            Edit
          </button>
          
          <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;