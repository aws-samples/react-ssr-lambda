#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ApiStack } from "../lib/api-stack";
import { SsrStack } from "../lib/srr-stack";
import { Construct } from 'constructs';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

const demoEnv = { region: "us-east-1" };
const app = new cdk.App();

export class APIStage extends cdk.Stage {
  private apiStack: ApiStack;
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    this.apiStack = new ApiStack(this, "ApiStack", {
      env: demoEnv
    });
  }
  public getApiUrl(): string {
    return this.apiStack.apiUrl;
  } 

}

export class SsrStage extends cdk.Stage {
  constructor(scope: Construct, id: string, apiUrl:string, props?: cdk.StageProps) {
    super(scope, id, props);
    new SsrStack(this, "SsrStack", apiUrl,
    {
      env: demoEnv
    });

  }
}

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new CodeBuildStep("SynthStep", {
        input: CodePipelineSource.connection(
          "ehalsey/react-ssr-lambda",
          "main",
          {
            connectionArn:
              "arn:aws:codestar-connections:us-west-1:263870947518:connection/7d190900-3cfe-4f09-b4ad-60b1ad7a1c0d"
          }
        ),
        commands: ["yarn install", "cd simple-ssr", "yarn run build-all", "cd ./../cdk", "yarn run build", "yarn cdk synth"],
        primaryOutputDirectory: "./cdk/cdk.out",
      })

    });

    const apiStage = new APIStage(this, 'APIStage');
    pipeline.addStage(apiStage);
    pipeline.addStage(new SsrStage(this, 'SSR', apiStage.getApiUrl(), props));

  }
}

new MyPipelineStack(app, 'MyPipelineStack', {
  env: {
    account: '263870947518',
    region: 'us-east-1',
  }
});

app.synth();

