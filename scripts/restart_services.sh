#!/bin/bash

{
    source /root/origami-blockchain/envvars.txt
} || {
    source ../../envvars.txt
} || {
    source ../envvars.txt
} 


docker rm -f mongo
docker rm -f playground
docker rm -f rest

./root/origami-blockchain/scripts/helpers/startMongoDB.sh
./root/origami-blockchain/scripts/helpers/startRestServer.sh
./root/origami-blockchain/scripts/helpers/startPlayground.sh
