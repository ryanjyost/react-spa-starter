# React SPA _(Single Page Application)_ Starter

This project is basically just create-react-app with AWS deployment options, CircleCI and a few other nice-to-haves in every project.

It started out with way more boilerplate, but I really minimized what's in it recently. To see the old, much more fleshed out version, check out the old branches.

---

## Table of Contents

-  **[Quick Start Guides](#quick-start-guides)**
   -  [Set up the project](#set-up-the-project)
   -  [Deploy to an AWS S3 Bucket](#deploy-to-an-aws-s3-bucket)
   -  [Add CircleCI Pipeline](#add-circleci-pipeline)
-  **[Environment Configuration](#environment-configuration)**
-  **[Testing](#testing)**
-  **[Commands](#commands)**
-  **[Build and Deployment](#build-and-deployment)**
-  **[Provisioning AWS Resources](#provisioning-aws-resources)**
-  **[Miscellaneous](#miscellaneous)**

---

## Quick Start Guides

### Set up the project

1. Make sure you have modern versions of Node (>= 10.16.0) and npm (>= 6.9.0). Using [nvm](https://github.com/nvm-sh/nvm) makes life easy.
2. Clone this repo with `git clone https://github.com/ryanjyost/react-spa-starter.git <YOUR_PROJECT_NAME>`
3. `cd <YOUR_PROJECT_NAME>`
4. Run `npm install` and `npm start`.
5. You should see the app open up in your browser at `http://localhost:3000`.

### Deploy to an AWS S3 Bucket

1. [Setup an AWS account and the AWS CLI](https://www.ryanjyost.com/setup-aws-cli/)
2. Copy the `.env-cmdrc.default.js` file and name the new file `.env-cmdrc.js`. This file will house all your secret and AWS environment variables.
3. Add a unique `BUCKET_NAME` to the `common` section of your `.env-cmdrc.js` file.
4. Create an S3 Bucket that will host your React app by running `npm run provision:basic` in your terminal.
5. Verify that the S3 Bucket was created in the [CloudFormation](https://console.aws.amazon.com/cloudformation)
   section of the AWS Console. The CloudFormation stack "basic" should have a `CREATE_COMPLETE` status.
6. Build and upload your app by running `npm run deploy:prod`
7. Visit the public URL of your S3 bucket _(Find in AWS Console -> S3 -> Bucket -> Properties -> Static website
   hosting ->
   Endpoint)_ to see the deployed app

### Add CircleCI Pipeline

_This project comes with CircleCI just because it's easy and free for public repos._

1. Fork this repository.
2. Create an account on [CircleCI](https://circleci.com/) and select your forked repo. [See the docs](https://circleci.com/docs/2.0/first-steps/) for more detail.
3. Go to the settings of your project in the CircleCI dashboard and add any environment variables needed for building
   and deploying to your S3 Bucket (or other host if you're not using AWS). You'll probably need `AWS_ACCESS_KEY_ID`,
   `AWS_SECRET_ACCESS_KEY`, `BUCKET_NAME`, and `CI` set to `false` so that warnings from create-react-app's build process don't fail the CircleCI process.
4. Push an update to master (like a console log you can see in the browser) and check your CircleCI dashboard. If all
   went well, CircleCI should run two jobs...
   1. `test-cypress` runs the boilerplate end-to-end tests. And if those pass...
   2. `deploy-prod` runs unit tests and then builds the app for production and uploads the production build to your
      S3 bucket.

---

## Environment Configuration

**Note: create-react-app requires that environment variables begin with `REACT_APP_`, e.g. `REACT_APP_SecretKey` if used within the app!**

There are a few tools and methods in this app that help to make environment configuration and management easy.

### `.env-cmdrc.js`

To set your own private environment variables, copy the `.env-cmdrc.default.js` file and name the new
file `.env-cmdrc.js`. This file type is supported by [env-cmd](https://github.com/toddbluhm/env-cmd#readme), a package that makes environment stuff pretty easy to manage and leverage.

**TL;DR for `env-cmd` and `.env-cmdrc.js`**<br/>

-  Each top-level property of the object exported from the `.env-cmdrc.js` is an environment option.
-  To inject environment variables into scripts, prepend the script with `env-cmd -e` and an environment name, e.g. `"build:prod": "env-cmd -e production npm run build"`
-  If you provide a comma-separated list of environment names instead of just one, you can merge multiple configs,
   with the first listed config being overwritten by the second, etc. This makes using a `common` config object easy, e
   .g. `"build:prod": "env-cmd -e common,production npm run build"`

## Testing

### Unit Testing

TODO

### End-to-end Testing

This project uses [Cypress](https://www.cypress.io/) for its E2E testing. Their docs and guides, as well as GitHub issue threads,
are fantastic so consult those when unsure of something.
Cypress comes with a great GUI to help write new tests, debugging and watching the test scripts run in an actual Chrome browser.

To open the GUI and run tests in a visible browser, run `npm run cypress`.

To run the test suite in headless mode and generate raw results, run `npm run test`.

Once the test suite completes, run `npm run test:report` for a nice HTML report.

---

## Commands

Check out package.json for the actual code/commands that are executed by these commands.

-  **`build`** - Generates a deployable package of files in the `build folder`.
-  **`build:prod`** - Build your React app to be delpoyed to the production environment
-  **`build:staging`** - Build your React app to be delpoyed to the staging environment

-  **`check:circular`** - Prints a list of circular dependencies in the app. CRA makes these a relative non-issue, but good to be aware of.
-  **`check:deps`** - Get a list of unused dependencies.
-  **`check:orphans`** - Finds files/components that aren't being imported anywhere in the project.<br/>

-  **`cypress`** - Runs Cypress test suite in headless mode.
-  **`cypress:circleci`** - Special way to start the app and run Cypress tests in CircleCI.
-  **`cypress:open`** - Opens the Cypress GUI for to run and develop tests.

-  **`deploy`** - Run `build` and `upload` scripts.
-  **`deploy:prod`** - Run `build` and `upload` scripts for the production environment.
-  **`deploy:staging`** - Run `build` and `upload` scripts for the staging environment.

-  **`deps:clear`** - Remove your `node_modules` directory, helpful when having weird npm issues.

-  **`provision:basic`** - Create an S3 bucket that can host your React app.
-  **`provision:basic_with_staging`** - Create staging and production S3 buckets to host your app deployments.
-  **`provision:custom_domain`** - Creates an S3 Bucket, CloudFront Distribution and DNS records to host your React app at a custom domain (that's registered on AWS).
-  **`provision:custom_domain_with_staging`** - Creates production and staging S3 Buckets, CloudFront Distributions and DNS records to host your React app at a custom domain (that's registered on AWS) and staging subdomain.

-  **`start`** - Run the app. Defaults to "local" environment.
-  **`start:staging`** - Run the app with staging environment config.
-  **`start:prod`** - Run the app with production environment config.
-  **`test`** - Run unit test suite.
-  **`upload`** - Upload app build to an S3 Bucket.
-  **`upload:staging`** - Upload app build to your staging bucket
-  **`upload:prod`** - Upload app build to your production bucket.

---

## Build and Deployment

TODO

---

## Provisioning AWS Resources

TODO

---

## Miscellaneous

**Add gotchas and insights here as needed**

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
