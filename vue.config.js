const path = require("path");

// 使用等比适配插件
module.exports = {
  lintOnSave: true
};

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@commons", resolve("src/components/commons"));
  },
  baseUrl: "./",
  devServer: {
    disableHostCheck: true,
    port: 8080
    //publicPath: '../',  //这里解决静态资源引用路径问题
  }
};
