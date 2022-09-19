const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",

  devServer: {
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    port: 8081,
  },
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
