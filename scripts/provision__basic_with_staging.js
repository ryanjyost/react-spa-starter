const sh = require('shelljs');
const { BUCKET_NAME } = process.env;

/*
Create an S3 Bucket that hosts a React app
*/
(function() {
   sh.echo(`Creating buckets "${BUCKET_NAME}" and "staging.${BUCKET_NAME}"`);
   sh.exec(
      `aws cloudformation deploy --template-file ./.cloudformation/basic_with_staging.yml --stack-name basic-with-staging --parameter-overrides RootBucketName=${BUCKET_NAME}`
   );
})();
