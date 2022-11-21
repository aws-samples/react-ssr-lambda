import { Artifact, Pipeline } from "aws-cdk-lib/aws-codepipeline";
// import { CdkPipeline } from "aws-cdk-lib/aws-codepipeline-actions";

const sourceArtifact = new Artifact();
const cloudAssemblyArtifact = new Artifact();

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