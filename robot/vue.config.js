const port = 20000;
const publicPath =
  process.env.NODE_ENV === "production"
    ? "https://qiankun.umijs.org/"
    : `http://localhost:${port}`;

module.exports = {
  lintOnSave: false,
  devServer: {
    port: port,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    overlay: {
      warning: false,
      errors: false,
    },
  },
  configureWebpack: {
    output: {
      library: "vueApp2",
      libraryTarget: "umd",
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
