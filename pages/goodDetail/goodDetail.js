// pages/goodDetail/goodDetail.js
Page({

  data: {

  },

  onLoad: function (options) {
    console.log(options)
    wx.cloud.database().collection('goods').doc(options.id).get()
    .then(res=>{
      console.log(res)
      this.setData({
        good:res.data
      })
    })
  },
  onShareAppMessage(){
    return {
      title: this.data.good.title,
      path: "pages/goodDetail/goodDetail?id=" + this.data.good._id,
      imageUrl: this.data.good.cover
    }
  },
  onShareTimeline(){
    return{
      title:this.data.good.title,
      query: {
        id:this.data.good._id
      },
      imageUrl:this.data.good.cover
    }
  }

})