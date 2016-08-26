var path = require('path'),
    webpack = require('webpack'),
    app_path = __dirname.replace('builder/config', '') + '/',
    entry_path = path.resolve(app_path, 'src/harper-banner'),
    output_path = path.resolve(app_path, 'src/harper-banner');

module.exports =
{
    entry: {
        'harper-banner': entry_path,
        'harper-banner.min': entry_path
    },

    output: {
        path: output_path,
        filename: "[name].js"
    },

    resolve: {
        extensions: ['', '.js']
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            include: /\.min\.js$/,
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ],

    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: /\.jsx?$/,
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }
};
