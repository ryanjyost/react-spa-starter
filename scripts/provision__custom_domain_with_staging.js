const sh = require('shelljs');
const { BUCKET_NAME, ACM_CERT_ARN } = process.env;

/*
Create an S3 Bucket and CloudFront Distribution that serves up a React app at a custom domain
*/
(function() {
   sh.echo(`Creating buckets and CloudFront distributions at "${BUCKET_NAME}" and "staging.${BUCKET_NAME}"`);
   sh.exec(
      `aws cloudformation deploy --template-file ./.cloudformation/custom_domain_with_staging.yml --stack-name custom-domain-with-staging --parameter-overrides DomainName=${BUCKET_NAME} FullDomainName=www.${BUCKET_NAME} AcmCertificateArn=${ACM_CERT_ARN}`
   );
})();
