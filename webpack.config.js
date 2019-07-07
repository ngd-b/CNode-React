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
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader"
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    resolve:{
        extensions:[".js",".json"],
        alias:{
            '@api':path.join(__dirname,"./src/API"),
            '@public':path.join(__dirname,"./public"),
            '@static':path.join(__dirname,"./public/static/"),
            '@css':path.join(__dirname,"./public/static/style")
        }
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