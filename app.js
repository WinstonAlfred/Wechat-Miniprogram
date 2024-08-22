// app.js
App({
  onLaunch() {
    
    wx.cloud.init({
      env:'tianyi-9ggnnj8xa7b81241'
    })

  },
  globalData: {
    userInfo: null
  }
})
