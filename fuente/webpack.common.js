const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin, } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: ["./src/main.tsx"],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        use: [MiniCssExtractPlugin.loader, "css-loader",],
        test: /\.(css|scss|sass)$/,
      },
      {
        type: "asset",
        test: /\.(png|svg|jpg|gif|ico|woff|woff2|eot|ttf|otf)$/,
      },
    ],
  },
};