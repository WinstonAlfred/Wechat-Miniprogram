// pages/me/allOrder/allOrder.js
const app = getApp()

Page({
  data: {
    orderList: [],
    currentPage: 0,
    pageSize: 20,
    hasMore: true,
    searchQuery: '',
    isSearching: false
  },

  onLoad: function (options) {
    this.loadOrders()
  },

  onReachBottom: function () {
    if (this.data.hasMore && !this.data.isSearching) {
      this.loadOrders()
    }
  },

  loadOrders: function () {
    if (!this.data.hasMore) return

    const db = wx.cloud.database()
    db.collection('shop_order')
      .orderBy('time', 'desc')
      .skip(this.data.currentPage * this.data.pageSize)
      .limit(this.data.pageSize)
      .get()
      .then(res => {
        const newOrders = res.data
        const allOrders = this.data.orderList.concat(newOrders)
        const hasMore = newOrders.length === this.data.pageSize

        this.setData({
          orderList: allOrders,
          currentPage: this.data.currentPage + 1,
          hasMore: hasMore
        })
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err)
        wx.showToast({
          title: 'Failed to load orders',
          icon: 'none'
        })
      })
  },

  formatDate: function (dateString) {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  },

  onSearchInput: function (e) {
    this.setData({
      searchQuery: e.detail.value
    })
  },

  onSearch: function () {
    if (this.data.searchQuery.trim() === '') {
      return
    }

    this.setData({
      isSearching: true,
      orderList: [],
      hasMore: false
    })

    const db = wx.cloud.database()
    db.collection('shop_order')
      .where({
        name: db.RegExp({
          regexp: this.data.searchQuery,
          options: 'i'
        })
      })
      .orderBy('time', 'desc')
      .get()
      .then(res => {
        this.setData({
          orderList: res.data,
          isSearching: false
        })
      })
      .catch(err => {
        console.error('Failed to search orders:', err)
        wx.showToast({
          title: 'Failed to search orders',
          icon: 'none'
        })
        this.setData({
          isSearching: false
        })
      })
  },

  onClearSearch: function () {
    this.setData({
      searchQuery: '',
      isSearching: false,
      orderList: [],
      currentPage: 0,
      hasMore: true
    })
    this.loadOrders()
  }
})