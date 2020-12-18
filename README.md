# Sample to deploy React SSR on Lambda

This repository consists of a sample to demonstrate two variants to do Server Side Rendering with AWS Lambda for React applications.
It usues AWS CDK to make the deployment.

![alt](images/LambdaSSR-Architecture.png)

## Requirements
- Node.js 12.x
- AWS CDK 1.72+
- Configured aws credentials
- This example will only be deployed successfuly in us-east-1 region as it is using AWS Lambda@Edge

## Deployment
- Clone git repository

    `git clone https://gitlab.aws.dev/romboiko/react-ssr-lambda.git

- Edit deploy.sh file and provide the name of the S3 bucket, for example 'mybucket', to deploy static content

    `cd react-ssr-lambda`

    `sed -i.bak 's/<bucket_name>/mybucket/g' deploy.sh`

- Run the deployment 

    `chmod +x deploy.sh && ./deploy.sh`

- After successful deployment you will see output variables

    **CF URL** - for React App stored on S3 and rendered on client

    **Lambda SSR URL** - for React App rendered by Lambda behind API Gateway

    **Lambda@Edge SSR URL** - for React App rendered by Lambda@Edge

- To clean-up the reated resources run

    `chmod +x destroy.sh && ./destroy.sh`
