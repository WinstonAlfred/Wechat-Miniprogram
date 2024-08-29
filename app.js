// app.js
import { ENV } from './env.js';


App({
  onLaunch() {
    
    wx.cloud.init({
      env: ENV.CLOUD_ENV
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
