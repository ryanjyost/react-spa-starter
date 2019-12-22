const STAGING_BUCKET = 'staging_bucket';
const PRODUCTION_BUCKET = 'prod_bucket';
const STAGING_CF_DIST_ID = 'update_me';
const PRODUCTION_CF_DIST_ID = 'update_me';

const env = {
   common: {
      BUCKET_NAME: 'react-spa-starter',
      ACM_CERT_ARN: 'update_me',
      STAGING_CF_DIST_ID,
      PRODUCTION_CF_DIST_ID,
      STAGING_BUCKET,
      PRODUCTION_BUCKET,
      SASS_PATH: 'node_modules:src'
   },
   local: {
      REACT_APP_ENV: 'local',
      REACT_APP_ClientUrl: 'http://localhost:3000'
   },
   staging: {
      REACT_APP_ENV: 'STAGING',
      REACT_APP_ClientUrl: 'www.staging.website.com',
      BUCKET_NAME: STAGING_BUCKET,
      CLOUDFRONT_DIST_ID: STAGING_CF_DIST_ID
   },
   production: {
      REACT_APP_ENV: 'PRODUCTION',
      REACT_APP_ClientUrl: 'www.website.com',
      BUCKET_NAME: PRODUCTION_BUCKET,
      CLOUDFRONT_DIST_ID: PRODUCTION_CF_DIST_ID
   }
};

module.exports = env;
