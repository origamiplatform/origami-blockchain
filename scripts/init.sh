#!/bin/bash

sh /root/fabric-tools/createPeerAdminCard.sh
sh /root/fabric-tools/startFabric.sh

sh /root/origami-blockchain/scripts/helpers/initNetwork.sh
sh /root/origami-blockchain/scripts/helpers/createRestServerAdmin.sh

cd /root/origami-blockchain/docker_custom
sh ./build.sh

chmod 777 -R /root/.composer
sh /root/origami-blockchain/scripts/helpers/updateConnectionConfig.s

