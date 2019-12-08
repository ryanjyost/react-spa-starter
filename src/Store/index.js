import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import persist from './helpers/persist';
import watcherSaga from './sagas';

/*=== ACTIONS ===*/
import { actions as DogActions } from './reducers/dogsReducer';
import { actions as UserActions } from './reducers/userReducer';

/*=== REDUCERS ===*/
import dogsReducer from './reducers/dogsReducer';
import userReducer from './reducers/userReducer';

/* === CONFIGURE STORE === */
export default function configureStore() {
   const middleware = [];
   const enhancers = [];

   /* ------------- Redux Configuration ------------- */
   // map reducers to keys in the top level redux global state object
   const combinedReducers = combineReducers({
      dogs: dogsReducer,
      user: userReducer
   });

   // certain dog data is persisted inside the dogReducer
   const persistedReducer = persist('root', ['user'], combinedReducers);

   /* ------------- Saga Middleware ------------- */
   const sagaMiddleware = createSagaMiddleware();
   middleware.push(sagaMiddleware);

   /* ------------- Assemble Middleware ------------- */
   enhancers.push(applyMiddleware(...middleware));

   /* ------------- Create Persisted Store ------------- */
   const store = createStore(persistedReducer, composeWithDevTools(...enhancers));
   const persistor = persistStore(store);

   // Run root saga AFTER Store created with sagaMiddleware
   sagaMiddleware.run(watcherSaga);

   return { store, persistor };
}

// make actions available for dispatch
export const Actions = { ...DogActions, ...UserActions };
