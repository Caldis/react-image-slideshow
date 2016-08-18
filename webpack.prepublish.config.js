var path    = require('path');

var config = {
    entry: path.resolve(__dirname, './src/components/Slideshow/app.js'),
    output: {
        path: path.resolve(__dirname, './lib'),
        library: 'react-image-slideshow',
        libraryTarget: 'umd',
        filename: 'app.js'
    },
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-1']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css?modules&localIdentName=[local]-[hash:base64:5]"
            }
        ]
    },
    externals: {
        'react'       : 'umd react',
        'react-dom'   : 'umd react-dom',
        'react-portal': 'umd react-portal',
        'tween.js'    : 'umd tween.js'
    }
};

module.exports = config;