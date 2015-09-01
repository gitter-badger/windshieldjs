# NOX

A Node.js Rendering Platform

<br>

## Pre-Install

1.) Update your `nginx.conf` (see `nginx.conf` in `etc` directory) and start nginx.

2.) Setup npm to use artifactory: http://repository.cars.com/ (details to come)

<br>

## Install

```
git clone http://your-username-here@git.cars.com/scm/mp/nox.git
cd nox
npm install
```

<br>

## Build

```
gulp
```

<br>

## Run source

```
node src
```

<br>

## Run build artifact

```
node dist
```

<br>

## Config

```
cp src/config.json ./env.json
vim env.json
```

Edit `env.json` howevee you'd like ... config in env.json will be assigned to the default config, overriding any existing properties. `env.json` file is ignored by git.

Note: It is on the roadmap to tie this all back into the new central config repositories.
