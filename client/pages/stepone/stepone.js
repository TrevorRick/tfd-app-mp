Page({
  data: {
    disabled: false,
    buttonType: 'primary'
  },
  takePhoto: function () {
    wx.redirectTo({
      url: '../takePhoto/takePhoto',
    })
  }
})
