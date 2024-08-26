// app.js
App({
  onLaunch() {
    
    wx.cloud.init({
      env:'tianyi-9ggnnj8xa7b81241'
    })
    
  if(wx.getStorageSync('cartList')){
    this.globalData.cartList = wx.getStorageSync('cartList')
  }
},
  
  globalData: {
    userInfo: null,

    //cartList
    cartList:[]
  }
})
