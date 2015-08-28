#!/usr/bin/env bash

apt-get update && apt-get install -y git git-core nginx nodejs tmux

if ! [ -L /usr/bin/node ]; then
  ln -fs /usr/bin/nodejs /usr/bin/node
fi

apt-get install -y npm

chown -R $(whoami) /usr/local

npm install -g npm
npm install -g jasmine nodemon pm2

if ! [ -L /etc/nginx/nginx.conf ]; then
  ln -fs /vagrant/etc/nginx.conf /etc/nginx/nginx.conf
fi

grep "/var/opt/nox" $HOME/.profile
if [ $? -ne 0 ]; then
    echo "cd /var/opt/nox" >> /home/vagrant/.profile
fi
