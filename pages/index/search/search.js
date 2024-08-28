// pages/index/search/search.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  getValue(event){
    console.log(event.detail.value)
    let inputValue = event.detail.value
    this.setData({
      inputValue
    })
  },
  search(){
    wx.cloud.database().collection('goods').where({
      title: wx.cloud.database().RegExp({
        regexp: this.data.inputValue,
        options: 'i'
      })
    }).get().
      then(res=>{
      console.log(res)
      this.setData({
        goodList:res.data
      })
    })
  },
  toGoodDetail(event){
    console.log(event.currentTarget.dataset.id)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/goodDetail/goodDetail?id=" + id ,
    })
  },

})