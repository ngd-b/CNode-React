const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    mode:"development",
    entry:"./src/index.js",
    output:{
        filename:"main.js",
        path:path.resolve(__dirname,"dist")
    },
    module:{
        rules:[
            {test:/\.js$/,exclude:/node_modules/,loader:"babel-loader"}
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            template:path.join(__dirname+"/public/index.html")
        })
    ],
    optimization:{
        minimizer:[new UglifyJsPlugin()]
    }
};