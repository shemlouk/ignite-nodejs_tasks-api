import http from "node:http";
import { setBodyToRequest } from "./middlewares/set-body-to-request.js";
import { setURLDataToRequest } from "./middlewares/set-url-data-to-request.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await setBodyToRequest(req, res);

  const route = routes.find(
    (route) => route.pathRegex.test(url) && route.method === method
  );

  if (route) {
    setURLDataToRequest(req, res, route.pathRegex);
    return route.handler(req, res);
  } else {
    return res.writeHead(404).end("Resource Not Found.");
  }
});

server.listen(3333);
