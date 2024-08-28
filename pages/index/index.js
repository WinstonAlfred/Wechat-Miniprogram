Page({

  data: {
    bannerList: [],
    categoriesList: [],
    goodsList: [],
    displayedGoods: [],
    pageSize: 10,
    currentPage: 1
  },

  onLoad: function (options) {
    
    this.getBanners()

    this.getCategories()

    this.getGoodsList()

  },

  //getBanner Database Data
  getBanners() {
    wx.cloud.database().collection('banner').get()
    .then(res=>{
      console.log(res)
      this.setData({
        bannerList: res.data
      })
    })
  },
  toBannerDetail(event){
    console.log(event.currentTarget.dataset.id)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/index/bannerDetail/bannerDetail?id=" + id ,
    })
  },

  //getCategories Database Data
  getCategories(){
    wx.cloud.database().collection('categories')
    .where({
      isShowOnHome:true
    })
    .get()
    .then(res=>{
      console.log(res)
      this.setData({
        categoriesList:res.data
      })
    })
  },
  toCategories(event){
    console.log(event.currentTarget.dataset)
    let id = event.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/index/typeDetail/typeDetail?id=' +id,
    })
  },

  // getProducts Database Data
  getGoodsList() {
    wx.cloud.database().collection('goods').get()
    .then(res => {
      console.log(res)
      this.setData({
        goodsList: res.data
      }, () => {
        this.updateDisplayedGoods()
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

  toSearch(){
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  },

  updateDisplayedGoods() {
    const { goodsList, pageSize, currentPage } = this.data
    const displayedGoods = goodsList.slice(0, pageSize * currentPage)
    this.setData({ displayedGoods })
  },

  loadMoreGoods() {
    this.setData({
      currentPage: this.data.currentPage + 1
    }, () => {
      this.updateDisplayedGoods()
    })
  },


})