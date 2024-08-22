Page({

  data: {
    
  },

  onLoad: function (options) {
    
    this.getBanners()

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
  }


})