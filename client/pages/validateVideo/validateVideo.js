var config = require('../../config.js')
var util = require('../../utils/util.js')

Page({
  data: {
    disabled: false,
    buttonType: 'primary',
    name: '',
    id_card_number: '',
    procedure_validation: '',
    confidence: '',
    enabled: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(){
    let that = this;
    util.showBusy('活体视频验证中。')
    wx.request({
      url: config.service.validateVideoUrl,
      success: function(res){
        if (res.data.procedure_validation !== 'PASSED') {
          util.showModel('视频验证失败', "errmsg: " + res.data.procedure_validation + '。点击确定重新拍摄。', '../getRandomNum/getRandomNum');
          that.setData({
            procedure_validation: res.data.procedure_validation,
          })
        } else {
          that.setData({
            name: res.data.name,
            id_card_number: res.data.id_card_number,
            procedure_validation: res.data.procedure_validation,
            confidence: res.data.confidence,
            enabled: true
          })
        }
      },
      fail: function(e) {
        util.showModel('validateVideo err: ' + e);
      }
    })
  },
  OnReady: function () {

  },

  nextStep: function () {
    wx.redirectTo({
      url: '../pages/convas/convas'
    })
  },
  backToStep: function () {
    wx.navigateTo({
      delta: 2
    });
  }
})
