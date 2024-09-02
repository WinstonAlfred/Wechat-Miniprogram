// app.js
import { ENV } from './env.js';

App({
  onLaunch() {
    wx.cloud.init({
      env: ENV.CLOUD_ENV
    })
    
    // Load cart data from storage
    if (wx.getStorageSync('cartList')) {
      this.globalData.cartList = wx.getStorageSync('cartList')
    }

    // Load user info from storage
    const storedUserInfo = wx.getStorageSync('userInfo')
    if (storedUserInfo) {
      this.globalData.userInfo = storedUserInfo
    }

    // Load stored openid
    const storedOpenid = wx.getStorageSync('openid')
    if (storedOpenid) {
      this.globalData.openid = storedOpenid
    }

    // If no stored openid, fetch it from the server
    if (!this.globalData.openid) {
      this.getOpenid()
    }
  },
  
  getOpenid() {
    wx.cloud.callFunction({
      name: 'shop_get_openid'
    }).then(res => {
      console.log('Fetched openid:', res.result.openid)
      this.globalData.openid = res.result.openid
      wx.setStorageSync('openid', res.result.openid)
    }).catch(error => {
      console.error('Failed to get openid:', error)
    })
  },
  
  globalData: {
    userInfo: null,
    openid: null,
    cartList: [],
    orderList: null
  },

  // Helper function to update user info
  updateUserInfo(userInfo) {
    this.globalData.userInfo = userInfo
    wx.setStorageSync('userInfo', userInfo)
  },

  // Helper function to clear user info (for logout)
  clearUserInfo() {
    this.globalData.userInfo = null
    wx.removeStorageSync('userInfo')
  }
});