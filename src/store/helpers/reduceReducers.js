/*
Forked from https://github.com/redux-utilities/reduce-reducers/blob/master/src/index.js

Used to combine multiple reducer functions in a flat manner, using the same piece/section of redux state
More info -> https://stackoverflow.com/questions/38652789/correct-usage-of-reduce-reducers/44371190#44371190
 */

export default (...args) => {
   const initialState = typeof args[0] !== 'function' && args.shift();
   const reducers = args;

   if (typeof initialState === 'undefined') {
      throw new TypeError(
         'The initial state may not be undefined. If you do not want to set a value for this reducer, you can use null instead of undefined.'
      );
   }

   return (prevState, value, ...args) => {
      const prevStateIsUndefined = typeof prevState === 'undefined';
      const valueIsUndefined = typeof value === 'undefined';

      if (prevStateIsUndefined && valueIsUndefined && initialState) {
         return initialState;
      }

      return reducers.reduce(
         (newState, reducer, index) => {
            if (typeof reducer === 'undefined') {
               throw new TypeError(`An undefined reducer was passed in at index ${index}`);
            }

            return reducer(newState, value, ...args);
         },
         prevStateIsUndefined && !valueIsUndefined && initialState ? initialState : prevState
      );
   };
};
