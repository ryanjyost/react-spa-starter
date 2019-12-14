/**
 * Make route paths accessible by single layer map of keys to avoid hard coding Routes in links
 * @param {Array} routes
 * @returns {Object} objects that map route keys to path (pathMap) and route configs (configMap)
 */
export function generateRouteMap(routes) {
   let pathMap = {},
      configMap = {};
   for (let route of routes) {
      pathMap[route.key] = route.path;
      configMap[route.key] = route;
      if (route.routes) {
         const { pathMap: nestedPaths, configMap: nestedConfigMap } = generateRouteMap(route.routes);
         pathMap = { ...pathMap, ...nestedPaths };
         configMap = { ...configMap, ...nestedConfigMap };
      }
   }

   return { pathMap, configMap };
}
