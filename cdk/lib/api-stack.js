"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigw = require("aws-cdk-lib/aws-apigateway");
class ApiStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const apiFunction = new lambda.Function(this, "apiHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("../simple-ssr/api"),
            memorySize: 128,
            timeout: aws_cdk_lib_1.Duration.seconds(5),
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
exports.ApiStack = ApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxRUFBcUU7QUFDckUsaUNBQWlDOzs7QUFFakMsbUNBQW1DO0FBQ25DLDZDQUF1QztBQUN2QyxpREFBaUQ7QUFDakQsb0RBQW9EO0FBR3BELE1BQWEsUUFBUyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3JDLFlBQVksS0FBMkIsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDekUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDMUQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUM7WUFDaEQsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsc0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sRUFBRSxlQUFlO1NBQ3pCLENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3ZELE9BQU8sRUFBRSxXQUFXO1lBQ3BCLDJCQUEyQixFQUFFO2dCQUMzQixZQUFZLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUNwQyxZQUFZLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXO2FBQ3JDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNGO0FBdEJELDRCQXNCQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTUlULTBcclxuXHJcbmltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcclxuaW1wb3J0IHsgRHVyYXRpb24gfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcclxuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XHJcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheVwiO1xyXG5pbXBvcnQgKiBhcyBjb25zdHJ1Y3RzIGZyb20gXCJjb25zdHJ1Y3RzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQXBpU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjb25zdHJ1Y3RzLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgY29uc3QgYXBpRnVuY3Rpb24gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiYXBpSGFuZGxlclwiLCB7XHJcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxyXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCIuLi9zaW1wbGUtc3NyL2FwaVwiKSxcclxuICAgICAgbWVtb3J5U2l6ZTogMTI4LFxyXG4gICAgICB0aW1lb3V0OiBEdXJhdGlvbi5zZWNvbmRzKDUpLFxyXG4gICAgICBoYW5kbGVyOiBcImluZGV4LmhhbmRsZXJcIlxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYXBpID0gbmV3IGFwaWd3LkxhbWJkYVJlc3RBcGkodGhpcywgXCJhcGlFbmRwb2ludFwiLCB7XHJcbiAgICAgIGhhbmRsZXI6IGFwaUZ1bmN0aW9uLFxyXG4gICAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6IHtcclxuICAgICAgICBhbGxvd09yaWdpbnM6IGFwaWd3LkNvcnMuQUxMX09SSUdJTlMsXHJcbiAgICAgICAgYWxsb3dNZXRob2RzOiBhcGlndy5Db3JzLkFMTF9NRVRIT0RTXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiYXBpdXJsXCIsIHsgdmFsdWU6IGFwaS51cmwgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==