import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './services/serviceWorker';
import configureStore from './store';
import routes from './routes';
import { RootWrapper } from './components/wrappers';
import { RootRouteComponentWithSubRoutes } from './components/routes';
import './styles/css/index.css';

console.log('ENV', process.env.REACT_APP_ENV);
console.log("Deployment Check", 1);

const { store, persistor } = configureStore();

ReactDOM.render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <Router>
            <RootWrapper>
               <RootRouteComponentWithSubRoutes routes={routes} />
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
