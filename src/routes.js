import { Database } from "./database.js";
import { Task } from "./entities/task.js";
import { buildRoutePathRegex } from "./utils/build-route-path-regex.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    get pathRegex() {
      return buildRoutePathRegex(this.path);
    },
    handler: (req, res) => {
      const { title, description } = req.query;
      const tasks = database.select("tasks", { title, description });
      return res
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: "/tasks",
    get pathRegex() {
      return buildRoutePathRegex(this.path);
    },
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = new Task({ title, description });
      database.insert("tasks", task.data);

      return res.writeHead(201).end();
    },
  },
];
