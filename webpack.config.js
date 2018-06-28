const path = require("path");
const srcPrefix = "./src/";

module.exports = {
  mode: "development",
  entry: {
    app: ["babel-polyfill", srcPrefix + "app.js"],
    helpers: srcPrefix + "helpers.js",
    showRequests: ["babel-polyfill", srcPrefix + "showRequests.js"],
    signup: ["babel-polyfill", srcPrefix + "signup.js"],
    login: ["babel-polyfill", srcPrefix + "login.js"],
    logout: srcPrefix + "logout.js"
  },
  output: {
    path: path.join(__dirname, "UI/assets/js"),
    publicPath: "/UI/assets/js",
    filename: "[name].js"
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
