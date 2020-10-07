const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../public'),
    assets: 'static',
}

module.exports = {
    externals: {
        paths: PATHS
    },

    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}/js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/i,
            loader: 'babel-loader',
            exclude: '/node_modules/',
        },
        {
            test: /\.(png|gif|jpeg|jpg|svg)$/i,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        },
        {
            test: /\.css$/i,
            use:  [
                'style-loader', 
                MiniCssExtractPlugin.loader, 
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                },
                {
                    loader: 'postcss-loader',
                    options: { 
                        sourceMap: true, 
                        postcssOptions: {
                            config:  path.resolve(__dirname, 'postcss.config.js')
                        }
                    }
                }
            ],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader', 
                MiniCssExtractPlugin.loader, 
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                },
                {
                    loader: 'postcss-loader',
                    options: { 
                        sourceMap: true, 
                        postcssOptions: {
                            config:  path.resolve(__dirname, 'postcss.config.js')
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }
            ],
        },
    ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: `${PATHS.assets}/css/[name].css`,
        }),
        new CopyWebpackPlugin({patterns : [
            {
                from: `${PATHS.src}/img/`,
                to: `${PATHS.assets}/img`,
            },
            {
                from: `${PATHS.src}/static/`,
                to: ``,
            }
        ]}),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: `./index.html`
        }),
    ],
}