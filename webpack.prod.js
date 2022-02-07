const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        main: './src/client/index.js'
    },
    output: {
        libraryTarget: 'var',
        library: 'Client',
        filename: '[name].[contenthash].js',
        assetModuleFilename: '[name][ext]',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    optimization: {
        minimizer: [
            new TerserPlugin({}),
            new CssMinimizerWebpackPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(svg|png|ico)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        // new WorkboxPlugin.GenerateSW()
    ]
}