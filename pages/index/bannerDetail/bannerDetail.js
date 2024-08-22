
Page({


  data: {

  },
  onLoad: function (options) {
    console.log(options.id)

    //getBannerID from index.js (depends on what u wrote after "?")
    wx.cloud.database().collection('banner').doc(options.id).get()
    .then(res=>{
      console.log(res)
      this.setData({
        banner: res.data
      })
    })
  },

})