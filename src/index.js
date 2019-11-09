import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './services/serviceWorker';
import configureStore from './store';
import routes from './routes';
import { RootWrapper } from './components/wrappers';
import { RouteWithSubRoutes } from './components/hoc';
import NotFound from './components/pages/NotFound';
import './styles/css/index.css';

const { store, persistor } = configureStore();

ReactDOM.render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <Router>
            <RootWrapper>
               <Switch>
                  {routes.map((route, i) => (
                     <RouteWithSubRoutes key={i} {...route} />
                  ))}
                  <Route component={NotFound} />
               </Switch>
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
