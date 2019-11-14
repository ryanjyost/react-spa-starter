# React SPA Starter

The goal of this project is to be a starting point/boilerplate for complex single-page applications
built using a modern React/Redux stack.

In addition to having common dependencies and architectural features that will be needed in a majority of React/Redux projects,
this project also implements some basic functionality that's meant to illustrate how everything actually works together
and provide code that can be easily renamed/repurposed for a new project.

## Quick Start

1. Make sure you have modern versions of Node (>= 10.16.0) and npm (>= 6.9.0). Using [nvm](https://github.com/nvm-sh/nvm) makes life easy.
2. Clone this repo with `git clone https://github.com/ryanjyost/react-spa-starter.git <YOUR_PROJECT_NAME>`
3. `cd <YOUR_PROJECT_NAME>`
4. Run `npm run setup`

You should see the app open up in your browser at `http://localhost:3000`.

## Folder Structure

Pretty much everything that will change regularly is in the **`src`** directory.<br /><br />
**`index.js`** => Where the app hooks into the DOM and top-level pieces are set up.<br /><br />
**`assets`** => Supplementary files like images, pdfs, spreadsheets, etc.<br /><br />
**`components`** => Basically anything that's a React component (HOCs too).<br /><br />
**`config`** => Environment configuration options and management for app variables/settings.<br /><br />
**`helpers`** => Any utility functions, modules, etc. Folder for misfit code.<br /><br />
**`routes`** => React Router structure and configuration (mapping routes to components, etc.).<br /><br />
**`store`** => Store configuration, Redux and Redux Saga.<br /><br />
**`styles`** => Traditional stylesheets, global style variables and `react-responsive` settings.<br /><br />

For a foundational understanding of the project's origins, read about [CRA's folder structure](https://create-react-app.dev/docs/folder-structure).

For details on the **`tests`** directory, check out the [testing](#testing) section of these docs.

## Configuration

All environment configuration options funnel through `/src/config/index.js`.

There are multiple ways to inject and manage environment variables in this project.

### `src/config`

Here the proper configuration is selected based on the `REACT_APP_ENV` (CRA's `NODE_ENV` is always production when built and deployed, so we need our own).

Non-sensitive information can be hardcoded in their respective config objects, while any environment variables can simply be passed through. See the boilerplate for an example.

### `.env.<environment>` files

#### This is for variables that...

-  can't be committed to even a private repository b/c they are too secret (not terribly common in frontend)
-  are specific to each development environment, a.k.a. different across developers working on this project
-  need to be used in scripts 

#### _Things to note..._

-  To help folks setting up their own instance of your project, there's a `.env.default` file to act as a template for developer-specific `.env` files
-  CRA requires that environment variables begin with `REACT_APP_`, e.g. `REACT_APP_SecretKey`

### Command line overrides

Any script in `package.json` can have an environment variable explicitly set. Here's an example...

```
"scripts": {
    "deploy:prod": "env REACT_APP_ENV='PRODUCTION' npm run build"
}
```

For more complex methods (i.e. different `.env` files for different environments), check out package [env-cmd](https://www.npmjs.com/package/env-cmd), which comes installed in this project.

## Core Dependencies

Here's an overview of this project's major dependencies and what they are for. Obviously forks of this boilerplate can stray from the core out-of-the-box dependencies and libraries,
but the "stack" within this app has proven to be very effective for single page React apps.

_These are just the notable deps, this list is not exhaustive. Check `package.json` for more._

**Dependencies**

-  [antd](https://ant.design/docs/react/introduce) - Component/UI library and styling.
-  [apisauce](https://ant.design/docs/react/introduce) - Adds some nice syntactic sugar and normalization to axios.
-  [react](https://reactjs.org/) - A JavaScript library for building user interfaces.
-  [react-router-dom](https://reacttraining.com/react-router/) - Routing for single page React apps.
-  [react-responsive](https://github.com/contra/react-responsive) - CSS media queries in react - for responsive design, and more.
-  [redux](https://redux.js.org/) - State management.
-  [redux-persist](https://github.com/rt2zz/redux-persist) - Persist and rehydrate a redux store.
-  [redux-saga](https://github.com/redux-saga/redux-saga) - Handling side effects for Redux apps.

**Dev Dependencies**

-  [customize-cra](https://github.com/arackaf/customize-cra) - Override webpack configurations for create-react-app 2.0.
-  [cypress](https://www.cypress.io/) - End-to-end testing framework.
-  [react-app-rewired](https://github.com/timarney/react-app-rewired) - Override create-react-app webpack configs without ejecting.

## Commands

Check out package.json for the actual code/commands that are executed by these commands.

-  **`build`** - Generates a deployable package of files in the `build folder`.
-  **`build:<env>`** - Build a deployment package based on the given config. Options are `dev`, `staging`, and `prod`.
-  **`check:circular`** - Prints a list of circular dependencies in the app. CRA makes these a relative non-issue, but good to be aware of.
-  **`check:orphans`** - Finds files/components that aren't being imported anywhere in the project.
-  **`cypress`** - Runs the development GUI for cypress tests.
-  **`setup`** - Prep a newly forked project. It installs dependencies and starts the app.
-  **`start`** - Run the app in development.
-  **`test`** - Runs the cypress test suite in headless mode and generates raw reports.
-  **`test:report`** - AFTER running the test suite in headless mode, execute this command to generate a nice HTML report in the `cypress/reports` folder

## Deployment

Before any deployment, you need to run the build script for the particular environment you're deploying to.
**Here's some links that were helpful**
[Deploying create-react-app to S3 and CloudFront](https://medium.com/@wolovim/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af)

 --parameter-overrides RootBucketName=react-spa-starter

## Testing

This project uses [Cypress](https://www.cypress.io/) for its E2E testing. Their docs and guides, as well as GitHub issue threads,
are fantastic so consult those when unsure of something.
Cypress comes with a great GUI to help write new tests, debugging and watching the test scripts run in an actual Chrome browser.

To open the GUI and run tests in a visible browser, run `npm run cypress`.

To run the test suite in headless mode and generate raw results, run `npm run test`.

Once the test suite completes, run `npm run test:report` for a nice HTML report.

## Misc. Things to Note & Keep in Mind

**Add gotchas and insights here as needed**

---

## _Original Documentation from CRA_

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
