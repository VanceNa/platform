;(function() {
  // IE NodeList增加forEach方法polyfill
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
      thisArg = thisArg || window
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this)
      }
    }
  }
  //兼容 transfer-dom.js中 使用了 dataset 的问题
  if (window.HTMLElement) {
    if (
      Object.getOwnPropertyNames(HTMLElement.prototype).indexOf('dataset') ===
      -1
    ) {
      Object.defineProperty(HTMLElement.prototype, 'dataset', {
        get: function() {
          var attributes = this.attributes //获取节点的所有属性
          var name = [],
            value = [] //定义两个数组保存属性名和属性值
          var obj = {} //定义一个空对象
          for (var i = 0; i < attributes.length; i++) {
            //遍历节点的所有属性
            if (attributes[i].nodeName.slice(0, 5) == 'data-') {
              //如果属性名的前面5个字符符合"data-"
              // 取出属性名的"data-"的后面的字符串放入name数组中
              name.push(attributes[i].nodeName.slice(5))
              //取出对应的属性值放入value数组中
              value.push(attributes[i].nodeValue)
            }
          }
          for (var j = 0; j < name.length; j++) {
            //遍历name和value数组
            obj[name[j]] = value[j] //将属性名和属性值保存到obj中
          }
          return obj //返回对象
        },
      })
    }
  }
  // add your global config
  window.g = {
    // 服务器地址现在在构建阶段的环境变量文件中定义（或者命令行参数注入）
    // 非必要，请不要将业务代码参数值暴露到全局环境中
    // 全局变量中的变量，可以被用户恶意修改
    // 此文件为兼容之前版本的设定，如果在下面定义了url，则优先使用下面定义的值
    // 全局的url地址, 对应baseUrl
    // url: 'http://10.0.2.197',
    // 人机融合功能模块接口地址
    //  hrWsUrl: 'http://10.0.2.178:9081',
    // 人际融合websocket地址
    //  hrBaseUrl: 'http://10.0.2.197:80/hris/',
    // 机器人功能模块迁移至中台使用的url, 暴露出来供后端同学调试使用
    // 目前模块包括: 未知问题、报表管理、整体运营图表、交互日志、机器人参数、外呼管理、数据模板、通话设置等..
    // uicsrUrl: 'http://10.0.2.197/uicsr/',
    // webrtc账号注册及释放url
    // webrtcUrl: 'http://10.0.33.65:7555',
    // mspUrl:'http://10.0.11.128:7555',
     mspUrl:'http://10.0.6.96:7555',
    //  http://10.0.6.96:7555/api/config/rtasr/query
    accessKey:'12afe1a5157311eabf17000c29de6cf3'
  }
})()
