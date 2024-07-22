const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(true),
      API_RANDOMUSER_BASE_URL: JSON.stringify("https://randomuser.me/api/1.4"),
    }),
  ],
  devtool: "eval-source-map",
  devServer: {
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },
  target: "web",
});
