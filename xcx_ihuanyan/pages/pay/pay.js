// pages/pay/pay.js
const paymentUrl = require('../../config').paymentUrl
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noaddress:0,
    total:0,
    carriage:0,
    perfer:0,
    final:0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hasList: true,    // 既然有数据了，那设为true吧
      items: [
        { id: 1, title: '短身金头蓝底过背金龙 24-25公分 翡翠蓝底', image: 'https://img12.360buyimg.com/n7/jfs/t2584/348/1423193442/572601/ae464607/573d5eb3N45589898.jpg', num: 6, price: 3000, selected: false }
      ],
      perfer:50,
    });
    this.total();
  
  },
  total() {
    console.log(this.data.items)
    let items = this.data.items;         // 获取购物车列表
    var perfer = this.data.perfer;
    var carriage = this.data.carriage;
    let total = 0;
    let final = 0;
    for (let i = 0; i < items.length; i++) {     // 循环列表得到每个数据
        total += items[i].num * items[i].price;   // 所有价格加起来
        final += total + carriage - perfer;
    }
    this.setData({                // 最后赋值到data中渲染到页面
      items: items,
      total: total.toFixed(2),
      final: final.toFixed(2)
    });
  },
  onShow() {

  },
  requestPayment: function () {
    var self = this

    self.setData({
      loading: true
    })
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'https://test.com/onLogin',
    //         data: {
    //           code: res.code
    //         }
    //       })
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });
    app.getUserOpenId(function (err, openid) {
      if (!err) {
        wx.request({
          url: paymentUrl,
          data: {
            openid
          },
          method: 'POST',
          success: function (res) {
            console.log('unified order success, response is:', res)
            var payargs = res.data.payargs
            wx.requestPayment({
              timeStamp: payargs.timeStamp,
              nonceStr: payargs.nonceStr,
              package: payargs.package,
              signType: payargs.signType,
              paySign: payargs.paySign
            })

            self.setData({
              loading: false
            })
          }
        })
      } else {
        console.log('err:', err)
        self.setData({
          loading: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})