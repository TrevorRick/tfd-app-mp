Page({
  data: {
    disabled: false,
    buttonType: 'default'
  },

  backTo: function () {
    wx.navigateBack({

    })
  },

  signContract: function () {
    wx.redirectTo({
      url: '../stepone/stepone',
    })
  }
})