const webpack = require('webpack');

module.exports = {
    mode: 'development',
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(woff2?|ttf|eot|svg)$/,
                loader: 'url-loader?limit=10000'
            },
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.ProvidePlugin({
            'BS': 'react-bootstrap'
        }),
    ],
    node: {
        fs: 'empty'
    }
};