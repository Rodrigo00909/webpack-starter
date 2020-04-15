const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetisPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

 
 
module.exports = {
 
    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetisPlugin() ]
    },

    output: {
        filename: 'main.[contentHash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                loader: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/i,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]  
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                loader: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin()
    ]
 
    
}
 