const sh = require('shelljs');
const {
   REACT_APP_ENV,
   BUCKET_NAME,
   STAGING_BUCKET_NAME,
   CLOUDFRONT_DIST_ID,
   STAGING_CF_DIST_ID,
   PRODUCTION_CF_DIST_ID
} = process.env;

/*
Upload the /build folder contents to your production S3 Bucket
*/
let bucket = BUCKET_NAME,
   // distribution = CLOUDFRONT_DIST_ID;
   distribution = null;

if (REACT_APP_ENV === 'PRODUCTION') {
   bucket = BUCKET_NAME;
   // bucket = DOMAIN_NAME || BUCKET_NAME;
   // distribution = PRODUCTION_CF_DIST_ID;
} else if (REACT_APP_ENV === 'STAGING') {
   bucket = STAGING_BUCKET_NAME
   // bucket = STAGING_DOMAIN_NAME || `staging.${BUCKET_NAME}`;
   // distribution = STAGING_CF_DIST_ID;
}

(function() {
   sh.echo(`Deploying the ${REACT_APP_ENV} build to Bucket ${bucket}`);
   sh.exec(`aws s3 sync build/ s3://${bucket} --delete`);

   if (distribution) {
      sh.exec(`aws cloudfront create-invalidation --distribution-id ${distribution} --paths "/*" `);
   }
})();
