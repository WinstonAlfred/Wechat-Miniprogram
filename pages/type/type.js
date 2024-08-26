// pages/type/type.js
Page({

  data: {
    currentType: 0,  // Add this line to initialize currentType
    categoriesList: [],
    goodsList: []
  },

  onLoad: function (options) {
    this.getCategories()

    this.getGoodsList()
  },

  onShow() {
    this.getCategories()

    this.getGoodsList()
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

  //getProducts Database Data
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

  //getGoods Based on it's type
  getTypeGoodsList(event) {
    console.log(event.currentTarget.dataset.index)
    console.log(event.currentTarget.dataset.name)  // Change this line
    let index = event.currentTarget.dataset.index
    let categoryName = event.currentTarget.dataset.name  // Change this line

    this.setData({
      currentType: index
    })

    wx.cloud.database().collection("goods")
      .where({
        type: categoryName  // Change this line
      })
      .get()
      .then(res => {
        console.log("Filtered goods:", res.data)  // Add this line for debugging
        this.setData({
          goodsList: res.data
        })
      })
      .catch(err => {  // Add error handling
        console.error("Error fetching filtered goods:", err)
      })
  },
})