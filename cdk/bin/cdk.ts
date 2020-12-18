#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { ApiStack } from "../lib/api-stack";
import { SsrStack } from "../lib/srr-stack";

const demoEnv = { region: "us-east-1" };
const app = new cdk.App();
new ApiStack(app, "SSRApiStack", { env: demoEnv });
new SsrStack(app, "SSRAppStack", { env: demoEnv });
