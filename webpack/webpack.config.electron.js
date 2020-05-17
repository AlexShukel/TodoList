const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const electronConfig = (env, args) => {
    const isProduction = args.mode === 'production';
    return {
        target: 'electron-main',
        entry: { electron: './src/electron.ts' },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: isProduction
                ? 'app/[name].[contenthash].js'
                : 'app/[name].bundle.js',
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
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
        ],
    };
};

module.exports = electronConfig;
