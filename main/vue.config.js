const port = 8000;
const publicPath = '/' // 默认为 / 表示服务器根路径
module.exports = {
  lintOnSave: false,
  devServer: {
    port: port,
    overlay: {
      warning: false,
      errors: false,
    },
  },
  configureWebpack: {
    output: {
      library: "vueApp",
      libraryTarget: "umd",
      //   publicPath:`//localhost:${port}`
    },
  },
  //解决在父应用中资源404 的问题
  chainWebpack: (config) => {
    config.module.rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:8].[ext]',
            publicPath
          }
        }
      })
      .end();
    config.module.rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            publicPath
          }
        }
      })
  },
};
