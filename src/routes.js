import { Database } from "./database.js";
import { Task } from "./entities/task.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      const tasks = database.select("tasks");
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = new Task({ title, description });
      database.insert("tasks", task.data);

      return res.writeHead(201).end();
    },
  },
];
