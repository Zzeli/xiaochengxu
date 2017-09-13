//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    addressList:[]
  },
  //默认地址的选择
  selectTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=update_moren',
      data: {
        user_id:app.globalData.token.user_id,
        id:id,
      },
      success: (res) =>{
        wx.navigateBack({})
      }
    })
  },

  addAddess : function () {
    wx.navigateTo({
      url:"/pages/address-add/index"
    })
  },
  
  editAddess: function (e) {
    wx.navigateTo({
      url: "/pages/address-add/index?id=" + e.currentTarget.dataset.id
    })
  },
  
  onLoad: function () {
    console.log('onLoad')

   
  },
  onShow : function () {
    this.initShippingAddress();
  },
  initShippingAddress: function () {
    var that = this;
    wx.request({
      url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=address_list',
      data: {
        user_id: app.globalData.token.user_id,
      },
      success: (res) =>{
        console.log(res);
        if (res.data != '') {
          that.setData({
            addressList:res.data
          });
        }
      }
    })
  }

})
