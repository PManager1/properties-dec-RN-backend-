
either i can copy the lib foler to the new folder from the old one. 

or i can individually copy the files there. 


install the wolliz-edon in packages. ( make sure youve all the packages. )


==========

PROD   Explore config/env/production.js
npm run start:prod

To run your application with production environment configuration, execute gulp as follows:

$ sudo gulp prod

$ gulp p1 




====================================
GETTING STARTED FROM BEGINNING - 


copy the packeage.json & then   npm install 
copy the bower.json  & then  bower install 

make sure you've all the necessary files in the public/ lib folder. 



yo meanjs:crud-module properties

copy & replace file from here  :  config/assets/default.js b/config/assets/default.js


copy & replace file from here  : modules/core/client/app/config.js


 >make sure :   modules/properties/client/config/properties.client.config.js

/modules/properties/client/config/properties.client.routes.js


IMP :  modules/properties/client/controllers/list-properties.client.controller.js


modules/properties/client/services/properties.client.service.js


HTML
modules/properties/client/views/form-property.client.view.html
modules/properties/client/views/list-properties.client.view.html


Imp:
modules/properties/server/controllers/properties.server.controller.js
properties/server/models/property.server.model.js

modules/properties/server/policies/properties.server.policy.js

modules/properties/server/routes/properties.server.routes.js









add cors line from  /config/lib/express.js b/config/lib/express.js 

if you need replace the gulpfile.js 


add capistrano files 
====================================
Additional Packages 

pdfmake

====================================


node version = 6.4.0 


============

https://hub.docker.com/r/meanjs/mean/

gulp prod

npm run start:prod


MONGO_SEED=true npm start:prod

sudo MONGO_SEED=true gulp prod

In the express.js  fix this in prod: 
//    res.header('Access-Control-Allow-Origin', '*');  

=====


Just add ionic bundle file from the app folder and you shoud be good. 
use this page to do it:  https://goo.gl/fPrciV


=========

change the port in  config/env/default.js 



angular utils not being loaded via bower, its copied. 
its using angular-moment  not the plain old moment.js 


================

You can stop pesky eslint errors by modifying the 

.eslintrc.json

{
  "env": { "es6": true, "node": true },
  "extends": "eslint:recommended",
  "rules": {
    // "indent": ["error", 2],
    // "linebreak-style": ["warn", "unix"],
    // "quotes": ["error", "single"],
    // "semi": ["error", "never"],
    "valid-jsdoc": ["error"],
    "no-console": "off"
  }
}



==========

google map api from 


https://gist.github.com/kirschbaum/fcac2ff50f707dae75dc





[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/meanjs/mean?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/meanjs/mean.svg?branch=master)](https://travis-ci.org/meanjs/mean)
[![Dependencies Status](https://david-dm.org/meanjs/mean.svg)](https://david-dm.org/meanjs/mean)
[![Coverage Status](https://coveralls.io/repos/meanjs/mean/badge.svg?branch=master&service=github)](https://coveralls.io/github/meanjs/mean?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/meanjs/mean/badge.svg)](https://snyk.io/test/github/meanjs/mean)

MEAN.JS is a full-stack JavaScript open-source solution, which provides a solid starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a MEAN.JS application:
* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS](http://expressjs.com/en/guide/routing.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* AngularJS - Angular's [Official Website](http://angularjs.org/) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and [Egghead Videos](https://egghead.io/).
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g bower
```

## Downloading MEAN.JS
There are several ways you can get the MEAN.JS boilerplate:

### Cloning The GitHub Repository
The recommended way to get MEAN.js is to use git to directly clone the MEAN.JS repository:

```bash
$ git clone https://github.com/meanjs/mean.git meanjs
```

This will clone the latest version of the MEAN.JS repository to a **meanjs** folder.

### Downloading The Repository Zip File
Another way to use the MEAN.JS boilerplate is to download a zip copy from the [master branch on GitHub](https://github.com/meanjs/mean/archive/master.zip). You can also do this using the `wget` command:

```bash
$ wget https://github.com/meanjs/mean/archive/master.zip -O meanjs.zip; unzip meanjs.zip; rm meanjs.zip
```

Don't forget to rename **mean-master** after your project name.

### Yo Generator
Another way would be to use the [Official Yo Generator](http://meanjs.org/generator.html), which generates a copy of the MEAN.JS 0.4.x boilerplate and supplies an application generator to ease your daily development cycles.

## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop your MEAN application.

The boilerplate comes pre-bundled with a `package.json` and `bower.json` files that contain the list of modules you need to start your application.

To install the dependencies, run this in the application folder from the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* When the npm packages install process is over, npm will initiate a bower install command to install all the front-end modules needed for the application
* To update these packages later on, just run `npm update`

## Running Your Application

Run your application using npm:

```bash
$ npm start
```

Your application should run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! Your application should be running. To proceed with your development, check the other sections in this documentation.
If you encounter any problems, try the Troubleshooting section.

Explore `config/env/development.js` for development environment configuration options.

### Running in Production mode
To run your application with *production* environment configuration:

```bash
$ npm run start:prod
```

Explore `config/env/production.js` for production environment configuration options.

### Running with User Seed
To have default account(s) seeded at runtime:

In Development:
```bash
MONGO_SEED=true npm start
```
It will try to seed the users 'user' and 'admin'. If one of the user already exists, it will display an error message on the console. Just grab the passwords from the console.

In Production:
```bash
MONGO_SEED=true npm start:prod
```
This will seed the admin user one time if the user does not already exist. You have to copy the password from the console and save it.

### Running with TLS (SSL)
Application will start by default with secure configuration (SSL mode) turned on and listen on port 8443.
To run your application in a secure manner you'll need to use OpenSSL and generate a set of self-signed certificates. Unix-based users can use the following command:

```bash
$ npm run generate-ssl-certs
```

Windows users can follow instructions found [here](http://www.websense.com/support/article/kbarticle/How-to-use-OpenSSL-and-Microsoft-Certification-Authority).
After you've generated the key and certificate, place them in the *config/sslcerts* folder.

Finally, execute prod task `npm run start:prod`
* enable/disable SSL mode in production environment change the `secure` option in `config/env/production.js`


## Testing Your Application
You can run the full test suite included with MEAN.JS with the test task:

```bash
$ npm test
```
This will run both the server-side tests (located in the `app/tests/` directory) and the client-side tests (located in the `public/modules/*/tests/`).

To execute only the server tests, run the test:server task:

```bash
$ npm run test:server
```

To execute only the server tests and run again only changed tests, run the test:server:watch task:

```bash
$ npm run test:server:watch
```

And to run only the client tests, run the test:client task:

```bash
$ npm run test:client
```

## Running your application with Gulp

The MEAN.JS project integrates Gulp as build tools and task automation.

We have wrapped Gulp tasks with npm scripts so that regardless of the build tool running the project is transparent to you.

To use Gulp directly, you need to first install it globally:

```bash
$ npm install gulp -g
```

Then start the development environment with:

```bash
$ gulp
```

To run your application with *production* environment configuration, execute gulp as follows:

```bash
$ gulp prod
```



===========
How to send data with get request. 

exports.propertiesListByToday = function(req, res, next, id) {

=============
all the unncessary http post  http calls can be replaced with http get following this examplw 

exports.Later_Today_P_prioritySearch = function(req, res, next, id) {
=============
how to use chalk 

console.log(chalk.white('356-PSC - - req.params  ', req.params));


=============
mongo search 
mongoose search   https://goo.gl/vxwrAf

var id_2=id;
var filter={};
filter[id_2]=true;
filter["user_logged_email"]="libraryemail@gmail.com";




=============



