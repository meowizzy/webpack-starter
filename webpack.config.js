const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
        clean: {
            keep: /textolite\//
        },
        assetModuleFilename: "assets/[name].[contenthash][ext]",
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader",
                options: {
                    knownHelpersOnly: false,
                    inlineRequires: '\/images/*/\/'
                },
            },
            {
                test: /\.(scss|sass|less|css)$/,
                use: [
                    __IS_DEV__ ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["postcss-preset-env"],
                                ],
                            },
                        }
                    },
                    "sass-loader",
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]"
                }
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                type: "asset/resource",
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
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.hbs"),
            filename: "index.html",
            inject: "body",
            chunks: ["main"],
            minify: false
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "uz.hbs"),
            filename: "uz.html",
            inject: "body",
            chunks: ["main"],
            minify: false
        }),
        new MiniCssExtractPlugin({
            filename: "css/bundle.[contenthash].css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/images",  to: "./assets" }
            ]
        })
    ],
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