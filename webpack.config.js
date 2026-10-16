const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(
            __dirname,
            "dist"
        ),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
    ],
    devServer: {
        static: "./dist",
        port: 8080,
        open: true,
        hot: true,
    },
};