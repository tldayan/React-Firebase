export type Task = {
  id: string;
  title: string;
  status: "Todo" | "In Progress" | "Done";
  createdAt: number;
};