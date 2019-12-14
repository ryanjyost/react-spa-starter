import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppRoutesWrapper } from '../wrappers';
import { NotFound } from '../pages';

/**
 * Render root of router stuff
 */
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

/**
 * Specific top level route component with app wrapper
 */
export const RootAppComponentWithRoutes = ({ routes }) => {
   return (
      <AppRoutesWrapper>
         <RootRouteComponentWithSubRoutes routes={routes} />
      </AppRoutesWrapper>
   );
};

/**
 * Render an route that has sub routes
 */
export const RouteWithSubRoutes = route => {
   return (
      <Route
         path={route.path}
         exact={route.exact}
         render={props => <route.component {...props} routes={route.routes} />}
      />
   );
};
