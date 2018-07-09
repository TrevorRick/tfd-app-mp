/**
 * 小程序配置文件
 */

var host = 'https://www.furongleasing.com';

var config = {

  service: {
    host,

    // 上传图片接口
    uploadImgUrl: `${host}/weapp/upload/images`,

    // 上传视频接口
    uploadVideoUrl: `${host}/weapp/upload/videos`,

    // 活体视频验证提示接口
    randomUrl: `${host}/weapp/getrandomNum`,

    validateVideoUrl: `${host}/weapp/validateVideo`,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    /*
    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,
    */

  }
};

module.exports = config;
