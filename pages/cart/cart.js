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
    return cartList.reduce((total, item) => {
      return item.selected ? total + (parseFloat(item.price) * item.quantity) : total;
    }, 0).toFixed(2);
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
  }
})