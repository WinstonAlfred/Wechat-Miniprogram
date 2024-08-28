Page({
  data: {
    bannerList: [],
    categoriesList: [],
    goodsList: [],
    pageSize: 10,
    currentPage: 0,
    isLoading: false,
    hasMore: true
  },

  onLoad: function (options) {
    this.getBanners()
    this.getCategories()
    this.getGoodsList()
  },

  // getBanner Database Data
  getBanners() {
    wx.cloud.database().collection('banner').get()
    .then(res => {
      console.log('Banners:', res)
      this.setData({ bannerList: res.data })
    })
  },

  toBannerDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({ url: "/pages/index/bannerDetail/bannerDetail?id=" + id })
  },

  // getCategories Database Data
  getCategories() {
    wx.cloud.database().collection('categories')
    .where({ isShowOnHome: true })
    .get()
    .then(res => {
      console.log('Categories:', res)
      this.setData({ categoriesList: res.data })
    })
  },

  toCategories(event) {
    let id = event.currentTarget.dataset.name
    wx.navigateTo({ url: '/pages/index/typeDetail/typeDetail?id=' + id })
  },

  // getProducts Database Data with Pagination
  getGoodsList() {
    if (this.data.isLoading || !this.data.hasMore) return

    this.setData({ isLoading: true })

    const db = wx.cloud.database()
    const skip = this.data.currentPage * this.data.pageSize

    db.collection('goods')
      .skip(skip)
      .limit(this.data.pageSize)
      .get()
      .then(res => {
        console.log('Goods:', res)
        const newGoods = res.data
        const hasMore = newGoods.length === this.data.pageSize

        this.setData({
          goodsList: this.data.goodsList.concat(newGoods),
          currentPage: this.data.currentPage + 1,
          isLoading: false,
          hasMore: hasMore
        })
      })
      .catch(err => {
        console.error('Error loading goods:', err)
        this.setData({ isLoading: false })
        wx.showToast({ title: 'Failed to load goods', icon: 'none' })
      })
  },

  toGoodDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({ url: "/pages/goodDetail/goodDetail?id=" + id })
  },

  toSearch() {
    wx.navigateTo({ url: '/pages/index/search/search' })
  },

  loadMoreGoods() {
    this.getGoodsList()
  },

  onReachBottom: function() {
    this.loadMoreGoods()
  }
})