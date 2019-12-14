import camelCase from 'camelcase';

/**
 * Generate an object with action types and creators for a saga flow
 * @param {String} type Root snake-case string of the action types
 * @param {Object} creators Map of saga events to action creators for that event (request, success, failure)
 * @param {String} domain Section of the store
 * @returns {Object} everything about actions/sagas
 */
export function createSagaActions(type, creators, domain) {
   const requestType = domain ? `${domain}/${type}_REQUEST` : `${type}_REQUEST`;
   const successType = domain ? `${domain}/${type}_SUCCESS` : `${type}_SUCCESS`;
   const failureType = domain ? `${domain}/${type}_FAILURE` : `${type}_FAILURE`;

   return {
      key: camelCase(type),
      types: { request: requestType, success: successType, failure: failureType },
      request(...args) {
         return {
            type: requestType,
            payload: creators.request ? creators.request(...args) : {}
         };
      },
      success(...args) {
         return {
            type: successType,
            payload: creators.success ? creators.success(...args) : {}
         };
      },
      failure(...args) {
         return {
            type: failureType,
            payload: creators.failure ? creators.failure(...args) : {}
         };
      }
   };
}
