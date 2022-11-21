#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Construct } from 'constructs';
export declare class MyPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps);
}
