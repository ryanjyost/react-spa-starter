import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppRoutesWrapper } from '../wrappers';
import {NotFound} from '../pages';

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

// allows for rendering nested Route components
export const RouteWithSubRoutes = (route) => {
	return (
		<Route
			path={route.path}
			exact={route.exact}
			render={props => <route.component {...props} routes={route.routes} />}
		/>
	);
};
