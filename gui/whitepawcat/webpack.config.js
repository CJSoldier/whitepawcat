// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = function(webpackConfig) {
  webpackConfig.plugins.push(new CopyWebpackPlugin([{from:'./preference.js', to:'./'}]));
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css',
  }]);

  return webpackConfig;
};
