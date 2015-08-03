# WINDSHIELD

A Node.js Rendering Platform

<br>

## Pre-Install

This project must be cloned in same directory as the [www-cars-com-static](http://git.cars.com/projects/CARSCP/repos/www-cars-com-static/browse) repository. Checkout the `integration` branch on that project and then `npm install` and `gulp` it.

Also, you'll need a few global npm packages:

    npm install -g nodemon node-inspector

## Install

```
git clone http://your-username-here@git.cars.com/scm/mp/windshield.git
cd windshield
npm install
```

<br>

## Run

```
npm start
```

<br>

## Profiling

```
npm run-script profile
```

<br>

## TODO

  - Support for query assets
  - Support for siteplan (to support navigation)
  - Request and render embedded assets
  - Build out tasking (including test harness)
  - Publish modules currently in `lib` to private npm and pull in via package.
