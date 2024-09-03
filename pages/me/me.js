const app = getApp()

Page({
  data: {
    userInfo: null,
    isAdmin: false,
    newOrderNotification: false
  },

  onLoad: function (options) {
    this.checkLoginStatus()
  },

  onShow: function () {
    this.checkLoginStatus()
  },

  checkLoginStatus: function() {
    const userInfo = app.globalData.userInfo
    if (userInfo && !this.data.userInfo) {
      this.setData({ userInfo })
      this.checkUserRole()
    } else if (!userInfo && this.data.userInfo) {
      this.setData({
        userInfo: null,
        isAdmin: false
      })
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

      return wx.cloud.database().collection('shop_user')
        .where({ _openid: app.globalData.openid })
        .get()
    })
    .then(dbResult => {
      if (dbResult.data.length === 0) {
        return wx.cloud.database().collection('shop_user').add({
          data: {
            avatarUrl: this.data.userInfo.avatarUrl,
            nickName: this.data.userInfo.nickName,
            isAdmin: false
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
    })
    .then(() => {
      wx.showToast({
        title: 'Login Successful',
        icon: 'none'
      })
      this.checkUserRole()
    })
    .catch(error => {
      console.error('Login error:', error)
      wx.showToast({
        title: 'Login Failed',
        icon: 'none'
      })
    })
  },

  checkUserRole: function() {
    wx.cloud.database().collection('shop_user')
      .where({ _openid: app.globalData.openid })
      .get()
      .then(res => {
        if (res.data.length > 0) {
          const user = res.data[0]
          this.setData({ isAdmin: user.isAdmin })
          if (user.isAdmin) {
            this.startAdminFeatures()
          }
        }
      })
      .catch(error => {
        console.error('Error checking user role:', error)
      })
  },

  startAdminFeatures: function() {
    // Start watching for new orders
    const db = wx.cloud.database()
    const watcher = db.collection('shop_order')
      .watch({
        onChange: snapshot => {
          console.log('New order received', snapshot)
          this.setData({ newOrderNotification: true })
        },
        onError: err => {
          console.error('Watch error', err)
        }
      })
    
    // Store watcher in page instance to stop it when needed
    this.orderWatcher = watcher
  },

  dismissNotification: function() {
    this.setData({ newOrderNotification: false })
  },

  logout: function() {
    app.globalData.userInfo = null
    this.setData({
      userInfo: null,
      isAdmin: false
    })
    if (this.orderWatcher) {
      this.orderWatcher.close()
    }
    wx.showToast({
      title: 'Logged out successfully',
      icon: 'none'
    })
  },

  navigateToMyOrder: function() {
    wx.navigateTo({
      url: '/pages/me/myOrder/myOrder'
    })
  },

  navigateToAllOrders: function() {
    wx.navigateTo({
      url: '/pages/me/allOrder/allOrder'
    })
  }
})