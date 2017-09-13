var app = getApp();
Page({
    data:{
      orderId:0,
        goodsList:[
            {
                pic:'/images/goods02.png',
                name:'爱马仕（HERMES）大地男士最多两行文字超出就这样显…',
                price:'300.00',
                label:'大地50ml',
                number:2
            },
            {
                pic:'/images/goods02.png',
                name:'爱马仕（HERMES）大地男士最多两行文字超出就这样显…',
                price:'300.00',
                label:'大地50ml',
                number:2
            }
        ],
        yunPrice:"10.00"
    },
    onLoad:function(e){
      var orderId = e.id;
      this.data.orderId = orderId;
      this.setData({
        orderId: orderId
      });
    },
    //选择要显示的订单（地址和商品）
    onShow : function () {
      var that = this;
      wx.request({
        url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=order_details',
        data: {
          token: app.globalData.token.user_id,
          id: that.data.orderId
        },
        success: (res) => {
          //console.log(res);
          wx.hideLoading();
          if (res.data == 0) {
            wx.showModal({
              title: '错误',
              content: '无法获取详情',
              showCancel: false
            })
            return;
          }
          that.setData({
            orderDetail: res.data,
          });
        }
      })
      var yunPrice = parseFloat(this.data.yunPrice);
      var allprice = 0;
      var goodsList = this.data.goodsList;
      for (var i = 0; i < goodsList.length; i++) {
        allprice += parseFloat(goodsList[0].price) * goodsList[0].number;
      }
      this.setData({
        allGoodsPrice: allprice,
        yunPrice: yunPrice
      });
    },
    wuliuDetailsTap:function(e){
      var orderId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "/pages/wuliu/index?id=" + orderId
      })
    },
    confirmBtnTap:function(e){
      var that = this;
      var orderId = e.currentTarget.dataset.id;
      wx.showModal({
          title: '确认您已收到商品？',
          content: '',
          success: function(res) {
              wx.showLoading();
              wx.request({
                url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=order_shouhuo',
                data: {
                  orderId: orderId
                },
                success: (res) => {
                  //console.log(res);
                  wx.hideLoading();
                  wx.navigateBack({})
                }
             })
          }
      })
    }
})