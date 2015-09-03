# NOX

A Node.js Rendering Platform

<br>

## Pre-Install

1.) Update your `nginx.conf` (see `nginx.conf` in `etc` directory) and start nginx.

2.) Setup npm to use artifactory. See instructions here: https://confluence.cars.com/display/CD/Setup+NPM

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

## Run build

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

## Contribute

Please refer to [CONTRIBUTING.md](http://git.cars.com/projects/MP/repos/nox/browse/CONTRIBUTING.md)
