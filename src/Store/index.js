import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import persist from './persist';
import watcherSaga from './watcherSaga';

/**
 * Actions
 */
import { actions as UserActions } from 'Store/user';

/**
 * Reducers
 */
import userReducer from 'Store/user';

/**
 * Configure store
 */
export default function configureStore() {
   const middleware = [];
   const enhancers = [];

   // map reducers to keys in the top level redux global state object
   const combinedReducers = combineReducers({
      user: userReducer
   });

   // set top-level pieces of the store to persist - can get more granular in each reducer
   const persistedReducer = persist('root', ['user'], combinedReducers);

   const sagaMiddleware = createSagaMiddleware();
   middleware.push(sagaMiddleware);
   enhancers.push(applyMiddleware(...middleware));

   const store = createStore(persistedReducer, composeWithDevTools(...enhancers));
   const persistor = persistStore(store);

   // Run root saga AFTER Store created with sagaMiddleware
   sagaMiddleware.run(watcherSaga);

   return { store, persistor };
}

// make actions available for dispatch
export const Actions = { ...UserActions };
