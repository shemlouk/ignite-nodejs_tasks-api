export function buildRoutePathRegex(path) {
  const regexToFindParams = /:([a-zA-Z]+)/g;

  const paramsRegex = "(?<$1>[a-z0-9-_]+)";
  const queryRegex = "(?<query>\\?(.*))?$";

  const pathWithParamsRegex = path.replaceAll(regexToFindParams, paramsRegex);

  return new RegExp("^" + pathWithParamsRegex + queryRegex);
}
