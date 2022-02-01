# Travel Planner - Capstone Project
## Udacity Front End Web Developer Nanodegree Program

The aim of this project is to build out a travel application that obtains desired trip locations from the user, along with departure and return dates for each trip. Multiple trips can be stored in the app. A slideshow of up to 10 images is displayed for each trip location, along with a 16-day weather forecast for each location.

## Deployment
The app is deployed to Heroku.com at [https://travel-planner2.herokuapp.com](https://travel-planner2.herokuapp.com).

## Dependencies
- @babel/runtime
- body-parser
- cors
- dotenv
- express
- workbox-webpack-plugin

## DevDependencies
- @babel/core
- @babel/plugin-transform-runtime
- @babel/preset-env
- babel-loader
- css-loader
- css-minimizer-webpack-plugin
- html-webpack-plugin
- jest
- mini-css-extract-plugin
- node-sass
- sass-loader
- style-loader
- terser-webpack-plugin
- webpack
- webpack-cli
- webpack-dev-server

## Installation instructions
1. Either [clone the repository](https://github.com/AxelPilot/travel-planner.git) from Github.com or [download it as a zip file](https://github.com/AxelPilot/travel-planner/archive/refs/heads/master.zip).
2. Install the dependencies
	- Open a terminal or command prompt
	- Navigate to the project root folder
	- Run `npm install`

3. Sign up for API keys at
	- [Geonames.org](https://www.geonames.org/login)
	- [Weatherbit.io](https://www.weatherbit.io/account/create)
	- [Pixabay.com](https://pixabay.com/)

4. Configure environment variables using the dotenv package
	- Create a new `.env` file in the root folder of your project
	- Store the API keys in the `.env` file like this:
	```
	geonames_username=**************************
	weatherbit_API_KEY=**************************
	pixabay_API_KEY=**************************
	```
5. Build project
	- Open a terminal or command prompt
	- Navigate to the project root folder
	- Run the command `npm run build`

6. Start the server
	- Run the command `npm run start`
7. Open the browser at http://localhost:8081/

The project is deployed to Heroku.com, with the following url:
https://travel-planner2.herokuapp.com
