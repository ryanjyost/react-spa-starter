/*
Hard code or grab from .env file any environment-specific config options
 */

const common = {
   apiUrl: process.env.REACT_APP_ApiBaseUrl || 'https://dog.ceo/api'
};

const LOCAL = {
   envDisplay: 'Local',
   clientUrl: 'http://localhost:3000'
};

const DEV = {
   envDisplay: 'Development',
   clientUrl: 'http://localhost:3000'
};

const STAGING = {
   envDisplay: 'Staging',
   clientUrl: 'http://localhost:3000'
};

const PRODUCTION = {
   envDisplay: 'Production',
   clientUrl: 'http://localhost:3000'
};

export const local = { ...common, ...LOCAL };
export const dev = { ...common, ...DEV };
export const staging = { ...common, ...STAGING };
export const prod = { ...common, ...PRODUCTION };
