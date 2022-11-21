#!/usr/bin/env node
"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyPipelineStack = void 0;
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const pipelines_1 = require("aws-cdk-lib/pipelines");
const demoEnv = { region: "us-east-1" };
const app = new cdk.App();
class MyPipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const pipeline = new pipelines_1.CodePipeline(this, 'Pipeline', {
            pipelineName: 'MyPipeline',
            synth: new pipelines_1.CodeBuildStep("SynthStep", {
                input: pipelines_1.CodePipelineSource.connection("ehalsey/react-ssr-lambda", "main", {
                    connectionArn: "arn:aws:codestar-connections:us-west-1:263870947518:connection/7d190900-3cfe-4f09-b4ad-60b1ad7a1c0d"
                }),
                installCommands: ["yarn install"],
                commands: ["yarn run build", "yarn cdk synth"]
            })
        });
    }
}
exports.MyPipelineStack = MyPipelineStack;
new MyPipelineStack(app, 'MyPipelineStack', {
    env: {
        account: '263870947518',
        region: 'eu-east-1',
    }
});
// new ApiStack(app, "SSRApiStack", { env: demoEnv });
// new SsrStack(app, "SSRAppStack", { env: demoEnv });
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EscUVBQXFFO0FBQ3JFLGlDQUFpQzs7O0FBRWpDLHVDQUFxQztBQUNyQyxtQ0FBbUM7QUFJbkMscURBQW1HO0FBRW5HLE1BQU0sT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDO0FBQ3hDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLE1BQWEsZUFBZ0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMxQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sUUFBUSxHQUFHLElBQUksd0JBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2xELFlBQVksRUFBRSxZQUFZO1lBQzFCLEtBQUssRUFBRSxJQUFJLHlCQUFhLENBQUMsV0FBVyxFQUFFO2dCQUNwQyxLQUFLLEVBQUUsOEJBQWtCLENBQUMsVUFBVSxDQUNsQywwQkFBMEIsRUFDMUIsTUFBTSxFQUNOO29CQUNFLGFBQWEsRUFDWCxxR0FBcUc7aUJBQ3hHLENBQ0Y7Z0JBQ0QsZUFBZSxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUNqQyxRQUFRLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQzthQUMvQyxDQUFDO1NBQ0gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBcEJILDBDQW9CRztBQUdILElBQUksZUFBZSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBRTtJQUMxQyxHQUFHLEVBQUU7UUFDSCxPQUFPLEVBQUUsY0FBYztRQUN2QixNQUFNLEVBQUUsV0FBVztLQUNwQjtDQUNGLENBQUMsQ0FBQztBQUVILHNEQUFzRDtBQUN0RCxzREFBc0Q7QUFFdEQsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxyXG4vLyBDb3B5cmlnaHQgQW1hem9uLmNvbSwgSW5jLiBvciBpdHMgYWZmaWxpYXRlcy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVC0wXHJcblxyXG5pbXBvcnQgXCJzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXJcIjtcclxuaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYlwiO1xyXG5pbXBvcnQgeyBBcGlTdGFjayB9IGZyb20gXCIuLi9saWIvYXBpLXN0YWNrXCI7XHJcbmltcG9ydCB7IFNzclN0YWNrIH0gZnJvbSBcIi4uL2xpYi9zcnItc3RhY2tcIjtcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcbmltcG9ydCB7IENvZGVCdWlsZFN0ZXAsIENvZGVQaXBlbGluZSwgQ29kZVBpcGVsaW5lU291cmNlLCBTaGVsbFN0ZXAgfSBmcm9tICdhd3MtY2RrLWxpYi9waXBlbGluZXMnO1xyXG5cclxuY29uc3QgZGVtb0VudiA9IHsgcmVnaW9uOiBcInVzLWVhc3QtMVwiIH07XHJcbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgTXlQaXBlbGluZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcbiAgXHJcbiAgICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IENvZGVQaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XHJcbiAgICAgICAgcGlwZWxpbmVOYW1lOiAnTXlQaXBlbGluZScsXHJcbiAgICAgICAgc3ludGg6IG5ldyBDb2RlQnVpbGRTdGVwKFwiU3ludGhTdGVwXCIsIHtcclxuICAgICAgICAgIGlucHV0OiBDb2RlUGlwZWxpbmVTb3VyY2UuY29ubmVjdGlvbihcclxuICAgICAgICAgICAgXCJlaGFsc2V5L3JlYWN0LXNzci1sYW1iZGFcIixcclxuICAgICAgICAgICAgXCJtYWluXCIsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBjb25uZWN0aW9uQXJuOlxyXG4gICAgICAgICAgICAgICAgXCJhcm46YXdzOmNvZGVzdGFyLWNvbm5lY3Rpb25zOnVzLXdlc3QtMToyNjM4NzA5NDc1MTg6Y29ubmVjdGlvbi83ZDE5MDkwMC0zY2ZlLTRmMDktYjRhZC02MGIxYWQ3YTFjMGRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgaW5zdGFsbENvbW1hbmRzOiBbXCJ5YXJuIGluc3RhbGxcIl0sXHJcbiAgICAgICAgICBjb21tYW5kczogW1wieWFybiBydW4gYnVpbGRcIiwgXCJ5YXJuIGNkayBzeW50aFwiXVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5uZXcgTXlQaXBlbGluZVN0YWNrKGFwcCwgJ015UGlwZWxpbmVTdGFjaycsIHtcclxuICBlbnY6IHtcclxuICAgIGFjY291bnQ6ICcyNjM4NzA5NDc1MTgnLFxyXG4gICAgcmVnaW9uOiAnZXUtZWFzdC0xJyxcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gbmV3IEFwaVN0YWNrKGFwcCwgXCJTU1JBcGlTdGFja1wiLCB7IGVudjogZGVtb0VudiB9KTtcclxuLy8gbmV3IFNzclN0YWNrKGFwcCwgXCJTU1JBcHBTdGFja1wiLCB7IGVudjogZGVtb0VudiB9KTtcclxuXHJcbmFwcC5zeW50aCgpO1xyXG5cclxuIl19