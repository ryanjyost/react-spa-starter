/*
These are non-secret environment configs
 */

const common = {
   apiUrl: process.env.REACT_APP_ApiBaseUrl
};

const LOCAL = {
   envDisplay: 'Local'
};

const DEV = {
   envDisplay: 'Development'
};

const STAGING = {
   envDisplay: 'Staging'
};

const PRODUCTION = {
   envDisplay: 'Production'
};

export const local = { ...common, ...LOCAL };
export const dev = { ...common, ...DEV };
export const staging = { ...common, ...STAGING };
export const prod = { ...common, ...PRODUCTION };
