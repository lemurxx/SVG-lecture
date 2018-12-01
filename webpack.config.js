const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'map': './src/ts/map.ts'
    },
    output: {
        path: path.join(__dirname, '/'),
        filename: 'build/[name].js'
    },
    plugins: [
        new ExtractTextPlugin('build/[name].css'),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            parallel: true
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] }),
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'less-loader'] })
            }, {
            
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader",//"url-loader?limit=8192"
                options: {
                     outputPath: 'build/',
                     name: '[name].[ext]',
                }
            }, {
                test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                     outputPath: 'build/',
                      name: '[name].[ext]',
                }
            }]
    }, node: {
        fs: 'empty',
        child_process: 'empty'
    }
}