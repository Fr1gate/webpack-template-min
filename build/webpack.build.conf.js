const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const buildWebpackConfig = merge(baseWebpackConfig, {
    output: {
        filename: `${PATHS.assets}/js/[name].js`,
        path: PATHS.dist,
        publicPath: './'
    },
    mode: "production",
    plugins: []
})

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
})
