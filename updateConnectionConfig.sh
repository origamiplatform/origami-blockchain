#!/bin/bash

source ./envvars.txt

sed -e '=s/localhost:7051/peer0.org1.origami.com:7051/' \
-e 's/localhost:7053/peer0.org1.origami.com:7053/' \
-e 's/localhost:7054/ca.org1.origami.com:7054/' \
-e 's/localhost:7050/orderer.origami.com:7050/' < $HOME/.composer/cards/$REST_ADMIN/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/$REST_ADMIN/ 

sed -e 's/localhost:7051/peer0.org1.origami.com:7051/' \
-e 's/localhost:7053/peer0.org1.origami.com:7053/' \
-e 's/localhost:7054/ca.org1.origami.com:7054/' \
-e 's/localhost:7050/orderer.origami.com:7050/' < $HOME/.composer/cards/$NETWORK_ADMIN/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/$NETWORK_ADMIN/ 

sed -e 's/localhost:7051/0.0.0.0:7051/' \
-e 's/localhost:7053/0.0.0.0:7053/' \
-e 's/localhost:7054/0.0.0.0:7054/' \
-e 's/localhost:7050/0.0.0.0:7050/' < $HOME/.composer/cards/$PEER_ADMIN/connection.json  > /tmp/connection.json && cp -p /tmp/connection.json $HOME/.composer/cards/$PEER_ADMIN/ 