import update from 'immutability-helper';
import { createSagaActions } from '../actionGenerators';
import reduceReducers from '../reduceReducers';
import persist from '../persist';

/**
 * Initial state for this section of the store
 * @type {Object}
 */
const InitialState = {
   fetching: false,
   user: null,
   isAuthenticated: false,
   error: null
};

/**
 * Login a user
 */
const login = createSagaActions(
   'LOGIN',
   {
      request: (username, password) => ({ username, password }),
      success: response => ({ response }),
      failure: error => ({ error })
   },
   'user'
);

function loginReducer(state = InitialState, action) {
   const { payload } = action;
   switch (action.type) {
      case login.types.request:
         return update(state, {
            fetching: { $set: true },
            error: { $set: null },
            isAuthenticated: { $set: false },
            user: { $set: payload.username }
         });
      case login.types.success:
         return update(state, {
            fetching: { $set: false },
            isAuthenticated: { $set: true }
         });

      case login.types.failure:
         return update(state, {
            fetching: { $set: false },
            error: { $set: `Error occurred` },
            isAuthenticated: { $set: false }
         });

      case LOGOUT:
         return update(state, {
            fetching: { $set: false },
            isAuthenticated: { $set: false },
            user: { $set: null }
         });
      default:
         return state;
   }
}

/**
 * Logout a user
 */
const LOGOUT = 'user/LOGOUT';
const logout = () => ({ type: LOGOUT });

function logoutReducer(state = InitialState, action) {
   const { payload } = action;
   switch (action.type) {
      case LOGOUT:
         return update(state, {
            fetching: { $set: false },
            isAuthenticated: { $set: false },
            user: { $set: null }
         });
      default:
         return state;
   }
}

export const actions = {
   login,
   logout
};

export default persist('user', [], reduceReducers(InitialState, loginReducer, logoutReducer));
