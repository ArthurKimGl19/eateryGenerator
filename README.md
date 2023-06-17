# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

With over 300+ eateries I wanted to try, I decided to create this web app to be able to quickly come up with a location to try out from this list.

Currently, there isn't a great way to get the needed info out of Google Maps.
I can only export out data from the starred places list in Google Maps and not from other lists.
Also, the only relevant data present is Location Data, which has business name and address with no way to determine what type of business it is, etc.

I found a potential solution: [Link](https://medium.com/codex/how-i-web-scraped-my-custom-google-maps-list-into-a-csv-file-eb1172a85bf4), which uses Selenium and Beautiful Soup, but it looked to be more time intensive than manually inputting data into a Google Sheet file and converting it into a json file.
Considering how the list of places I want to try is not updated frequently, I decided to manually input the relevant data and convert it into a json file.

The application uses the data-eatery.json file to create a hashtable of possible eatery choices.
When a user clicks on the randomize button, an eatery is selected from the hashtable and it is displayed as a card as well as added to the history table.
Clicking the clear history button, will clear all previous choices.
Data used within this app is stored in redux and persisted using localStorage.

Navbar options:
1. Home - Able to randomize an eatery and randomized eatery is displayed
2. History - Displays the history of randomized eateries
3. Eateries - Displays all eateries within the data-eatery.json file
4. Data - Generates charts for type and price for all eateries data
5. Favorites - Displays all eateries within favorite-eatery.json file

Currently, there are unit and integration tests for this application.

### Next steps:

1. Create a script to automatically convert the csv to json
   a. Use Google sheets api to convert google sheet to csv
   b. Create file to convert csv to json
   c. Create package.json script
2. Look to incorporate Github actions into repo
3. Finish unit and integration tests
4. Host via s3 bucket to use the application in real time
5. Add ability to add new favorites, update favorites
6. Put backend on AWS - api gateway, lambdas

### Extra

1. Create separate repo and refactor app to use Typescript
2. Update tests to support Typescript
3. Create a separate repo and refactor to use Next.js
4. Host using netlify
5. Look into creating a Dockerized app and figure out how to host containers
6. Look into using Kubernetes

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `npm run lint`

### `npm run lint:fix`

Run these two commands to run eslint on files. They will attempt to fix all problems in the code.

### `npm run format`

Run this to format relevant files with prettier.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
