import apisauce from 'apisauce';
import { $ApiBaseUrl } from 'Config';

/**
 * Create a dog api
 * @returns {Object} A module/object of dog api methods
 */
const create = () => {
   /**
    * Create an instance of an axios/apisauce api
    * @type {ApisauceInstance}
    */
   const api = apisauce.create({
      baseURL: $ApiBaseUrl
   });

   /**
    * Get random dog images
    * @param {Number} count
    * @returns {Promise}
    */
   const getRandomDogs = count => api.get(`/breeds/image/random/${count || 1}`);

   /**
    * Get list of all breeds
    * @returns {Promise}
    */
   const getBreeds = () => api.get(`/breeds/list/all`);

   /**
    * Get a number of random dogs of particular breed
    * @param {String} breed
    * @param {Number} count
    * @returns {Promise}
    */
   const getDogsByBreed = (breed, count) => api.get(`/breed/${breed}/images/random/${count}`);

   return {
      getRandomDogs,
      getBreeds,
      getDogsByBreed
   };
};

export default create;
