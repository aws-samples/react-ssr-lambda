"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
Object.defineProperty(exports, "__esModule", { value: true });
exports.SsrStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const s3deploy = require("aws-cdk-lib/aws-s3-deployment");
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigw = require("aws-cdk-lib/aws-apigateway");
class SsrStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const mySiteBucketName = new aws_cdk_lib_1.CfnParameter(this, "mySiteBucketName", {
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
        const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "ssr-oia");
        mySiteBucket.grantRead(originAccessIdentity);
        new s3deploy.BucketDeployment(this, "Client-side React app", {
            sources: [s3deploy.Source.asset("../simple-ssr/build/")],
            destinationBucket: mySiteBucket
        });
        const ssrFunction = new lambda.Function(this, "ssrHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("../simple-ssr/server-build"),
            memorySize: 128,
            timeout: aws_cdk_lib_1.Duration.seconds(5),
            handler: "index.handler"
        });
        const ssrEdgeFunction = new lambda.Function(this, "ssrEdgeHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("../simple-ssr/edge-build"),
            memorySize: 128,
            timeout: aws_cdk_lib_1.Duration.seconds(5),
            handler: "index.handler"
        });
        const ssrEdgeFunctionVersion = new lambda.Version(this, "ssrEdgeHandlerVersion", { lambda: ssrEdgeFunction });
        const ssrApi = new apigw.LambdaRestApi(this, "ssrEndpoint", {
            handler: ssrFunction
        });
        new cdk.CfnOutput(this, "SSR API URL", { value: ssrApi.url });
        const apiDomainName = `${ssrApi.restApiId}.execute-api.${this.region}.amazonaws.com`;
        const distribution = new cloudfront.CloudFrontWebDistribution(this, "ssr-cdn", {
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
        });
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
exports.SsrStack = SsrStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JyLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JyLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxRUFBcUU7QUFDckUsaUNBQWlDOzs7QUFFakMsbUNBQW1DO0FBQ25DLDZDQUFxRDtBQUNyRCx5Q0FBeUM7QUFDekMsMERBQTBEO0FBQzFELHlEQUF5RDtBQUN6RCxpREFBaUQ7QUFDakQsb0RBQW9EO0FBR3BELE1BQWEsUUFBUyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3JDLFlBQVksS0FBMkIsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDekUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLDBCQUFZLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQ2xFLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLG1EQUFtRDtTQUNqRSxDQUFDLENBQUM7UUFFSCxNQUFNLFlBQVksR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNuRCxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsYUFBYTtZQUMxQyxvQkFBb0IsRUFBRSxZQUFZO1lBQ2xDLG9CQUFvQixFQUFFLFlBQVk7WUFDbEMsZ0JBQWdCLEVBQUUsS0FBSztZQUN2Qix3Q0FBd0M7WUFDeEMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztTQUN6QyxDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUV0RSxNQUFNLG9CQUFvQixHQUFHLElBQUksVUFBVSxDQUFDLG9CQUFvQixDQUM5RCxJQUFJLEVBQ0osU0FBUyxDQUNWLENBQUM7UUFDRixZQUFZLENBQUMsU0FBUyxDQUFDLG9C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QUUsV0FBVyxZQUFZLENBQUMsc0JBQXNCLE1BQU07U0FDNUQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUM3QyxLQUFLLEVBQUUsV0FBVyxZQUFZLENBQUMsc0JBQXNCLFVBQVU7U0FDaEUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBNUdELDRCQTRHQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTUlULTBcclxuXHJcbmltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcclxuaW1wb3J0IHsgQ2ZuUGFyYW1ldGVyLCBEdXJhdGlvbiB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xyXG5pbXBvcnQgKiBhcyBzMyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXMzXCI7XHJcbmltcG9ydCAqIGFzIHMzZGVwbG95IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtczMtZGVwbG95bWVudFwiO1xyXG5pbXBvcnQgKiBhcyBjbG91ZGZyb250IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udFwiO1xyXG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcclxuaW1wb3J0ICogYXMgYXBpZ3cgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCI7XHJcbmltcG9ydCAqIGFzIGNvbnN0cnVjdHMgZnJvbSBcImNvbnN0cnVjdHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTc3JTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNvbnN0cnVjdHMuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBjb25zdCBteVNpdGVCdWNrZXROYW1lID0gbmV3IENmblBhcmFtZXRlcih0aGlzLCBcIm15U2l0ZUJ1Y2tldE5hbWVcIiwge1xyXG4gICAgICB0eXBlOiBcIlN0cmluZ1wiLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJUaGUgbmFtZSBvZiBTMyBidWNrZXQgdG8gdXBsb2FkIHJlYWN0IGFwcGxpY2F0aW9uXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG15U2l0ZUJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgXCJzc3Itc2l0ZVwiLCB7XHJcbiAgICAgIGJ1Y2tldE5hbWU6IG15U2l0ZUJ1Y2tldE5hbWUudmFsdWVBc1N0cmluZyxcclxuICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6IFwiaW5kZXguaHRtbFwiLFxyXG4gICAgICB3ZWJzaXRlRXJyb3JEb2N1bWVudDogXCJlcnJvci5odG1sXCIsXHJcbiAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IGZhbHNlLFxyXG4gICAgICAvL29ubHkgZm9yIGRlbW8gbm90IHRvIHVzZSBpbiBwcm9kdWN0aW9uXHJcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1lcclxuICAgIH0pO1xyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJCdWNrZXRcIiwgeyB2YWx1ZTogbXlTaXRlQnVja2V0LmJ1Y2tldE5hbWUgfSk7XHJcblxyXG4gICAgY29uc3Qgb3JpZ2luQWNjZXNzSWRlbnRpdHkgPSBuZXcgY2xvdWRmcm9udC5PcmlnaW5BY2Nlc3NJZGVudGl0eShcclxuICAgICAgdGhpcyxcclxuICAgICAgXCJzc3Itb2lhXCJcclxuICAgICk7XHJcbiAgICBteVNpdGVCdWNrZXQuZ3JhbnRSZWFkKG9yaWdpbkFjY2Vzc0lkZW50aXR5KTtcclxuXHJcbiAgICBuZXcgczNkZXBsb3kuQnVja2V0RGVwbG95bWVudCh0aGlzLCBcIkNsaWVudC1zaWRlIFJlYWN0IGFwcFwiLCB7XHJcbiAgICAgIHNvdXJjZXM6IFtzM2RlcGxveS5Tb3VyY2UuYXNzZXQoXCIuLi9zaW1wbGUtc3NyL2J1aWxkL1wiKV0sXHJcbiAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBteVNpdGVCdWNrZXRcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNzckZ1bmN0aW9uID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcInNzckhhbmRsZXJcIiwge1xyXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcclxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KFwiLi4vc2ltcGxlLXNzci9zZXJ2ZXItYnVpbGRcIiksXHJcbiAgICAgIG1lbW9yeVNpemU6IDEyOCxcclxuICAgICAgdGltZW91dDogRHVyYXRpb24uc2Vjb25kcyg1KSxcclxuICAgICAgaGFuZGxlcjogXCJpbmRleC5oYW5kbGVyXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNzckVkZ2VGdW5jdGlvbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJzc3JFZGdlSGFuZGxlclwiLCB7XHJcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxyXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCIuLi9zaW1wbGUtc3NyL2VkZ2UtYnVpbGRcIiksXHJcbiAgICAgIG1lbW9yeVNpemU6IDEyOCxcclxuICAgICAgdGltZW91dDogRHVyYXRpb24uc2Vjb25kcyg1KSxcclxuICAgICAgaGFuZGxlcjogXCJpbmRleC5oYW5kbGVyXCJcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNzckVkZ2VGdW5jdGlvblZlcnNpb24gPSBuZXcgbGFtYmRhLlZlcnNpb24oXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIFwic3NyRWRnZUhhbmRsZXJWZXJzaW9uXCIsXHJcbiAgICAgIHsgbGFtYmRhOiBzc3JFZGdlRnVuY3Rpb24gfVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBzc3JBcGkgPSBuZXcgYXBpZ3cuTGFtYmRhUmVzdEFwaSh0aGlzLCBcInNzckVuZHBvaW50XCIsIHtcclxuICAgICAgaGFuZGxlcjogc3NyRnVuY3Rpb25cclxuICAgIH0pO1xyXG5cclxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiU1NSIEFQSSBVUkxcIiwgeyB2YWx1ZTogc3NyQXBpLnVybCB9KTtcclxuXHJcbiAgICBjb25zdCBhcGlEb21haW5OYW1lID0gYCR7c3NyQXBpLnJlc3RBcGlJZH0uZXhlY3V0ZS1hcGkuJHt0aGlzLnJlZ2lvbn0uYW1hem9uYXdzLmNvbWA7XHJcblxyXG4gICAgY29uc3QgZGlzdHJpYnV0aW9uID0gbmV3IGNsb3VkZnJvbnQuQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbihcclxuICAgICAgdGhpcyxcclxuICAgICAgXCJzc3ItY2RuXCIsXHJcbiAgICAgIHtcclxuICAgICAgICBvcmlnaW5Db25maWdzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHMzT3JpZ2luU291cmNlOiB7XHJcbiAgICAgICAgICAgICAgczNCdWNrZXRTb3VyY2U6IG15U2l0ZUJ1Y2tldCxcclxuICAgICAgICAgICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eTogb3JpZ2luQWNjZXNzSWRlbnRpdHlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYmVoYXZpb3JzOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXNEZWZhdWx0QmVoYXZpb3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBsYW1iZGFGdW5jdGlvbkFzc29jaWF0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlOiBjbG91ZGZyb250LkxhbWJkYUVkZ2VFdmVudFR5cGUuT1JJR0lOX1JFUVVFU1QsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFtYmRhRnVuY3Rpb246IHNzckVkZ2VGdW5jdGlvblZlcnNpb25cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgY3VzdG9tT3JpZ2luU291cmNlOiB7XHJcbiAgICAgICAgICAgICAgZG9tYWluTmFtZTogYXBpRG9tYWluTmFtZSxcclxuICAgICAgICAgICAgICBvcmlnaW5QYXRoOiBcIi9wcm9kXCIsXHJcbiAgICAgICAgICAgICAgb3JpZ2luUHJvdG9jb2xQb2xpY3k6IGNsb3VkZnJvbnQuT3JpZ2luUHJvdG9jb2xQb2xpY3kuSFRUUFNfT05MWVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBiZWhhdmlvcnM6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoUGF0dGVybjogXCIvc3NyXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJDRiBVUkxcIiwge1xyXG4gICAgICB2YWx1ZTogYGh0dHBzOi8vJHtkaXN0cmlidXRpb24uZGlzdHJpYnV0aW9uRG9tYWluTmFtZX1gXHJcbiAgICB9KTtcclxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiTGFtYmRhIFNTUiBVUkxcIiwge1xyXG4gICAgICB2YWx1ZTogYGh0dHBzOi8vJHtkaXN0cmlidXRpb24uZGlzdHJpYnV0aW9uRG9tYWluTmFtZX0vc3NyYFxyXG4gICAgfSk7XHJcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcIkxhbWJkYUBFZGdlIFNTUiBVUkxcIiwge1xyXG4gICAgICB2YWx1ZTogYGh0dHBzOi8vJHtkaXN0cmlidXRpb24uZGlzdHJpYnV0aW9uRG9tYWluTmFtZX0vZWRnZXNzcmBcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=