Page({
  data: {
    disabled: false,
    buttonType: 'primary'
  },
  takeVideo: function () {
    wx.redirectTo({
      url: '../video/video',
    })
  }
})
