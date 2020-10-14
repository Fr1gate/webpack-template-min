const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../public'),
    assets: 'static',
    
}
const PAGES_DIR =  `${PATHS.src}/pug/pages`
const PAGES = fs.readdirSync(PAGES_DIR).filter(filename => filename.endsWith('.pug'));

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
        publicPath: './'
    },
    module: {
        rules: [{
            test: /\.js$/i,
            loader: 'babel-loader',
            exclude: '/node_modules/',
        },
        {
            test: /\.pug$/i,
            loader: 'pug-loader',
        },
        {
            test: /\.(png|gif|jpeg|jpg|svg)$/i,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: PATHS.assets + '/img',
            }
        },
        {
            test: /\.css$/i,
            use:  [
                'style-loader', 
                MiniCssExtractPlugin.loader, 
                {
                    loader: 'css-loader',
                    options: { 
                        sourceMap: true,
                        url: false, 
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: { 
                        sourceMap: true, 
                        postcssOptions: {
                            config:  path.resolve(__dirname, '../postcss.config.js')
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
                    options: { 
                        sourceMap: true,
                        url: false, 
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: { 
                        sourceMap: true, 
                        postcssOptions: {
                            config:  path.resolve(__dirname, '../postcss.config.js')
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                },
                {
                    laoder: 'resolve-url-loader'
                },
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

        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug$/, '.html')}`
        }))
    ],
}