const webpack = require("webpack");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(false),
      API_RANDOMUSER_BASE_URL: JSON.stringify("https://randomuser.me/api"),
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: true,
    })],
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      maxSize: 128000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  performance: {
    hints: false
  },
});