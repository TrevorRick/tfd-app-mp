//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    requestResult: '',
    buttonType: 'primary',
    disabled: false
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: config.service.randomUrl,
      success: function(res) {
        util.showSuccess('请求完成')
        that.setData({
          requestResult: JSON.stringify(res.data)
        })
      },
      fail: function(e) {
        util.showModel('请求失败');
        console.log(e);
      }
    })
  },
  takeVideo: function() {
    wx.navigateTo({
      url: '../takeVideo/takeVideo',
    })
  }
})
