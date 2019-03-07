#!/bin/bash

source ./envvars.txt

echo composer participant add -c ${NETWORK_ADMIN} -d '{"$class":"org.hyperledger.composer.system.NetworkAdmin", "participantId":"restadmin"}'
composer participant add -c ${NETWORK_ADMIN} -d '{"$class":"org.hyperledger.composer.system.NetworkAdmin", "participantId":"restadmin"}'
echo

echo composer identity issue -c ${NETWORK_ADMIN} -f restadmin.card -u restadmin -a "resource:org.hyperledger.composer.system.NetworkAdmin#restadmin"
composer identity issue -c ${NETWORK_ADMIN} -f restadmin.card -u restadmin -a "resource:org.hyperledger.composer.system.NetworkAdmin#restadmin"
echo

echo composer card import -f restadmin.card
composer card import -f restadmin.card
echo

echo composer network ping -c ${REST_ADMIN}
composer network ping -c ${REST_ADMIN}
echo
