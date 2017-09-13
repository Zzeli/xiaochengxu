//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    mallName:wx.getStorageSync('mallName'),
    goodsList:[],
    isNeedLogistics:0, // 是否需要物流信息
    allGoodsPrice:0,
    yunPrice:0,

    goodsJsonStr:""
  },
  onShow : function () {
    this.initShippingAddress();
  },
  onLoad: function (e) {
    var that = this;
    var shopList = [];
    var shopCarInfoMem = wx.getStorageSync('shopCarInfo');
    if (shopCarInfoMem && shopCarInfoMem.shopList) {
      shopList = shopCarInfoMem.shopList
    }
    var isNeedLogistics = 0;
    var allGoodsPrice = 0;

    var goodsJsonStr = "[";
    for (var i =0; i < shopList.length; i++) {
      var carShopBean = shopList[i];
      console.log(carShopBean);
      if (carShopBean.active == true) {
        isNeedLogistics = 1;
      }
      allGoodsPrice += carShopBean.price * carShopBean.number

      var goodsJsonStrTmp = '';
      if (i > 0){
        goodsJsonStrTmp = '';
      }
      goodsJsonStrTmp += carShopBean.goodsId + '|' + carShopBean.number + '|' + carShopBean.propertyChildIds + '|' + carShopBean.label + '|' + carShopBean.name + '|'+ carShopBean.price+';';
      goodsJsonStr += goodsJsonStrTmp;
    }
    that.setData({
      goodsList:shopList,
      isNeedLogistics:isNeedLogistics,
      allGoodsPrice:allGoodsPrice,
      goodsJsonStr:goodsJsonStr
    });

  },
  createOrder:function (e) {
    wx.showLoading();
    var that = this;
    var loginToken = app.globalData.token.user_id // 用户登录 token
    var remark = e.detail.value.remark; // 备注信息

    var postData = {
      token: loginToken,
      goodsJsonStr: that.data.goodsJsonStr,
      allGoodsPrice: that.data.allGoodsPrice,
      remark: remark
    };
    if (that.data.isNeedLogistics > 0) {
      if (!that.data.curAddressData) {
        wx.hideLoading();
        wx.showModal({
          title: '错误',
          content: '请选择您的收货地址',
          showCancel: false
        })
        return;
      }
      postData.province = that.data.curAddressData.province;
      postData.city = that.data.curAddressData.city;
      postData.district = that.data.curAddressData.district;
      postData.address = that.data.curAddressData.address;
      postData.consignee = that.data.curAddressData.consignee;
      postData.mobile = that.data.curAddressData.mobile;
      postData.zipcode = that.data.curAddressData.zipcode;
    }

    //加入订单
    wx.request({
      url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=add_order',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: postData, // 设置请求的参数
      success: (res) =>{
        wx.hideLoading();
        console.log(res);
        if (res.data == '') {
          wx.showModal({
            title: '错误',
            content: '订单提交失败',
            showCancel: false
          })
          return;
        }
        //清空购物车数据
        wx.removeStorageSync('shopCarInfo');
        //下单成功，跳转到订单管理界面
        wx.reLaunch({
          url: "/pages/order-list/index"
        });
      }
    })
  },
  //选择默认的address，根据这个跳转页面
  initShippingAddress: function () {
    var that = this;
    wx.request({
      url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=address_moren',
      data: {
        user_id:app.globalData.token.user_id
      },
      success: (res) =>{
        console.log(res.data)
        if (res.data != 0) {
          that.setData({
            curAddressData:res.data
          });
        }
      }
    })
  },
  addAddress: function () {
    wx.navigateTo({
      url:"/pages/address-add/index"
    })
  },
  selectAddress: function () {
    wx.navigateTo({
      url:"/pages/select-address/index"
    })
  }
})
