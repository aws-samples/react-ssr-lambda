#!/bin/bash

echo "Starting destorying of the Sample"
cd ./cdk
cdk destroy SSRApiStack
cdk destroy SSRAppStack 