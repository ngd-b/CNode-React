const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const proxy = require("http-proxy-middleware");


module.exports = {
    mode:"development",
    entry:"./src/index.js",
    output:{
        filename:"main.js",
        path:path.resolve(__dirname,"dist")
    },
    devtool:"inline-source-map",
    devServer:{
        contentBase:path.join(__dirname,"dist"),
        port:8080,
        compress:true,  // 压缩一切服务
        proxy:[{
            context:['/topic'],
            target:"http://localhost:8080",
            pathRewrite:{"^/topic":""},
        }]
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
            '@css':path.join(__dirname,"./public/static/style"),
            "@CNode":path.join(__dirname,"./src/CNode"),
            "@Redux":path.join(__dirname,"./src/reducers")
        }
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            template:path.join(__dirname+"/public/index.html")
        }),
    ],
    optimization:{
        minimizer:[new UglifyJsPlugin()]
    }
};