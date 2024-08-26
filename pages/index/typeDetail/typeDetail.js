// pages/index/typeDetail/typeDetail.js
Page({

  data: {

  },


  onLoad: function (options) {
    console.log(options)
    this.getTypeGoodsList(options.id)
  },
  getTypeGoodsList(typeId) {
    wx.cloud.database().collection("goods")
    .where({
      type: typeId
    })
    .get()
    .then(res=>{
      console.log(res)
      this.setData({
        goodsList:res.data
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