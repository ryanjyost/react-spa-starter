import { dev, staging, prod, local } from './env';

// react-scripts sets NODE_ENV to production on build, so can't use that
export const env = process.env.REACT_APP_ENV || 'LOCAL';

// get configs based on environment
let config = local;
if (env === 'PRODUCTION') config = prod;
else if (env === 'STAGING') config = staging;
else if (env === 'DEV') config = dev;

config = { ...config, ...process.env };

// Config variables
export const $env = env;
export const $envDisplay = config.envDisplay;
export const $ApiBaseUrl = config.apiUrl;
export const $ClientUrl = config.clientUrl;
