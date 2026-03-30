import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { ref, onValue, push, update, remove } from "firebase/database";
import type { Task } from "../types";


export const useTasks = () => {

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    
    const tasksRef = ref(db, "tasks");


    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val() || {};
      const parsed: Task[] = Object.entries(data).map(([id, value]: [string, any]) => ({
        id,
        title: value.title,
        status: value.status,
        createdAt: value.createdAt,
      }));


      parsed.sort((a, b) => b.createdAt - a.createdAt);

      setTasks(parsed);
    });

    return () => unsubscribe();
  }, []);

  const addTask = (title: string) => {
    const tasksRef = ref(db, "tasks");
    push(tasksRef, {
      title,
      status: "Todo",
      createdAt: Date.now(),
    });
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, "id">>) => {
    update(ref(db, `tasks/${id}`), updates);
  };

  const deleteTask = (id: string) => {
    remove(ref(db, `tasks/${id}`));
  };

  return { tasks, addTask, updateTask, deleteTask };
};