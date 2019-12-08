import apisauce from 'apisauce';
import { $ApiBaseUrl } from '../Config';

const create = () => {
   const api = apisauce.create({
      baseURL: $ApiBaseUrl
   });

   const getRandomDogs = count => api.get(`/breeds/image/random/${count || 1}`);

   const getBreeds = () => api.get(`/breeds/list/all`);

   const getDogsByBreed = (breed, count) => api.get(`/breed/${breed}/images/random/${count}`);

   return {
      getRandomDogs,
      getBreeds,
      getDogsByBreed
   };
};

export default create;
