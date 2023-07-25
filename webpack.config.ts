import * as path from 'path';

import { type Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isProductionMode = process.env.NODE_ENV === 'production';

const distPath = path.resolve(__dirname, 'build');

// eslint-disable-next-line no-restricted-exports -- webpack requires default export
export default {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ].filter(Boolean),
    output: {
        publicPath: '/',
        filename: 'bundle.js',
        path: distPath,
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        static: {
            directory: distPath,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
        },
        port: 3001,
        hot: true,
    },
} as Configuration;
