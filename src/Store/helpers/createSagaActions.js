import camelCase from 'camelcase';

// Creates the 3 steps actions that correspond to steps in a saga
const createSagaActions = (type, creators) => {
   const requestType = `${type}_REQUEST`;
   const successType = `${type}_SUCCESS`;
   const failureType = `${type}_FAILURE`;

   return {
      key: camelCase(type),
      types: { request: requestType, success: successType, failure: failureType },
      request(...args) {
         return {
            type: requestType,
            payload: creators.request ? creators.request(...args) : null
         };
      },
      success(...args) {
         return {
            type: successType,
            payload: creators.success(...args)
         };
      },
      failure(error) {
         return {
            type: failureType,
            payload: creators.failure ? creators.failure(error) : error => ({ error })
         };
      }
   };
};

export default createSagaActions;
