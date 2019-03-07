#!/bin/bash

npm run build
composer network install -c PeerAdmin@hlfv1 -a ./dist/origami-platform-network.bna
npm run upgrade