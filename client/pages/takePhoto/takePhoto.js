var app = getApp();
var util = require('../../utils/util.js');

Page({

  onLoad: function () {
    wx.chooseImage({
      cout: 1,
      sizeType: ['original', 'compressed'],

      sourceType: ['camera'],
      camera: 'front',
      success: function (res) {
        //成功则返回图片的本地路径列表tempFilePaths
        util.showBusy('图片正在上传')
        var tempFilePath = res.tempFilePaths[0];
        app.globalData.tempFilePath = tempFilePath;
      },
      fail: function (e) {
        console.log(e)
      },
      complete: function () {
        wx.redirectTo({
          url: '../idcardInfo/idcardInfo',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
