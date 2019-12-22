const sh = require('shelljs');
const { REACT_APP_ENV, PRODUCTION_BUCKET, STAGING_BUCKET, STAGING_CF_DIST_ID, PRODUCTION_CF_DIST_ID } = process.env;

/**
 * Upload the /build folder contents to your production S3 Bucket
 */
let bucket = null,
   distribution = null;

if (REACT_APP_ENV === 'PRODUCTION') {
   bucket = PRODUCTION_BUCKET;
   distribution = PRODUCTION_CF_DIST_ID;
} else if (REACT_APP_ENV === 'STAGING') {
   bucket = STAGING_BUCKET;
   distribution = STAGING_CF_DIST_ID;
}

(function() {
   sh.echo(`Deploying the ${REACT_APP_ENV} build to Bucket ${bucket}`);
   sh.exec(`aws s3 sync build/ s3://${bucket} --delete`);

   if (distribution) {
      sh.exec(`aws cloudfront create-invalidation --distribution-id ${distribution} --paths "/*" `);
   }
})();
