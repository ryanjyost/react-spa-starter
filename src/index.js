import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './Services/serviceWorker';
import configureStore from './Store';
import routes from './Routes';
import { RootWrapper } from './Components/wrappers';
import { RootRouteWithSubRoutes } from './Components/routes';
import './Styles/index.scss';

console.log('ENV', process.env.REACT_APP_ENV);
console.log('Deployment Check', 2);

const { store, persistor } = configureStore();

ReactDOM.render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <Router>
            <RootWrapper>
               <RootRouteWithSubRoutes routes={routes} />
            </RootWrapper>
         </Router>
      </PersistGate>
   </Provider>,
   document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
