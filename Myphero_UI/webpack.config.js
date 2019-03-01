const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
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
                use : ["css-loader","style-loader"]
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
            filename : "./index.html"
        })
    ]
};