const app = getApp()

Page({
  data: {
    userInfo: null
  },

  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  login() {
    wx.getUserProfile({
      desc: 'User Information',
    })
    .then(res => {
      console.log(res)
      this.setData({
        userInfo: res.userInfo
      })
      app.globalData.userInfo = res.userInfo
      wx.setStorageSync('userInfo', res.userInfo)

      return wx.cloud.database().collection('shop_user').add({
        data: {
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          openid: app.globalData.openid
        }
      })
    })
    .then(() => {
      wx.showToast({
        title: 'Login Successful',
        icon: 'none'
      })
    })
    .catch(err => {
      console.error('Login failed:', err)
      wx.showToast({
        title: 'Login Failed',
        icon: 'none'
      })
    })
  },

  logout() {
    wx.showModal({
      title: 'Logout',
      content: 'Are you sure you want to logout?',
      success: (res) => {
        if (res.confirm) {
          app.globalData.userInfo = null
          wx.removeStorageSync('userInfo')
          this.setData({
            userInfo: null
          })
          wx.showToast({
            title: 'Logged out successfully',
            icon: 'none'
          })
        }
      }
    })
  },

  toMyOrder() {
    if (this.data.userInfo) {
      wx.navigateTo({
        url: '/pages/me/myOrder/myOrder',
      })
    } else {
      wx.showToast({
        title: 'Please login first',
        icon: 'none'
      })
    }
  }
})