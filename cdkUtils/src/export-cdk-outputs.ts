import {
    CloudFormationClient,
    DescribeStacksCommand,
  } from '@aws-sdk/client-cloudformation';
  import { writeFileSync } from 'fs';
  import * as path from 'path';

const whitelist = ['apiurl'];

(async () => {
  const client = new CloudFormationClient({
    region: process.env.AWS_DEFAULT_REGION,
  });
  const stackName = 'Main-ApiStack';
  try {
    const describeStacks = new DescribeStacksCommand({
      StackName: stackName,
    });
    const response = await client.send(describeStacks);
    const stack = response.Stacks?.find(stack => stack.StackName === stackName);
    if (stack) {
      const variables = (stack.Outputs || [])
        .filter(({ OutputKey }) => OutputKey && whitelist.includes(OutputKey))
        .reduce(
          (acc, { OutputKey, OutputValue }) => ({
            ...acc,
            [String(OutputKey)]: String(OutputValue),
          }),
          {} as Record<string, string>,
        );
          //write variables to file
          try {
            writeFileSync(path.join(__dirname, '../../simple-ssr/src/config.json'), JSON.stringify(variables));
          }
          catch (err) {
            console.error(err);
          }
          
    }
  } catch {
    /* NOOP */
  }
})();