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

export class MainStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);
    new ApiStack(this, "ApiStack", {
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
        commands: ["echo here1", "cd ./cdk", "yarn install", "yarn run build", "yarn cdk synth"],
        primaryOutputDirectory: "./cdk/cdk.out",
      })
    });

    const genConfigStep = new ShellStep("GenConfigStep", {
      commands: ["echo here2"],
    });
    
    const mainStage = pipeline.addStage(new MainStage(this, 'Main', props)); 
    mainStage.addPost(genConfigStep);
  }
}


new MyPipelineStack(app, 'MyPipelineStack', {
  env: {
    account: '263870947518',
    region: 'us-east-1',
  }
});


// new ApiStack(app, "SSRApiStack", { env: demoEnv });
// new SsrStack(app, "SSRAppStack", { env: demoEnv });

app.synth();

