const app = getApp()
Page({
  data: {
    good: null,
    cartList: []
  },

  onLoad: function (options) {
    console.log(options)
    wx.cloud.database().collection('goods').doc(options.id).get()
    .then(res => {
      console.log(res)
      this.setData({
        good: res.data
      })
    })

    // Initialize cartList from global data
    this.setData({
      cartList: app.globalData.cartList || []
    })
  },

  onShareAppMessage() {
    return {
      title: this.data.good.title,
      path: "pages/goodDetail/goodDetail?id=" + this.data.good._id,
      imageUrl: this.data.good.cover
    }
  },

  onShareTimeline() {
    return {
      title: this.data.good.title,
      query: {
        id: this.data.good._id
      },
      imageUrl: this.data.good.cover
    }
  },

  // Updated addCart Function
  addCart() {
    let cartList = app.globalData.cartList || [];
    const good = this.data.good;
    
    // Check if the product is already in the cart
    const existingGoodIndex = cartList.findIndex(item => item._id === good._id);
    
    if (existingGoodIndex !== -1) {
      // If the product is already in the cart, increase its quantity
      cartList[existingGoodIndex].quantity = (cartList[existingGoodIndex].quantity || 1) + 1;
    } else {
      // If it's a new product, add it to the cart with quantity 1
      cartList.push({
        ...good,
        quantity: 1,
        selected: true
      });
    }
    
    // Update the global cart data
    app.globalData.cartList = cartList;
    
    // Update local data
    this.setData({
      cartList: cartList
    });
    
    // Save to storage
    wx.setStorageSync('cartList', cartList);
    
    // Show a success message
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000
    });
  },

  toCart() {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
})