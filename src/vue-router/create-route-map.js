// 传过来的路由信息数组进行扁平化处理
export function createRouteMap(routes, pathMap) {
  pathMap = pathMap || {};
  routes.forEach(route => {
    addRouteRecord(route, pathMap);
  });
  return {
    pathMap
  };
}
function addRouteRecord(route, pathMap, parentRecord) {
  let path = parentRecord ? `${parentRecord.path === "/" ? "/" : `${parentRecord.path}/`}${route.path}` : route.path;
  let record = {
    path,
    component: route.component,
    props: route.props,
    meta: route.meta,
    parent: parentRecord
  };
  if (!pathMap[path]) {
    pathMap[path] = record;
  }
  route.children && route.children.forEach(childRoute => {
    addRouteRecord(childRoute, pathMap, record);
  });
}
