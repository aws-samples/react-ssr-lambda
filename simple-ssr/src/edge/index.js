// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import ReactDOMServer from "react-dom/server";
import SSRApp from "../SSRApp";
import config from "../config.json";
import axios from "axios";

const indexFile = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <div>Rendered on Edge</div>
  </body>
</html>
`;

const handler = async function (event) {
  try {
    const request = event.Records[0].cf.request;
    if (request.uri === "/edgessr") {
      const url = config.SSRApiStack.apiurl;
      const result = await axios.get(url);
      const app = ReactDOMServer.renderToString(<SSRApp data={result.data} />);
      const html = indexFile.replace(
        '<div id="root"></div>',
        `<div id="root">${app}</div>`
      );
      return {
        status: "200",
        statusDescription: "OK",
        headers: {
          "cache-control": [
            {
              key: "Cache-Control",
              value: "max-age=100",
            },
          ],
          "content-type": [
            {
              key: "Content-Type",
              value: "text/html",
            },
          ],
        },
        body: html,
      };
    } else {
      return request;
    }
  } catch (error) {
    console.log(`Error ${error.message}`);
    return `Error ${error}`;
  }
};

export { handler };
