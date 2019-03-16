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

cd /root/origami-blockchain/scripts/helpers
./startMongoDB.sh
./startRestServer.sh
./startPlayground.sh
