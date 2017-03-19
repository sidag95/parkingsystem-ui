const path = require('path');
const webpack = require('webpack')

const PROJECT_ROOT = __dirname
const SRC_DIR = PROJECT_ROOT + '/src/entry-points'
const BUILD_DIR = PROJECT_ROOT + '/build'

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
    context: SRC_DIR,
    entry: './index.js',
    output: {
        path: BUILD_DIR,
        filename: 'index_bundle.js'
    },
    devServer: {
        hot: true,
        contentBase: SRC_DIR
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(woff|woff2)$/, loader: 'url-loader?limit=100000'}, 
            { test: /\.(svg|png|jpg|ttf|eot)$/, loader: 'file-loader'}
        ]
    },
    plugins: [HtmlWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
    ]
}