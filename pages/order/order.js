const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    orderItems: [],
    totalPrice: 0,
    name: '',
    phone: ''
  },

  onLoad: function (options) {
    this.loadOrderItems();
  },

  loadOrderItems: function () {
    const cartList = app.globalData.cartList || [];
    const orderItems = cartList.filter(item => item.selected);
    const totalPrice = this.calculateTotalPrice(orderItems);

    this.setData({
      orderItems: orderItems,
      totalPrice: totalPrice
    });
  },

  calculateTotalPrice: function (cartList) {
    const total = cartList.reduce((total, item) => {
      return item.selected ? total + (parseFloat(item.price) * item.quantity) : total;
    }, 0);
    
    // Format the total price in Rupiah with thousands separators
    return 'Rp' + total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },

  onNameInput: function (e) {
    this.setData({
      name: e.detail.value
    });
  },

  onPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  onPlaceOrder: function () {
    console.log('Current name:', this.data.name);
    console.log('Current phone:', this.data.phone);

    if (!this.data.name.trim() || !this.data.phone.trim()) {
      wx.showToast({
        title: 'Please fill in name and phone',
        icon: 'none'
      });
      return;
    }

    // Prepare the goods data for the database
    const goodsForDatabase = this.data.orderItems.map(item => ({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      cover: item.cover
    }));

    console.log('Placing order with data:', {
      name: this.data.name,
      phone: this.data.phone,
      goods: goodsForDatabase,
      totalMoney: this.data.totalPrice,
      time: util.formatTime(new Date())
    });

    wx.cloud.database().collection('shop_order').add({
      data: {
        name: this.data.name,
        phone: this.data.phone,
        goods: goodsForDatabase,
        totalMoney: this.data.totalPrice,
        time: util.formatTime(new Date())
      }
    }).then(res => {
      console.log('Order added successfully:', res)
      wx.showToast({
        title: 'Order placed successfully!',
        icon: 'none',
        duration: 2000
      })

      // Clear selected items from the cart
      const cartList = app.globalData.cartList || [];
      app.globalData.cartList = cartList.filter(item => !item.selected);
      wx.setStorageSync('cartList', app.globalData.cartList);

      // Navigate back to the cart page after a short delay
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
    }).catch(err => {
      console.error('Error adding order:', err)
      wx.showToast({
        title: 'Failed to place order',
        icon: 'none',
        duration: 2000
      })
    });
  },

  toGoodDetail: function (event) {
    console.log(event.currentTarget.dataset.id)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/goodDetail/goodDetail?id=" + id,
    })
  },


})