// make route paths accessible by single layer map of keys to avoid hard coding routes in links
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
