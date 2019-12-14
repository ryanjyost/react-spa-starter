import apisauce from 'apisauce';

/**
 * Create a module of api methods
 * @returns {Object} A module/object of api methods
 */
const create = () => {
   /**
    * Create an instance of an axios/apisauce api
    * @type {ApisauceInstance}
    */
   const api = apisauce.create({
      baseURL: `http://localhost:3000`
   });

   /**
    * Get something
    * @returns {Promise} The response from the request
    */
   const get = () => api.get(`/`);

   return {
      get
   };
};

export default create;
