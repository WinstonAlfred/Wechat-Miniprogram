const app = getApp()

Page({
  data: {
    cartList: [],
    totalPrice: 0
  },

  onLoad: function (options) {
    // You can initialize data here if needed
  },
  
  onShow() {
    this.updateCart();
  },

  updateCart() {
    let cartList = app.globalData.cartList || [];
    // Ensure each item has a quantity
    cartList = cartList.map(item => ({
      ...item,
      quantity: item.quantity || 1,
      selected: item.selected !== undefined ? item.selected : true
    }));
    const totalPrice = this.calculateTotalPrice(cartList);
    this.setData({
      cartList: cartList,
      totalPrice: totalPrice
    });
    app.globalData.cartList = cartList;
    wx.setStorageSync('cartList', cartList);
  },

  calculateTotalPrice(cartList) {
    const total = cartList.reduce((total, item) => {
      return item.selected ? total + (parseFloat(item.price) * item.quantity) : total;
    }, 0);
    
    // Format the total price in Rupiah with thousands separators
    return 'Rp' + total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },

  onAddItem(e) {
    const index = e.currentTarget.dataset.index;
    const cartList = this.data.cartList;
    cartList[index].quantity += 1;
    this.updateCart();
  },

  onMinusItem(e) {
    const index = e.currentTarget.dataset.index;
    const cartList = this.data.cartList;
    if (cartList[index].quantity > 1) {
      cartList[index].quantity -= 1;
    } else {
      cartList.splice(index, 1);
    }
    this.updateCart();
  },

  onToggleSelect(e) {
    const index = e.currentTarget.dataset.index;
    const cartList = this.data.cartList;
    cartList[index].selected = !cartList[index].selected;
    this.updateCart();
  },

    toGoodDetail(event){
    console.log(event.currentTarget.dataset.id)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/goodDetail/goodDetail?id=" + id ,
    })
  },
})