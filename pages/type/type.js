// pages/type/type.js
Page({
  data: {
    currentType: 0,
    categoriesList: [],
    goodsList: []
  },

  onLoad: function (options) {
    this.getCategories().then(() => {
      // After categories are loaded, get goods for the first category
      if (this.data.categoriesList.length > 0) {
        this.getGoodsForCategory(this.data.categoriesList[0].name, 0);
      }
    });
  },

  onShow() {
    // If categories are already loaded, refresh goods for the current category
    if (this.data.categoriesList.length > 0) {
      const currentCategory = this.data.categoriesList[this.data.currentType].name;
      this.getGoodsForCategory(currentCategory, this.data.currentType);
    }
  },

  // getCategories Database Data
  getCategories() {
    return wx.cloud.database().collection('categories').get()
      .then(res => {
        console.log("Categories:", res.data);
        this.setData({
          categoriesList: res.data
        });
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
      });
  },

  // Get goods for a specific category
  getGoodsForCategory(categoryName, index) {
    console.log("Getting goods for category:", categoryName);
    wx.cloud.database().collection("goods")
      .where({
        type: categoryName
      })
      .get()
      .then(res => {
        console.log("Filtered goods:", res.data);
        this.setData({
          goodsList: res.data,
          currentType: index
        });
      })
      .catch(err => {
        console.error("Error fetching filtered goods:", err);
      });
  },

  // Handle category selection
  getTypeGoodsList(event) {
    const index = event.currentTarget.dataset.index;
    const categoryName = event.currentTarget.dataset.name;
    this.getGoodsForCategory(categoryName, index);
  },

  toGoodDetail(event) {
    console.log(event.currentTarget.dataset.id);
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/goodDetail/goodDetail?id=" + id,
    });
  },
});