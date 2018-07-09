var func_sha1 = require('../../utils/sha1.js')

Page({
  data: {
    send: false,
    alreadySend: false,
    second: 60,
    disabled: true,
    buttonType: 'default',
    phoneNum: '',
    code: '',
    idNum: '',
    appKey: 'b0871db68b69d17513822155a4f886df',
    appSecret: 'c85ba8afd419',
    nonce: '4tgggergigwow323t23t',
    curTime: '1443592222',
    checkSum: ''
  },

// 手机号部分
  inputPhoneNum: function (e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        })
        console.log('phoneNum:' + this.data.phoneNum)
        this.showSendMsg()
        this.activeButton()
      }
    } else {
      this.setData({
        phoneNum: ''
      })
      this.hideSendMsg()
    }
  },

  checkPhoneNum: function (phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
      })
      return false
    }
  },

  showSendMsg: function () {
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSendMsg: function () {
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },

  sendMsg: function () {
    var str_sha1 = func_sha1.hex_sha1(this.data.appSecret + this.data.nonce + this.data.curTime);
    this.setData({
      checkSum: str_sha1
    })
    wx.request({
      url: 'https://api.netease.im/sms/sendcode.action',
      data: {
        mobile: '18116402505'
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "AppKey": this.data.appKey,
        "Nonce": this.data.nonce,
        "CurTime": this.data.curTime,
        "CheckSum": this.data.checkSum,
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)

      }
    })
    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
  },

  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },

// 身份证部分
  addidNum: function (e) {
    this.setData({
      idNum: e.detail.value
    })
    this.activeButton()
    console.log('idNum: ' + this.data.idNum)
  },

// 验证码
  addCode: function (e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
    console.log('authNum:' + this.data.code)
  },

 // 按钮
  activeButton: function () {
    let {phoneNum, code, idNum} = this.data
    console.log(code)
    if (phoneNum && code && idNum) {
      this.setData({
        disabled: false,
        buttonType: 'primary'
      })
    } else {
      this.setData({
        disabled: true,
        buttonType: 'default'
      })
    }
  },

  onSubmit: function () {
    wx.redirectTo({
      url: '../jumpPage/jumpPage',
    })
    // wx.request({
    //   url: 'https://api.netease.im/sms/verifycode.action',
    //   data: {
    //     mobile: '18116402505',
    //     code: this.data.code
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    //     "AppKey": this.data.appKey,
    //     "Nonce": this.data.nonce,
    //     "CurTime": this.data.curTime,
    //     "CheckSum": this.data.checkSum,
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     if ((parseInt(res.data.code) === 200)) {
    //       wx.redirectTo({
    //         url: '../jumppage/jumppage',
    //       })
    //     } else {
    //       wx.showToast({
    //         title: '验证码错误！',
    //       })
    //     }
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   },
    // })
  }
})
