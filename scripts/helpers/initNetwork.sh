#!/bin/bash

npm run build
composer network install --card PeerAdmin@hlfv1 --archiveFile ./dist/origami-platform-network.bna
npm run start
composer card import --file networkadmin.card
