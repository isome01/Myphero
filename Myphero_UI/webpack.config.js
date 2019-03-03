const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
    entry : "./src/index.js",
    output : {
        path : path.join( __dirname, outputDirectory),
        filename : "bundle.js"
    },
    module : {
        /* Set rules for all jsx files to be compiled by babel loader */
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                use : {
                    loader : "babel-loader"
                }
            },
            {
                test : /\.html$/,
                use : [{
                    loader : "html-loader"
                }]
            },
            {
                test : /\.css$/,
                use : ["style-loader","css-loader"] /* make sure to include style-loader first */
            }
            
        ]
    },
    devServer: {
        port: 3000,
        open: true,
        proxy: {
          "/api": "http://localhost:8080"
        }
    },
    plugins : [
        new HTMLWebpackPlugin({
            template : "./src/app/index.html",
        })
    ]
};