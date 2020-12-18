// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import * as cdk from "@aws-cdk/core";
import { Duration } from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apiFunction = new lambda.Function(this, "apiHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("../simple-ssr/api"),
      memorySize: 128,
      timeout: Duration.seconds(5),
      handler: "index.handler"
    });

    const api = new apigw.LambdaRestApi(this, "apiEndpoint", {
      handler: apiFunction,
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS
      }
    });

    new cdk.CfnOutput(this, "apiurl", { value: api.url });
  }
}
