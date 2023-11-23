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
      if (!title || !description) return res.writeHead(400).end();

      const task = new Task({ title, description });
      database.insert("tasks", task.data);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: "/tasks/:id",
    get pathRegex() {
      return buildRoutePathRegex(this.path);
    },
    handler: (req, res) => {
      const {
        params: { id },
        body: { title, description },
      } = req;

      if (!title && !description) return res.writeHead(400).end();

      try {
        const data = database.findData("tasks", id);
        if (!data) throw new Error("Resource Not Found!");

        const task = new Task(data);
        task.update({ title, description });

        database.update("tasks", task.data);
      } catch (error) {
        return res.writeHead(404).end();
      }

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: "/tasks/:id",
    get pathRegex() {
      return buildRoutePathRegex(this.path);
    },
    handler: (req, res) => {
      const { id } = req.params;

      try {
        database.delete("tasks", id);
      } catch (error) {
        return res.writeHead(404).end();
      }

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: "/tasks/:id/complete",
    get pathRegex() {
      return buildRoutePathRegex(this.path);
    },
    handler: (req, res) => {
      const { id } = req.params;

      try {
        const data = database.findData("tasks", id);
        if (!data) throw new Error("Resource Not Found!");

        const task = new Task(data);
        task.toggleCompleteStatus();

        database.update("tasks", task.data);
      } catch (error) {
        return res.writeHead(404).end();
      }

      return res.writeHead(204).end();
    },
  },
];
