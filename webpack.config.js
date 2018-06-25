const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: ["babel-polyfill", "./src/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "UI/assets/js"),
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      }
    ]
  },
  devtool: "inline-source-map"
};
