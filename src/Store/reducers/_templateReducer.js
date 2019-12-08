import update from 'immutability-helper';
import Helpers from '../helpers';
import persist from '../helpers/persist';

/***********************
 STATE
 ***********************/
const InitialState = {
   fetching: false,
   error: null
};

/***********************
 ACTIONS
 ***********************/

// use this to generate the action types and creators for the 3 saga actions (Request, Success, Failure)
const { createSagaActions } = Helpers;
const exampleSagaAction = createSagaActions('EXAMPLE_ACTION', {
   request: id => ({ id }),
   success: response => ({ response }),
   failure: error => ({ error })
});

// This is just a basic, single action - nothing fancy
const BASIC_ACTION = 'BASIC_ACTION';
const basicAction = () => ({ type: BASIC_ACTION });

export const actions = {
   exampleSagaAction,
   basicAction
};

/***********************
 REDUCERS
 ***********************/
export function reducer(state = InitialState, action) {
   const { payload } = action;
   switch (action.type) {
      case exampleSagaAction.types.request:
         return update(state, {
            fetching: { $set: true },
            error: { $set: null }
         });
      case exampleSagaAction.types.success:
         return update(state, {
            fetching: { $set: false }
         });
      case exampleSagaAction.types.failure:
         return update(state, {
            fetching: { $set: false },
            error: { $set: `Error occurred` }
         });
      default:
         return state;
   }
}

/**********************************
This file's reducer functions will be combined and
manage one top-level property/section of the redux Store (SECTION_OF_REDUX_STATE)

Use the whitelist (second arg of "persist" function) to specify properties in this reducer's
 state to save to localStorage and hydrate when the app fires up a new session
 **********************************/
export default persist('SECTION_OF_REDUX_STATE', [], Helpers.reduceReducers(InitialState, reducer));
