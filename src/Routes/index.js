import React from 'react';
import ROUTES from './routeConfigs';
import { generateRouteMap } from './helpers';

/*******************************
Export any useful route info
********************************/
// create a flat array of Routes to more easily filter/manipulate
const { pathMap, configMap } = generateRouteMap(ROUTES);
export const RouteMap = pathMap;
export const AppRoutes = ROUTES.find(r => r.key === 'APP').routes;
export default ROUTES;
