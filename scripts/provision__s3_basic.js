const sh = require('shelljs');
const { BUCKET_NAME } = process.env;

/*
Create an S3 Bucket that hosts a React app
*/
(function() {
   sh.echo(`Creating a Bucket with the name "${BUCKET_NAME}"`);
   sh.exec(
      `aws cloudformation deploy --template-file ./.cloudformation/s3_basic.yml --stack-name s3-basic --parameter-overrides BucketName=${BUCKET_NAME}`
   );
})();
