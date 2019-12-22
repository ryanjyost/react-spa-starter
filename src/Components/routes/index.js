import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppRoutesWrapper } from '../wrappers';
import { NotFound } from '../pages';

/**
 * Render root of router stuff
 */
export const RootRouteWithSubRoutes = ({ routes }) => {
   return (
      <Switch>
         {routes.map((route, i) => {
            return <RouteWithSubRoutes key={route.key} {...route} />;
         })}
         <Route component={NotFound} />
      </Switch>
   );
};

/**
 * Specific top level route component with app wrapper
 */
export const RootAppComponentWithRoutes = ({ routes }) => {
   return (
      <AppRoutesWrapper>
         <RootRouteWithSubRoutes routes={routes} />
      </AppRoutesWrapper>
   );
};

/**
 * Render a route that has sub routes
 */
export const RouteWithSubRoutes = route => {
   const config = { ...route };
   delete config.component;

   return (
      <Route
         path={route.path}
         exact={route.exact}
         render={props => <route.component {...props} config={config} routes={route.routes} />}
      />
   );
};
