Page({
  data: {
    disabled: false,
    buttonType: 'primary'
  },

  contList: function () {
    wx.navigateTo({
      url: '../contlists/contlists',
    })
  },

  signCont: function() {
    wx.redirectTo({
      url: '../stepone/stepone',
    })
  }
})
