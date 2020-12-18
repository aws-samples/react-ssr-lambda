const path = require("path");

module.exports = {
  entry: "./src/edge/index.js",

  target: "node",

  externals: [],

  output: {
    path: path.resolve("edge-build"),
    filename: "index.js",
    library: "index",
    libraryTarget: "umd",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: "css-loader",
      },
    ],
  },
};
