// details.js
var url = require('../../utils/url.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
   skill:false,
   hidden:false,
    cartTatol:0,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    nodetails:true,
    show:true,
    nodes: [{
      name: 'hr',
      attrs: {
        class: 'hr_class',
        style: 'line-height: 60px;border-bottom:none;'
      }
    }],
  
  },

  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },
  addCar:function(){
    var cartTatol=this.data.cartTatol+=1;
    console.log(cartTatol);
    this.setData({
      cartTatol: cartTatol
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1)
    var that=this
    var gcate_id = options.id
    wx.request({
      url: "https://" + url.URl+"/api/goods_details",
      data: {goods_id: gcate_id },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.data == null) {
          that.setData({
            nodetails: false,
            hidden: true,
            show:true,
          })
        }else{

          var img = res.data.data.goods_imgs;
          console.log(res.data.data);
          var list = []
          for (var i = 0; i < img.length; i++) {
            list.push(img[i]);
          }
          console.log(list)
              that.setData({
                hidden: true,
                show:false,
                goods_name: res.data.data.goods_name,
                goods_price: res.data.data.goods_price,
                goods_storage: res.data.data.goods_storage,
                goods_freight: res.data.data.goods_freight,
                goods_market_price: res.data.data.goods_market_price,
                content: res.data.data.content,
                img: list,
                thumb: res.data.data.thumb,

              })


          
        }

       
      }
    }) 
  
  },
  callmeTap: function () {
    var that = this;
    wx.request({
      url: "https://" + url.URl + "/api/company",
      data: {},
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var phone = res.data.data.seller_phone
        wx.makePhoneCall({
          phoneNumber: phone
        })
      }
    })


  },
    onReachBottom: function () {

    this.setData({
      skill: true
    })
  }

 
})