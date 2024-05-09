import { createRouteMap } from "@/vue-router/create-route-map";

export function createMatcher(routes) {
  let { pathMap } = createRouteMap(routes);
  function addRoutes(routes) {
    createRouteMap(routes, pathMap);
  }

  function addRoute(route) {
    createRouteMap([route], pathMap);
  }

  function match(location) {
    return pathMap[location];
  }

  return {
    // 添加路由，多个路由的
    addRoutes,
    // 添加一个路由
    addRoute,
    // 查找并返回相应的路由
    match
  };
}
