import React from 'react';
import { Login, Dogs, Breeds, BreedDetails } from 'Components/pages';
import { RootAppComponentWithRoutes, RootRouteComponentWithSubRoutes } from 'Components/routes';

/*******************************
 Configs
 ********************************/
const ROUTES = [
   { key: 'ROOT', path: '/', title: 'Home', component: Login, exact: true },
   {
      /* APP */
      key: 'APP',
      path: '/app',
      title: 'App',
      component: RootAppComponentWithRoutes,
      showInMainNav: 'skip',
      routes: [
         {
            key: 'APP_ROOT',
            path: '/app',
            title: 'Home',
            component: () => <h1>Welcome to the App</h1>,
            icon: 'home',
            exact: true,
            showInMainNav: true
         },
         {
            key: 'dogs',
            path: `/app/dogs`,
            title: 'Dogs',
            component: RootRouteComponentWithSubRoutes,
            showInMainNav: true,
            icon: 'smile',
            routes: [
               {
                  key: 'DOGS_ROOT',
                  path: '/app/dogs',
                  exact: true,
                  title: 'Dogs',
                  component: Dogs,
                  showInMainNav: true
               },
               {
                  key: 'DOGS_BREEDS',
                  path: '/app/dogs/breeds',
                  title: 'Dog Breeds',
                  component: RootRouteComponentWithSubRoutes,
                  showInMainNav: true,
                  routes: [
                     {
                        key: 'DOGS_BREEDS_ROOT',
                        path: '/app/dogs/breeds',
                        exact: true,
                        title: 'All Dog Breeds',
                        component: Breeds,
                        showInMainNav: true
                     },
                     {
                        key: 'BREEDS_DETAILS',
                        path: '/app/dogs/breeds/:breed',
                        title: 'Breed Details',
                        component: BreedDetails
                     }
                  ]
               }
            ]
         },
         {
            key: 'CATS',
            path: `/app/cats`,
            title: 'Cats',
            component: RootRouteComponentWithSubRoutes,
            showInMainNav: true,
            icon: 'frown',
            routes: [
               {
                  key: 'CATS_ROOT',
                  path: '/app/cats',
                  title: 'Cats',
                  component: () => <h1>CATS!</h1>,
                  exact: true,
                  showInMainNav: true
               },
               {
                  key: 'CATS_BREEDS',
                  path: `/app/cats/breeds`,
                  title: 'Cat Breeds',
                  component: RootRouteComponentWithSubRoutes,
                  showInMainNav: true,
                  routes: [
                     {
                        key: 'CATS_BREEDS_ROOT',
                        path: '/app/cats/breeds',
                        title: 'All Cat Breeds',
                        component: () => <h1>Cat Breeds!</h1>,
                        exact: true,
                        showInMainNav: true
                     }
                  ]
               }
            ]
         }
      ]
   }
];

export default ROUTES;
