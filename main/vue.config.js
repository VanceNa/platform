const port = 8000;
// 生产环境构建输出文件的目录
const outputDir = "dist";
// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
const assetsDir = "static";
// 针对前端单独部署时的情况，非部署到java容器中
const publicPath = "/"; // 默认为 / 表示服务器根路径

module.exports = {
  publicPath,
  outputDir,
  assetsDir,

  runtimeCompiler: true,
  lintOnSave: false,
  devServer: {
    port: port,
    overlay: {
      warning: false,
      errors: false,
    },
  },
  transpileDependencies: ["qs", "querystring", "utvue"],
  configureWebpack: {
    output: {
      library: "vueApp",
      libraryTarget: "umd",
      //   publicPath:`//localhost:${port}`
    },
  },
  //解决在父应用中资源404 的问题
  chainWebpack: (config) => {
    config.module
      .rule("fonts")
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[hash:8].[ext]",
            publicPath,
          },
        },
      })
      .end();
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 4096, // 小于4kb将会被打包成 base64
        fallback: {
          loader: "file-loader",
          options: {
            name: "img/[name].[hash:8].[ext]",
            publicPath,
          },
        },
      });
  },
  productionSourceMap: false, // true时可开启产品模式源码映射，方便排查问题
  pluginOptions: {
    // registerService: {
    //   //
    //   initSubModule: require('./build/submodule-init'),
    // },

    service: {
      copy: {
        "static/": `${outputDir}/${assetsDir}`,
      },

      compress: {
        name: "zip/main.zip",
      },

      mock: false,

      // initSubModule: false,
    },
  },
};
