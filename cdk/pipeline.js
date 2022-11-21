"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_codepipeline_1 = require("aws-cdk-lib/aws-codepipeline");
// import { CdkPipeline } from "aws-cdk-lib/aws-codepipeline-actions";
const sourceArtifact = new aws_codepipeline_1.Artifact();
const cloudAssemblyArtifact = new aws_codepipeline_1.Artifact();
// const pipeline = new Pipeline(this, "Pipeline", {
//   pipelineName: "MyAppPipeline",
//   cloudAssemblyArtifact,
//   sourceAction: new codepipeline_actions.GitHubSourceAction({
//     actionName: "GitHub",
//     output: sourceArtifact,
//     oauthToken: SecretValue.secretsManager("github-token"),
//     owner: REPO_OWNER,
//     repo: REPO_name,
//     branch: "main",
//   }),
//   synthAction: SimpleSynthAction.standardNpmSynth({
//     sourceArtifact,
//     cloudAssemblyArtifact,
//     subdirectory: "cdk",
//     synthCommand: "npx cdk synth PipelineStack",
//   }),
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1FQUFrRTtBQUNsRSxzRUFBc0U7QUFFdEUsTUFBTSxjQUFjLEdBQUcsSUFBSSwyQkFBUSxFQUFFLENBQUM7QUFDdEMsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLDJCQUFRLEVBQUUsQ0FBQztBQUU3QyxvREFBb0Q7QUFDcEQsbUNBQW1DO0FBQ25DLDJCQUEyQjtBQUUzQixnRUFBZ0U7QUFDaEUsNEJBQTRCO0FBQzVCLDhCQUE4QjtBQUM5Qiw4REFBOEQ7QUFDOUQseUJBQXlCO0FBQ3pCLHVCQUF1QjtBQUN2QixzQkFBc0I7QUFDdEIsUUFBUTtBQUVSLHNEQUFzRDtBQUN0RCxzQkFBc0I7QUFDdEIsNkJBQTZCO0FBQzdCLDJCQUEyQjtBQUMzQixtREFBbUQ7QUFDbkQsUUFBUTtBQUNSLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcnRpZmFjdCwgUGlwZWxpbmUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNvZGVwaXBlbGluZVwiO1xyXG4vLyBpbXBvcnQgeyBDZGtQaXBlbGluZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY29kZXBpcGVsaW5lLWFjdGlvbnNcIjtcclxuXHJcbmNvbnN0IHNvdXJjZUFydGlmYWN0ID0gbmV3IEFydGlmYWN0KCk7XHJcbmNvbnN0IGNsb3VkQXNzZW1ibHlBcnRpZmFjdCA9IG5ldyBBcnRpZmFjdCgpO1xyXG5cclxuLy8gY29uc3QgcGlwZWxpbmUgPSBuZXcgUGlwZWxpbmUodGhpcywgXCJQaXBlbGluZVwiLCB7XHJcbi8vICAgcGlwZWxpbmVOYW1lOiBcIk15QXBwUGlwZWxpbmVcIixcclxuLy8gICBjbG91ZEFzc2VtYmx5QXJ0aWZhY3QsXHJcblxyXG4vLyAgIHNvdXJjZUFjdGlvbjogbmV3IGNvZGVwaXBlbGluZV9hY3Rpb25zLkdpdEh1YlNvdXJjZUFjdGlvbih7XHJcbi8vICAgICBhY3Rpb25OYW1lOiBcIkdpdEh1YlwiLFxyXG4vLyAgICAgb3V0cHV0OiBzb3VyY2VBcnRpZmFjdCxcclxuLy8gICAgIG9hdXRoVG9rZW46IFNlY3JldFZhbHVlLnNlY3JldHNNYW5hZ2VyKFwiZ2l0aHViLXRva2VuXCIpLFxyXG4vLyAgICAgb3duZXI6IFJFUE9fT1dORVIsXHJcbi8vICAgICByZXBvOiBSRVBPX25hbWUsXHJcbi8vICAgICBicmFuY2g6IFwibWFpblwiLFxyXG4vLyAgIH0pLFxyXG5cclxuLy8gICBzeW50aEFjdGlvbjogU2ltcGxlU3ludGhBY3Rpb24uc3RhbmRhcmROcG1TeW50aCh7XHJcbi8vICAgICBzb3VyY2VBcnRpZmFjdCxcclxuLy8gICAgIGNsb3VkQXNzZW1ibHlBcnRpZmFjdCxcclxuLy8gICAgIHN1YmRpcmVjdG9yeTogXCJjZGtcIixcclxuLy8gICAgIHN5bnRoQ29tbWFuZDogXCJucHggY2RrIHN5bnRoIFBpcGVsaW5lU3RhY2tcIixcclxuLy8gICB9KSxcclxuLy8gfSk7Il19