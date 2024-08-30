// pages/me/myOrder/myOrder.js
const app = getApp()

Page({

  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getOrderList()

    console.log(app.globalData.openid)
  },

  getOrderList() {
    wx.cloud.database().collection('shop_order')
    .where({
      _openid: app.globalData.openid
    })
    .get()
    .then(res=>{
      console.log(res)
      this.setData({
        orderList:res.data
      })
    })
  }



})