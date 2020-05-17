const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const datesTransformer = require('ts-transformer-dates/lib/transformer')
    .default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const reactConfig = (env, args) => {
    const isProduction = args.mode === 'production';

    return {
        target: 'electron-renderer',
        entry: { reactApp: './src/index.tsx' },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: isProduction
                ? 'app/[name].[contenthash].js'
                : 'app/[name].bundle.js',
        },
        optimization: {
            moduleIds: 'hashed',
            minimize: isProduction,
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
        devServer: {
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                    options: {
                        getCustomTransformers: function (program) {
                            return {
                                before: [datesTransformer(program)],
                            };
                        },
                    },
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    oneOf: [
                        {
                            test: /\.g\.s[ac]ss$/,
                            use: ['style-loader', 'css-loader', 'sass-loader'],
                        },
                        {
                            use: [
                                isProduction
                                    ? MiniCssExtractPlugin.loader
                                    : 'style-loader',
                                {
                                    loader: 'css-loader',
                                    query: {
                                        modules: true,
                                        sourceMap: !isProduction,
                                        localIdentName: isProduction
                                            ? '[hash:base64:5]'
                                            : '[local]__[hash:base64:5]',
                                    },
                                },
                                'sass-loader',
                            ],
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|png)$/,
                    issuer: /\.scss?$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        },
                    },
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader',
                },
            ],
        },
        plugins: [
            isProduction
                ? new CleanWebpackPlugin()
                : new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: 'app/[name].[contenthash].css',
            }),
            new ManifestPlugin({
                fileName: 'asset-manifest.json',
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
        ],
    };
};

module.exports = reactConfig;
