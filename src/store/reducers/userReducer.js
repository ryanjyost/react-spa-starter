import update from 'immutability-helper';
import Helpers from '../helpers';

/***********************
 STATE
 ***********************/
const InitialState = {
   fetching: false,
   user: null,
   isAuthenticated: false,
   error: null
};

/***********************
 ACTIONS
 ***********************/
const { createSagaActions } = Helpers;
const login = createSagaActions('LOGIN', {
   request: (username, password) => ({ username, password }),
   success: response => ({ response }),
   failure: error => ({ error })
});

const LOGOUT = 'LOGOUT';
const logout = () => ({ type: LOGOUT });

export const actions = {
   login,
   logout
};

/***********************
 REDUCERS
 ***********************/
export function reducer(state = InitialState, action) {
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

export default Helpers.reduceReducers(InitialState, reducer);
