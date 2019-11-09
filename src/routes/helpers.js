import { Switch, Route } from 'react-router-dom';
import { AppRoutesWrapper } from '../components/wrappers';
import { RouteWithSubRoutes } from '../components/hoc';
import React from 'react';
import NotFound from '../components/pages/NotFound';

// render route with sub routes
export const RootRouteComponentWithSubRoutes = ({ routes }) => {
   return (
      <Switch>
         {routes.map((route, i) => (
            <RouteWithSubRoutes key={route.key} {...route} />
         ))}
         <Route component={NotFound} />
      </Switch>
   );
};

// render App Routes with Sub Routes
export const RootAppComponentWithRoutes = ({ routes }) => {
   return (
      <AppRoutesWrapper>
         <RootRouteComponentWithSubRoutes routes={routes} />
      </AppRoutesWrapper>
   );
};

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
