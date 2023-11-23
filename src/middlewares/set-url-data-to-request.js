export function setURLDataToRequest(req, _res, pathRegex) {
  const { query, ...params } = req.url.match(pathRegex).groups;

  const queryObject = (query ?? "")
    .slice(1)
    .split("&")
    .reduce((queries, query) => {
      const [key, value] = query.split("=");
      queries[key] = value;
      return queries;
    }, {});

  req.params = params ?? {};
  req.query = queryObject;
}
