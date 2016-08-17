// var webpack = require('webpack');

module.exports = {
    entry: [
        './src/app.js',
    ],
    output: {
        path: __dirname + '/js',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!' + 'css?sourceMap'
            },
            {
                test: /\.scss$/,
                loader: 'style!' + 'css?sourceMap' + '!sass?sourceMap'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader?optional[]=runtime']
            },
            {
                test: /\.(json)$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            },

            {
                test: /\.(svg|ttf|woff|woff2|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader"
            }

        ]
    },
    // plugins: [
    //   new webpack.HotModuleReplacementPlugin()
    // ],
    devtool: 'source-map'
};
