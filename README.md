# FleetOps
A SaaS based fleet management app built using the MEAN Stack for the purpose of experimentation.

The scaffolding was done using the [Yeoman](http://yeoman.io/) workflow which, in this case, consists of [yo](https://github.com/yeoman/yo), [Grunt](http://gruntjs.com/), and a combination of [Bower](http://bower.io/) for client side dependencies and [npm](https://www.npmjs.com/) for server side package management.

## Staging
This is a personal project and on a good day it is staged at [http://107.170.232.82](http://107.170.232.82/). [NodeJS](https://nodejs.org) and [ExpressJS](http://expressjs.com/) run on Ubuntu 14 and are kept alive by [pm2](http://pm2.keymetrics.io/), a production process manager for NodeJS.

## Getting Started
1. Clone this repo.
2. Download & Install Node.js and the npm package manager.
3. Download & Install MongoDB, and make sure it's running on the default port (27017).
4. Install the Bower package manager.
`$ npm install -g bower`
5. Install Grunt CLI
`$ npm install -g grunt-cli`
6. Install package dependencies using npm.
`$ npm install`
7. Start the app.
`$ grunt`

## Using FleetOps
1. Create an account.
2. Create your fleet.
