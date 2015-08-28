# NOX

A Node.js Rendering Platform

<br>

## Pre-Install

1.) Update your `nginx.conf` (see `nginx.conf` in `etc` directory) and start nginx.

2.) Install global npm packages:

    npm install -g nodemon jasmine pm2

3.) Setup .npmrc to use virtual repository on our internal artifactory host: http://repository.cars.com/ (details to come)

<br>

## Install

```
git clone http://your-username-here@git.cars.com/scm/mp/nox.git
cd nox
npm install
```

<br>

## Run

```
npm start
```

<br>
