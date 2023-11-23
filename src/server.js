import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(
    (route) => route.path === url && route.method === method
  );

  if (route) {
    return route.handler(req, res);
  } else {
    return res.writeHead(404).end("Resource Not Found.");
  }
});

server.listen(3333);
