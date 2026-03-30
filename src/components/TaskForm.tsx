import React, { useState } from "react";
import styles from "../App.module.css";

type TaskFormProps = {
  onAdd: (title: string) => void;
};



const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(""); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task cannot be empty!");
      return;
    }
    onAdd(title.trim());
    setTitle("");
    setError("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.taskForm}>
      <input
        type="text"
        placeholder="Add new task..."
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError("");
        }}
        className={styles.taskFormInput}
      />

      
      <button type="submit" className={styles.addButton}>
        Add Task
      </button>
     
    </form> 
    {error && <p className={styles.error}>{error}</p>}
    </div>
    
  );
};

export default TaskForm;