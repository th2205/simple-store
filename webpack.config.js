const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },

  output: {
    filename: "simple-store.js",
    library: {
      name: "Store",
      type: "umd",
      export: "default",
    },
  },
};
