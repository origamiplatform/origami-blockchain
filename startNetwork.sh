#!/bin/bash

composer card import --file networkadmin.card
composer network install -c PeerAdmin@hlfv1 -a ./dist/origami-platform-network.bna
npm run start