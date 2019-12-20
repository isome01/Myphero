const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const outputDirectory = "dist";
const webpack = require('webpack');
const dotenv = require('dotenv');
const nodeExternals = require('webpack-node-externals')

const env = dotenv.config().parsed

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
}, {})

const clientConfig = {
    entry : "./src/app/index.js",
    output : {
        path : path.join( __dirname, outputDirectory),
        filename : "client.bundle.js",
        publicPath: '/'
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
                test : /\.(css)$/,
                use : ["style-loader","css-loader"] /* make sure to include style-loader first */
            },
            {
                test: /\.(jpg|png|svg|jpeg|PNG|JPG|SVG|JPEG)$/
            }

        ]
    },
    devServer: {
        port: env.CLIENT_PORT,
        open: false,
        historyApiFallback: true
    },
    plugins : [
        new HTMLWebpackPlugin({
            template : "./src/app/index.html",
        }),
        new webpack.DefinePlugin(envKeys)
    ]
}

const serverConfig = {
    entry: './server/index.js',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'server.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(envKeys),
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false
        }),
      new webpack.ProgressPlugin()
    ]
}


module.exports = [clientConfig, serverConfig]
