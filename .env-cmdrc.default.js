const STAGING_CF_DIST_ID = 'update_me';
const PRODUCTION_CF_DIST_ID = 'update_me';
// Need to match custom domain if using one e.g. react-spa-starter.com
const STAGING_BUCKET = 'staging_bucket';
const PRODUCTION_BUCKET = 'prod_bucket';

const env = {
   common: {
      REACT_APP_ApiBaseUrl: 'https://dog.ceo/api',
      REACT_APP_ClientUrl: 'http://localhost:3000',
      BUCKET_NAME: 'react-spa-starter',
      ACM_CERT_ARN: 'update_me',
      // if doing basic stuff, no need for staging and prod
      STAGING_CF_DIST_ID,
      PRODUCTION_CF_DIST_ID,
      STAGING_BUCKET,
      PRODUCTION_BUCKET
   },
   local: {
      REACT_APP_ENV: 'local'
   },
   staging: {
      REACT_APP_ENV: 'STAGING',
      BUCKET_NAME: STAGING_BUCKET,
      CLOUDFRONT_DIST_ID: STAGING_CF_DIST_ID
   },
   production: {
      REACT_APP_ENV: 'PRODUCTION',
      BUCKET_NAME: PRODUCTION_BUCKET,
      CLOUDFRONT_DIST_ID: PRODUCTION_CF_DIST_ID
   }
};

module.exports = env;
