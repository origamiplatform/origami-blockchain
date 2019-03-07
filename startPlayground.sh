#!/bin/bash

docker run -d --name playground --network composer_default -p 8080:8080 -v ~/.composer:/home/composer/.composer hyperledger/composer-playground

