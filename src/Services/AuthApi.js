import apisauce from 'apisauce';

/**
 * Create an instance of a fake auth api
 * @returns {Object} A module/object of auth api methods
 */
const create = () => {
   const api = apisauce.create({
      baseURL: `https://httpstat.us`
   });

   /**
    * Fake a user logging in
    * @param username
    * @param password
    * @returns {Promise} Success message
    */
   const login = (username, password) => api.get(`/200?sleep=2000`);

   return {
      login
   };
};

export default create;
