import apisauce from 'apisauce';

const create = () => {
   const api = apisauce.create({
      baseURL: `http://localhost:3000`
   });

   const fetch = () => api.get(`/`);

   return {
      fetch
   };
};

export default create;
