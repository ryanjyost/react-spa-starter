# React SPA *(Single Page Application)* Starter

The goal of this project is to be a starting point/boilerplate for complex single-page applications
built using a modern React/Redux stack.

In addition to having common dependencies and architectural features that will be needed in a majority of React/Redux projects,
this project also implements some basic functionality that's meant to illustrate how everything actually works together
and provide code that can be easily renamed/repurposed for a new project.

___
## Table of Contents
- **[Features](#features)**
- **[Quick Start Guides](#quick-start-guides)**
    - [Set up the project](#set-up-the-project)
    - [Deploy to an AWS S3 Bucket](#deploy-to-an-aws-s3-bucket)
    - [Add CircleCI Pipeline](#add-circleci-pipeline)
- **[Folder Structure](#folder-structure)**
- **[Environment Configuration](#environment-configuration)**
- **[Testing](#testing)**
- **[Core Dependencies](#core-dependencies)**
- **[Commands](#commands)**
- **[Build and Deployment](#build-and-deployment)**
- **[Provisioning AWS Resources](#provisioning-aws-resources)**
- **[Miscellaneous](#miscellaneous)**
___

## Features
**A real app with simple but non-trivial examples.**
See legit examples of implementations and methods that are easily tweaked to fit your needs.

**All of the benefits of [create-react-app](https://github.com/facebook/create-react-app).**
Quick setup, hot reloading, simple production builds, modern environment, PWA features, etc.<br/>

**Complex state management infrastructure.**
Redux is setup to handle multiple sections of a global store. Redux Saga can handle side effects. Redux Persist will save the store properties that you specify across browser sessions.

**Well-architected, scalable routing.**
Manage your React Router routes in one simlpe config file. Nested and authenticated routing is already taken care of for you.

**Environment management and configuration is ready to go.** 
Keep track of private variables in a single config file, which is ready to be leveraged in scripts or injected into your React app.

**Testing.**
Write unit tests in Jest and end-to-end tests with Cypress.

**Deploy to AWS in minutes.**
Leverage the `./cloudformation` templates to automatically provision AWS resources that are ready to host your React app.

**Continuous Integration and Delivery.**
Comes with a CircleCI config file that can get you testing and deploying staging and production branches easily.

**Multiple styling options.**
Use traditional stylesheets and CSS in JS. Use responsive-react library to make responsive design simple (a.k.a. without media queries).

**Common gotchas already taken care of.**
Avoid headaches that come with starting from scratch.
___

## Quick Start Guides

### Set up the project

1. Make sure you have modern versions of Node (>= 10.16.0) and npm (>= 6.9.0). Using [nvm](https://github.com/nvm-sh/nvm) makes life easy.
2. Clone this repo with `git clone https://github.com/ryanjyost/react-spa-starter.git <YOUR_PROJECT_NAME>`
3. `cd <YOUR_PROJECT_NAME>`
4. Run `npm run setup`, which installs dependencies and starts the app.
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
___

## Folder Structure

#### `.circleci`

Configuration needed for CI/CD using [CircleCI](https://circleci.com/)

#### `.cloudformation`

CloudFormation templates to easily provision AWS resources that can host a React app.

#### `build`

The files generated from `create-react-app`'s `build` script. This folder is what is uploaded to an S3 Bucket for static site hosting.

#### `cypress`

Anything related to the end-to-end testing library [Cypress](https://www.cypress.io/).

#### `public`

Static assets like your app's `index.html` file, images, icons, etc.

#### `scripts`

Bash scripts that are too big for just declaring in `package.json` or ones that require secret environment variables.

#### `src`

Pretty much everything that will change regularly is in the **`src`** directory.<br />
- **`watcherSaga.js`** => Where the app hooks into the DOM and top-level pieces are set up.<br />
- **`/assets`** => Supplementary files like images, pdfs, spreadsheets, etc.<br />
- **`/components`** => Basically anything that's React related (incl. hooks).<br />
- **`/config`** => Environment configuration options and management for app variables/settings.<br />
- **`/helpers`** => Any utility functions, modules, etc. Folder for misfit code.<br />
- **`/routes`** => React Router structure and configuration (mapping routes to components, etc.).<br />
- **`/services`** => Modules and libraries, e.g. external API interfaces.<br />
- **`/store`** => Store configuration, Redux and Redux Saga.<br />
- **`/styles`** => Traditional stylesheets, global style variables and `responsive-react` settings.<br />
- **`/tests`** => Unit tests.

___

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

### `/src/config`

All environment configuration options for the app funnel through `/src/config/watcherSaga.js`. The proper configuration is selected based on the `REACT_APP_ENV` (CRA's `NODE_ENV` is always production when built and deployed, so we need our own).

In `/src/config/watcherSaga.js`, you can pass through environment variables declared in `.env-cmdrc.js` or
non-sensitive ones declared in `/src/config/env.js`

#### Other options

Of course, you can manage environment config stuff any way you want, in any combination. Here's a few other common methods...

-  Any script in `package.json` can have an environment variable explicitly set, .e.g.<br/> `"deploy:prod": "env REACT_APP_ENV='PRODUCTION' npm run build"`
-  `.env` files
___

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
___

## Core Dependencies

Here's an overview of this project's major dependencies and what they are for. Obviously forks of this boilerplate can stray from the core out-of-the-box dependencies and libraries,
but the "stack" within this app has proven to be very effective for single page React apps.

_These are just the notable deps, this list is not exhaustive. Check `package.json` for more._

**Dependencies**

-  [antd](https://ant.design/docs/react/introduce) - Component/UI library and styling.
-  [apisauce](https://ant.design/docs/react/introduce) - Adds some nice syntactic sugar and normalization to axios.
-  [env-cmd](https://github.com/toddbluhm/env-cmd) - Use environment variables in npm scripts and React app.
-  [react](https://reactjs.org/) - A JavaScript library for building user interfaces.
-  [react-redux](https://react-redux.js.org/) - Official React bindings for Redux.
-  [react-router-dom](https://reacttraining.com/react-router/) - Routing for single page React apps.
-  [react-responsive](https://github.com/contra/react-responsive) - CSS media queries in react - for responsive design, and more.
-  [redux](https://redux.js.org/) - State management.
-  [redux-persist](https://github.com/rt2zz/redux-persist) - Persist and rehydrate a redux store.
-  [redux-saga](https://github.com/redux-saga/redux-saga) - Handling side effects for Redux apps.
-  [shelljs](https://github.com/shelljs/shelljs) - Portable Unix shell commands for Node.js.

**Dev Dependencies**

-  [customize-cra](https://github.com/arackaf/customize-cra) - Override webpack configurations for create-react-app 2.0.
-  [cypress](https://www.cypress.io/) - End-to-end testing framework.
-  [react-app-rewired](https://github.com/timarney/react-app-rewired) - Override create-react-app webpack configs without ejecting.

___
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
-  **`cypress:report`** - Generate a nice HTML report of the results from `npm run cypress`

-  **`deploy`** - Run `build` and `upload` scripts.
-  **`deploy:prod`** - Run `build` and `upload` scripts for the production environment.
-  **`deploy:staging`** - Run `build` and `upload` scripts for the staging environment.

-  **`deps:clear`** - Remove your `node_modules` directory, helpful when having weird npm issues.

-  **`provision:basic`** - Create an S3 bucket that can host your React app.
-  **`provision:basic_with_staging`** - Create staging and production S3 buckets to host your app deployments.
-  **`provision:custom_domain`** - Creates an S3 Bucket, CloudFront Distribution and DNS records to host your React app at a custom domain (that's registered on AWS).
-  **`provision:custom_domain_with_staging`** - Creates production and staging S3 Buckets, CloudFront Distributions and DNS records to host your React app at a custom domain (that's registered on AWS) and staging subdomain.

-  **`setup`** - Prep a newly forked project. It installs dependencies and starts the app.
-  **`start`** - Run the app. Defaults to "local" environment.
-  **`start:staging`** - Run the app with staging environment config.
-  **`start:prod`** - Run the app with production environment config.
-  **`test`** - Run unit test suite.
-  **`upload`** - Upload app build to an S3 Bucket.
-  **`upload:staging`** - Upload app build to your staging bucket
-  **`upload:prod`** - Upload app build to your production bucket.

___
## Build and Deployment

TODO
___
## Provisioning AWS Resources

TODO
___

## Miscellaneous

**Add gotchas and insights here as needed**

---


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
