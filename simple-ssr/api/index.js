// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

exports.handler = async (event) => {
  const responseCode = 200;
  const responseBody = [
    { id: 1, name: "item 1", desc: "product 1 description", price: "1.00" },
    { id: 2, name: "item 2", desc: "product 2 description", price: "2.00" },
    { id: 3, name: "item 3", desc: "product 3 description", price: "3.00" },
    { id: 4, name: "item 4", desc: "product 4 description", price: "4.00" },
    { id: 5, name: "item 5", desc: "product 5 description", price: "5.00" },
  ];
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };
  const response = {
    statusCode: responseCode,
    headers: headers,
    body: JSON.stringify(responseBody),
  };
  return response;
};
