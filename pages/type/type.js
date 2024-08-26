// pages/type/type.js
Page({

  data: {

  },

  onLoad: function (options) {
    this.getCategories()

    this.getGoodsList()
  },

  onShow() {
    this.getCategories()

  },

    //getCategories Database Data
  getCategories(){
    wx.cloud.database().collection('categories').get()
    .then(res=>{
      console.log(res)
      this.setData({
        categoriesList:res.data
      })
    })
  },

// getProducts Database Data
  getGoodsList(){
    wx.cloud.database().collection('goods').get()
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