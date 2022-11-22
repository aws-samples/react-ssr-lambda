// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import * as cdk from "aws-cdk-lib";
import { Duration } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as constructs from "constructs";

export class ApiStack extends cdk.Stack {
  public apiUrl = '';

  constructor(scope: constructs.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    
    const apiFunction = new lambda.Function(this, "apiHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
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

    this.apiUrl = api.url;

    new cdk.CfnOutput(this, "apiurl", { value: api.url });
  }
}
