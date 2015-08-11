FROM docker.cars.com/cars/baseimage:0.0.1

MAINTAINER Deep Mistry<dmistry@cars.com>

ADD package.json /var/opt/app/package.json

### Begin Installs
RUN apt-get update \
 && apt-get install -y nodejs git git-core nginx \
 && ln -fs /usr/bin/nodejs /usr/bin/node \
 && apt-get install -y npm \
 && chown -R $(whoami) /usr/local /var/opt/app \
 && npm install -g npm \
 && npm install -g nodemon jasmine pm2 \
### Clean Installs
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

### Cache npm install
RUN cd /var/opt/app \
 && npm install

WORKDIR /var/opt/app

CMD ["npm", "start"]


