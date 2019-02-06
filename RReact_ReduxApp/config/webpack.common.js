const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;

module.exports = function (env) {
    const isEnvDevelopment = env === 'dev';
    const isEnvProduction = env === 'prod';

    const getStyleLoaders = (cssOptions, preProcessor) => {
        const loaders = [
            isEnvDevelopment && require.resolve('style-loader'),
            isEnvProduction && {
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: require.resolve('css-loader'),
                options: cssOptions
            },
            {
                loader: require.resolve('postcss-loader'),
                options: {
                    ident: 'postcss',
                    plugins: () => [
                        require('autoprefixer')
                    ]
                }
            },
        ].filter(Boolean);

        if (preProcessor) {
            loaders.push({
                loader: require.resolve(preProcessor)
            });
        }

        return loaders;
    };

    return {
        entry: {
            polyfills: './polyfills.js',
            vendor: "./vendor.js",
            app: "./src/main.js"
        },

        resolve: {
            extensions: [".js", ".jsx"]
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: {
                                minimize: true,
                                caseSensitive: true,
                                removeAttributeQuotes: false
                            }
                        }
                    ]
                },
                {
                    test: cssRegex,
                    include: /node_modules/,
                    use: getStyleLoaders({ importLoaders: 1 })
                },
                {
                    test: sassRegex,
                    include: /node_modules/,
                    use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader')
                },
                {
                    test: cssRegex,
                    exclude: /node_modules/,
                    use: getStyleLoaders({ importLoaders: 1 })
                },
                {
                    test: sassRegex,
                    exclude: /node_modules/,
                    use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader')
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|bmp|gif|jpe?g|png)$/,
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: "static/media/[name].[ext]"
                    }
                },
                {
                    test: /\.(ico)$/,
                    use: "file-loader?name=[name].[ext]"
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",   // Input FileName
                filename: "./index.html"    // Output FileName
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                "window.jQuery": 'jquery',
                jquery: 'jquery'
            }),
            isEnvProduction && new MiniCssExtractPlugin({
                filename: 'static/css/[name].[hash].css',
                chunkFilename: 'static/css/[name].[hash].chunk.css'
            })
        ].filter(Boolean),

        optimization: {
            splitChunks: {
                chunks: "all"
            }
        }
    };
}