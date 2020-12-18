#!/bin/bash

BUCKET_NAME=rb-ssr-demo-bucket

mkdir ./simple-ssr/build
mkdir ./simple-ssr/server-build
mkdir ./simple-ssr/edge-build


echo "Starting deployment of the Sample"
cd ./cdk
npm install
npm run build
cdk bootstrap
cdk deploy SSRApiStack --outputs-file ../simple-ssr/src/config.json
cd ../simple-ssr
npm install
npm run build-all
cd ../cdk
cdk deploy SSRAppStack --parameters mySiteBucketName=$BUCKET_NAME