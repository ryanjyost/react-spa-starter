const sh = require('shelljs');
const { REACT_APP_ENV, BUCKET_NAME, CLOUDFRONT_DIST_ID } = process.env;

/**
 * Upload the /build folder contents to your production S3 Bucket
 */

(function() {
   sh.echo(`Deploying the ${REACT_APP_ENV} build to Bucket ${BUCKET_NAME}`);
   sh.exec(`aws s3 sync build/ s3://${BUCKET_NAME} --delete`);

   if (CLOUDFRONT_DIST_ID) {
      sh.exec(`aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DIST_ID} --paths "/*" `);
   }
})();
