// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import * as cdk from "@aws-cdk/core";
import { CfnParameter, Duration } from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";

export class SsrStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const mySiteBucketName = new CfnParameter(this, "mySiteBucketName", {
      type: "String",
      description: "The name of S3 bucket to upload react application"
    });

    const mySiteBucket = new s3.Bucket(this, "ssr-site", {
      bucketName: mySiteBucketName.valueAsString,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.html",
      publicReadAccess: false,
      //only for demo not to use in production
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
    new cdk.CfnOutput(this, "Bucket", { value: mySiteBucket.bucketName });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "ssr-oia"
    );
    mySiteBucket.grantRead(originAccessIdentity);

    new s3deploy.BucketDeployment(this, "Client-side React app", {
      sources: [s3deploy.Source.asset("../simple-ssr/build/")],
      destinationBucket: mySiteBucket
    });

    const ssrFunction = new lambda.Function(this, "ssrHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("../simple-ssr/server-build"),
      memorySize: 128,
      timeout: Duration.seconds(5),
      handler: "index.handler"
    });

    const ssrEdgeFunction = new lambda.Function(this, "ssrEdgeHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("../simple-ssr/edge-build"),
      memorySize: 128,
      timeout: Duration.seconds(5),
      handler: "index.handler"
    });

    const ssrEdgeFunctionVersion = new lambda.Version(
      this,
      "ssrEdgeHandlerVersion",
      { lambda: ssrEdgeFunction }
    );

    const ssrApi = new apigw.LambdaRestApi(this, "ssrEndpoint", {
      handler: ssrFunction
    });

    new cdk.CfnOutput(this, "SSR API URL", { value: ssrApi.url });

    const apiDomainName = `${ssrApi.restApiId}.execute-api.${this.region}.amazonaws.com`;

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "ssr-cdn",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: mySiteBucket,
              originAccessIdentity: originAccessIdentity
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                lambdaFunctionAssociations: [
                  {
                    eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
                    lambdaFunction: ssrEdgeFunctionVersion
                  }
                ]
              }
            ]
          },
          {
            customOriginSource: {
              domainName: apiDomainName,
              originPath: "/prod",
              originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY
            },
            behaviors: [
              {
                pathPattern: "/ssr"
              }
            ]
          }
        ]
      }
    );

    new cdk.CfnOutput(this, "CF URL", {
      value: `https://${distribution.distributionDomainName}`
    });
    new cdk.CfnOutput(this, "Lambda SSR URL", {
      value: `https://${distribution.distributionDomainName}/ssr`
    });
    new cdk.CfnOutput(this, "Lambda@Edge SSR URL", {
      value: `https://${distribution.distributionDomainName}/edgessr`
    });
  }
}
