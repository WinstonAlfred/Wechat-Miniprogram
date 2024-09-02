// pages/me/me.js
const app = getApp()

Page({
  data: {
    userInfo: null
  },

  onLoad: function (options) {
    this.updateUserInfo()
  },

  onShow: function () {
    this.updateUserInfo()
  },

  updateUserInfo: function() {
    const userInfo = app.globalData.userInfo
    if (userInfo) {
      this.setData({ userInfo })
    }
  },

  login: function() {
    wx.getUserProfile({
      desc: '用于完善用户消息',
    })
    .then(res => {
      console.log(res)
      const userInfo = res.userInfo
      app.updateUserInfo(userInfo)
      this.setData({ userInfo })

      // Save or update user in cloud database
      return wx.cloud.database().collection('shop_user')
        .where({ _openid: app.globalData.openid })
        .get()
    }).then(dbResult => {
      if (dbResult.data.length === 0) {
        return wx.cloud.database().collection('shop_user').add({
          data: {
            avatarUrl: this.data.userInfo.avatarUrl,
            nickName: this.data.userInfo.nickName
          }
        })
      } else {
        return wx.cloud.database().collection('shop_user')
          .doc(dbResult.data[0]._id)
          .update({
            data: {
              avatarUrl: this.data.userInfo.avatarUrl,
              nickName: this.data.userInfo.nickName
            }
          })
      }
    }).then(() => {
      wx.showToast({
        title: 'Login Successful',
        icon: 'none'
      })
    }).catch(error => {
      console.error('Login error:', error)
      wx.showToast({
        title: 'Login Failed',
        icon: 'none'
      })
    })
  },

  logout: function() {
    app.clearUserInfo()
    this.setData({ userInfo: null })

    wx.showToast({
      title: 'Logout Successful',
      icon: 'none'
    })
  },

  toMyOrder() { 
    if (this.data.userInfo) { 
    wx.navigateTo({ url: '/pages/me/myOrder/myOrder', }) 
  } else 
    { wx.showToast(
      { 
      title: 'Please login first', 
      icon: 'none' 
      }
      ) 
    } 
  }
})