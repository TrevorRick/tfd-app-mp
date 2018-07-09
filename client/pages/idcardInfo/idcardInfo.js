var app = getApp();
var config = require('../../config.js');
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    disabled: false,
    buttonType: 'primary',
    requestResult: '',
    tempFilePath: '',
    name: '',
    id_card_number: ''
  },
  onLoad: function () {
    var that = this;
    that.setData({
      tempFilePath: app.globalData.tempFilePath
    });
    console.log('tempFilePath: ' + that.data.tempFilePath);
    wx.uploadFile({
      url: config.service.uploadImgUrl,
      filePath: that.data.tempFilePath,
      name: 'file',
      success: function (res) {
        util.showSuccess('图片上传成功');
        res = JSON.parse(res.data);
        that.setData({
          name: res.name,
          id_card_number: res.id_card_number
        })
      },
      fail: function (e) {
        util.showModel('图片上传失败')
      }
    });

    /**
     * html解析示例
     */
    let tempFilePath = app.globalData.tempFilePath;
    var article = `
      <div style="text-align:center;margin-top:15px;">
        <h1 style="color: #000;size=50px" >身份证人像面信息</h1>
      </div>

      <div style="text-align:center;margin-top:20px;">
        <img src=${tempFilePath} alt="身份证人面像">
      </div>
    `;
    WxParse.wxParse('article', 'html', article, that, 100);
  },
  nextStep: function () {
    wx.redirectTo({
      url: '../getRandomNum/getRandomNum',
    })
  }
})
