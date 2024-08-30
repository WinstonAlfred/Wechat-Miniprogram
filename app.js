// app.js
import { ENV } from './env.js';

App({
  onLaunch() {
    wx.cloud.init({
      env: ENV.CLOUD_ENV
    })
    
    if (wx.getStorageSync('cartList')) {
      this.globalData.cartList = wx.getStorageSync('cartList')
    }

    // Use OpenID to separate each user's order
    wx.cloud.callFunction({
      name: 'shop_get_openid'
    }).then(res => {
      console.log(res.result.openid)
      this.globalData.openid = res.result.openid;
      this.checkUserLogin();
    })
  },
  
  globalData: {
    userInfo: null,
    openid: null,
    cartList: [],
    orderList: null
  },

  checkUserLogin() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },

  updateUserInfo(userInfo) {
    this.globalData.userInfo = userInfo;
    wx.setStorageSync('userInfo', userInfo);
  },

  clearUserInfo() {
    this.globalData.userInfo = null;
    wx.removeStorageSync('userInfo');
  },

  addUserToDatabase(userInfo) {
    return wx.cloud.database().collection('shop_user').add({
      data: {
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        openid: this.globalData.openid
      }
    });
  }
});