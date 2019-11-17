const sh = require('shelljs');
const { BUCKET_NAME, ACM_CERT_ARN } = process.env;

/*
Create an S3 Bucket and CloudFront Distribution that serves up a React app at a custom domain
*/
(function() {
   sh.echo(`Creating a Bucket and CloudFront distribution hosted at "${BUCKET_NAME}"`);
   sh.exec(
      `aws cloudformation deploy --template-file ./.cloudformation/custom_domain.yml --stack-name custom-domain --parameter-overrides DomainName=${BUCKET_NAME} FullDomainName=www.${BUCKET_NAME} AcmCertificateArn=${ACM_CERT_ARN}`
   );
})();
