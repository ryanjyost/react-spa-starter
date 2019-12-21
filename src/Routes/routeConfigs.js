import React from 'react';
import { Typography } from 'antd';
import { Login } from 'Components/pages';
import { RootAppComponentWithRoutes, RootRouteWithSubRoutes } from 'Components/routes';
const { Title } = Typography;

/**
 * An array of route configs, with nested objects/arrays in the same structure of the app's routes
 */
const ROUTES = [
   { key: 'ROOT', path: '/', title: 'Home', component: Login, exact: true },
   {
      key: 'APP_ROOT',
      path: '/app',
      title: 'App',
      component: RootAppComponentWithRoutes,
      routes: [
         {
            key: 'APP_INDEX',
            path: '/app',
            title: 'Home',
            component: () => <Title>Welcome to the App</Title>,
            icon: 'home',
            exact: true
         },
         {
            key: 'APP_PAGE',
            path: '/app/page',
            title: 'App Page',
            component: () => <Title>App Page</Title>,
            icon: 'file',
            exact: true
         },
         {
            key: 'SECTION_1_ROOT',
            path: '/app/section1',
            title: 'Section 1',
            component: RootRouteWithSubRoutes,
            icon: 'smile',
            routes: [
               {
                  key: 'SECTION_1_INDEX',
                  path: '/app/section1',
                  exact: true,
                  title: 'Index Page',
                  component: () => <Title>Index Page</Title>
               },
               {
                  key: 'SECTION_1_PAGE',
                  path: '/app/section1/page',
                  exact: true,
                  title: 'Another Page',
                  component: () => <Title>Another Page</Title>
               },
               {
                  key: 'SECTION_1_SUBSECTION_1',
                  path: '/app/section1/subsection',
                  title: 'Subsection',
                  component: RootRouteWithSubRoutes,
                  routes: [
                     {
                        key: 'SECTION_1_SUBSECTION_1_INDEX',
                        path: '/app/section1/subsection',
                        exact: true,
                        title: 'Subsection Index',
                        component: () => <Title>Subsection Index</Title>
                     },
                     {
                        key: 'SECTION_1_SUBSECTION_1_PAGE',
                        path: '/app/section1/subsection/page',
                        title: 'Subsection Page',
                        component: () => <Title>Subsection Page</Title>
                     }
                  ]
               }
            ]
         },
         {
            key: 'SECTION_2_ROOT',
            path: '/app/section2',
            title: 'Section 2',
            component: RootRouteWithSubRoutes,
            icon: 'frown',
            routes: [
               {
                  key: 'SECTION_2_INDEX',
                  path: '/app/section2',
                  exact: true,
                  title: 'Index Page',
                  component: () => <Title>Index Page</Title>
               },
               {
                  key: 'SECTION_2_PAGE',
                  path: '/app/section2/page',
                  exact: true,
                  title: 'Another Page',
                  component: () => <Title>Another Page</Title>
               },
               {
                  key: 'SECTION_2_SUBSECTION_2',
                  path: '/app/section2/subsection',
                  title: 'Subsection',
                  component: RootRouteWithSubRoutes,
                  routes: [
                     {
                        key: 'SECTION_2_SUBSECTION_2_INDEX',
                        path: '/app/section2/subsection',
                        exact: true,
                        title: 'Subsection Index',
                        component: () => <Title>Subsection Index</Title>
                     },
                     {
                        key: 'SECTION_2_SUBSECTION_2_PAGE',
                        path: '/app/section2/subsection/page',
                        title: 'Subsection Page',
                        component: () => <Title>Subsection Page</Title>
                     }
                  ]
               }
            ]
         }
      ]
   }
];

export default ROUTES;
