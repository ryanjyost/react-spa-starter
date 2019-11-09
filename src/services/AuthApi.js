import apisauce from 'apisauce';

const create = () => {
   const api = apisauce.create({
      baseURL: `https://httpstat.us`
   });

   const login = (username, password) => api.get(`/200?sleep=2000`);

   return {
      login
   };
};

export default create;
