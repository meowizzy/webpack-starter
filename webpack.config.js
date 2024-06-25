const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";
const __IS_DEV__ = mode === "development";
const target = __IS_DEV__ ? "web" : "browserslist";
const devtool = __IS_DEV__ ? "source-map" : undefined;

module.exports = {
    mode,
    target,
    devtool,
    entry: [
        "@babel/polyfill",
        path.resolve(__dirname, "src", "./js/index.js"),
        path.resolve(__dirname, "src", "./scss/main.scss")
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.[contenthash].js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: "css/bundle.[contenthash].css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    __IS_DEV__ ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["postcss-preset-env"],
                                ],
                            },
                        }
                    }
                ]
            },
            {
                test: /\.woff2?$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]"
                }
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/[name][ext]"
                }
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: "/(node_modules|bower_components)/",
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ],
                    },
                }
            }
        ]
    },
    devServer: __IS_DEV__ ? {
        static: {
            directory: path.join(__dirname, "./dist")
        },
        port: 5019,
        open: true,
        historyApiFallback: true,
        hot: true,
        liveReload: true
    } : undefined,
}