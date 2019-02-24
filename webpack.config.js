const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postCSSLoaderPlugins = [
    require('autoprefixer')({
        browsers: [
            '> 0.3%',
            'last 7 versions',
            'Android >= 4',
            'Firefox >= 20',
            'iOS >= 8',
        ],
        flexbox: true,
    }),
];

if (process.argv[process.argv.length - 1] === 'production') {
    postCSSLoaderPlugins.push(require('cssnano')({preset: 'default'}));
}

module.exports = {
    entry: [
        path.resolve(__dirname, 'resources', 'js', 'app.js'),
        path.resolve(__dirname, 'resources', 'sass', 'app.scss'),
    ],
    output: {
        filename: 'app.js',
        chunkFilename: `[id].[chunkhash].js`,
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => postCSSLoaderPlugins,
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.png$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        new WebpackNotifierPlugin({
            alwaysNotify: process.argv[process.argv.length - 1] === 'development',
            skipFirstNotification: process.argv[process.argv.length - 1] === 'production',
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true,
        }),
    ],
    devtool: process.argv[process.argv.length - 1] === 'development' ? 'source-map' : false,
};