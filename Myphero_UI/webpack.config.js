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

    plugins : [
        new HTMLWebpackPlugin({
            template : "./src/app/index.html",
            filename : "./index.html"
        })
    ]
};