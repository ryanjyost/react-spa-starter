import React from 'react';
import ROUTES from './routeConfigs';
import { generateRouteMap } from 'Util/routes';

const { pathMap, configMap } = generateRouteMap(ROUTES);
export const RouteMap = pathMap;
export const RouteConfigMap = configMap;
export const AppRoutes = ROUTES.find(r => r.key === 'APP_ROOT').routes;
export default ROUTES;
