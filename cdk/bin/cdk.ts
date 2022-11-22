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
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    new ApiStack(this, "ApiStack", {
      env: demoEnv
    });

  }
} 

export class SsrStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    new SsrStack(this, "SsrStack", {
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
        commands: ["yarn install", "cd simple-ssr", "yarn run build-all", "cd ./../cdk",  "yarn run build", "yarn cdk synth"],
        primaryOutputDirectory: "./cdk/cdk.out",
      })

    });

    const genConfigStep = new ShellStep("GenConfigStep", {
       commands: ["cd cdkUtils", "yarn install", "yarn run build", "node ./dist/export-cdk-outputs.js"],
        primaryOutputDirectory: "./cdkUtils",
    });
    
    const apiStage = pipeline.addStage(new APIStage(this, 'API', props)); 
    apiStage.addPost(genConfigStep);

    const copyConfigStep = new ShellStep("CopyConfigStep", {
       commands: ["ls ./cdkUtils"],
    });    

    const ssrStage = pipeline.addStage(new SsrStage(this, 'SSR', props));
    ssrStage.addPost(copyConfigStep);

  }
}

new MyPipelineStack(app, 'MyPipelineStack', {
  env: {
    account: '263870947518',
    region: 'us-east-1',
  }
});

app.synth();

