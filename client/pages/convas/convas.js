Page({
  data: {
    pen: 3,
    color: '#cc0033',
    disabled: false,
    buttonType: 'primary',
    allDrawWorksPath: []
  },
  startX: 0,
  startY: 0,
  isClear: false,

  touchStart: function (e) {

    this.startX = e.changedTouches[0].x
    this.startY = e.changedTouches[0].y
    this.context = wx.createContext()
    if (this.isClear) {
      this.context.setStrokeStyle('blanchedalmond')
      this.context.setLineCap('round')
      this.context.setLineJoin('round')
      this.context.setLineWidth(20)
      this.context.save()
      this.context.beginPath()
      this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, true)
      this.context.fill()
      this.context.restore()
    } else {
      this.context.setStrokeStyle(this.data.color)
      this.context.setLineWidth(this.data.pen)
      this.context.setLineCap('round')
      this.context.beginPath()
    }
  },

  touchMove: function (e) {
    var startX1 = e.changedTouches[0].x
    var startY1 = e.changedTouches[0].y
    if (this.isClear) {
      this.context.save()
      this.context.moveTo(this.startX, this.startY)
      this.context.lineTo(startX1, startY1)
      this.context.stroke()
      this.context.restore()
      this.startX = startX1
      this.startY = startY1
    } else {
      this.context.moveTo(this.startX, this.startY)
      this.context.lineTo(startX1, startY1)
      this.context.stroke()
      this.startX = startX1;
      this.startY = startY1;
    }

    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: this.context.getActions()
    })
  },

  touchEnd: function () {
  },

  clearCanvas: function () {
    if (this.isClear) {
      this.isClear = false;
    } else {
      this.isClear = true;
    }
  },

  navigate_one: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  navigate_two: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  onSubmit: function () {

  }
})
