//index.js
//获取应用实例
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    goodsDetail:{},
    swiperCurrent: 0,  
    hasMoreSelect:true,
    selectSize:"选择：",
    selectSizePrice:0,
    shopNum:0,
    hideShopPopup:true,
    buyNumber:0,
    buyNumMin:0,
    buyNumMax:0,

    propertyChildIds:"",
    propertyChildNames:"",
    canSubmit:true, //  选中规格尺寸时候是否允许加入购物车
    shopCarInfo:{}
  },

  //事件处理函数
  swiperchange: function(e) {
      //console.log(e.detail.current)
       this.setData({  
        swiperCurrent: e.detail.current  
    })  
  },
  onLoad: function (e) {
    //console.log('onLoad');
    var that = this;
    // 获取购物车数据
    wx.getStorage({
      key: 'shopCarInfo',
      success: function(res) {
        //console.log(res.data)
        that.setData({
          shopCarInfo:res.data,
          shopNum:res.data.shopNum
        });
      } 
    })

    wx.request({
      url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=goodsdetail',
      data: {
        id: e.id
      },
      success: function(res) {
        console.log(res);
        var qqq = app.globalData.ll;
        var selectSizeTemp = "";
        var propertyChildNames = "";
        var propertyChildIds = "";
        var aaa="";
        var bbb="";
        that.data.goodsDetail = res.data;
        //默认规格是第一个
        if (res.data.spe != ''){
          for (var i = 0; i < res.data.spe.length; i++) {
            aaa=aaa+res.data.spe[i].name + ':' + res.data.spe[i].values[0].label+"  ";
            bbb=bbb+res.data.spe[i].values[0].id;
          }
        }
        that.setData({
          goodsDetail:res.data,               
          buyNumMax: res.data.goods_number,
          buyNumber: (res.data.goods_number>0) ? 1: 0,
          propertyChildNames: aaa,
          propertyChildIds: bbb,
        });
        WxParse.wxParse('article', 'html', res.data.goods_desc, that, 5);
      }
    })


  },
  bindGuiGeTap: function() {
     this.setData({  
        hideShopPopup: false 
    })  
  },
  closePopupTap: function() {
     this.setData({  
        hideShopPopup: true 
    })  
  },
  numJianTap: function() {
     if(this.data.buyNumber > this.data.buyNumMin){
        var currentNum = this.data.buyNumber;
        currentNum--; 
        this.setData({  
            buyNumber: currentNum
        })  
     }
  },
  numJiaTap: function() {
     if(this.data.buyNumber < this.data.buyNumMax){
        var currentNum = this.data.buyNumber;
        currentNum++ ;
        this.setData({  
            buyNumber: currentNum
        })  
     }
  },


  labelItemTap: function(e) {
    var that = this;
    /*
    console.log(e)
    console.log(e.currentTarget.dataset.propertyid)
    console.log(e.currentTarget.dataset.propertyname)
    console.log(e.currentTarget.dataset.propertychildid)
    console.log(e.currentTarget.dataset.propertychildname)
    */
    // 取消该分类下的子栏目所有的选中状态

    var childs = that.data.goodsDetail.spe[e.currentTarget.dataset.propertyindex].values;
    //console.log(childs);
    for(var i = 0;i < childs.length;i++){
      that.data.goodsDetail.spe[e.currentTarget.dataset.propertyindex].values[i].active = false;
    }
    // 设置当前选中状态
    that.data.goodsDetail.spe[e.currentTarget.dataset.propertyindex].values[e.currentTarget.dataset.propertychildindex].active = true;

    // 获取所有的选中规格尺寸数据
    var needSelectNum = that.data.goodsDetail.spe.length;
    var curSelectNum = 0;
    var propertyChildIds= "";
    var propertyChildNames = "";
    for (var i = 0;i < that.data.goodsDetail.spe.length;i++) {
      childs = that.data.goodsDetail.spe[i].values;
      for (var j = 0;j < childs.length;j++) {
        if(childs[j].active){
          curSelectNum++;
          propertyChildIds = propertyChildIds + childs[j].id +",";
          propertyChildNames = propertyChildNames + that.data.goodsDetail.spe[i].name + ":" + childs[j].label +"  ";
        
        }
      }
    }
    var canSubmit = false;
    if (needSelectNum == curSelectNum) {
      canSubmit = true;
    }
    
    // 计算当前价格
    if (canSubmit) {
      wx.request({
        url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=price',
        data: {
          id: that.data.goodsDetail.goods_id,
          attr:propertyChildIds,
        },
        success: function(res) {
          that.setData({
            selectSizePrice: res.data,
            propertyChildIds:propertyChildIds,
            propertyChildNames:propertyChildNames,
            
            //限制购买数量
            //buyNumMax:res.data.data.stores,
            //buyNumber:(res.data.data.stores>0) ? 1: 0
          });
         
        }
      })
    }

    
    this.setData({
      goodsDetail: that.data.goodsDetail,
      canSubmit:canSubmit
    })  
  },
  addShopCar:function(){
    if (this.data.goodsDetail.is_on_sale && !this.data.canSubmit) {
      this.bindGuiGeTap();
      return;
    }
    if(this.data.goodsthumb < 1){
      wx.showModal({
        title: '提示',
        content: '暂时缺货哦~',
        showCancel:false
      })
      return;
    }
    // 加入购物车
    var shopCarMap = {};
   //重新编译
    shopCarMap.goodsId=this.data.goodsDetail.goods_id;
    shopCarMap.pic = this.data.goodsDetail.img[0];
    shopCarMap.name=this.data.goodsDetail.goods_name;
    // shopCarMap.label=this.data.goodsDetail.basicInfo.id; 规格尺寸 
    shopCarMap.propertyChildIds=this.data.propertyChildIds;
    shopCarMap.label=this.data.propertyChildNames;
    //多规格和无规格
    shopCarMap.price = (this.data.selectSizePrice > 0) ? this.data.selectSizePrice : this.data.goodsDetail.shop_price;
    shopCarMap.left="";
    shopCarMap.active=true;
    shopCarMap.number = this.data.buyNumber;
    //物流
    //shopCarMap.logisticsType=this.data.goodsDetail.basicInfo.logisticsId;
    //console.log(shopCarMap);
    //加入数据
    var shopCarInfo = this.data.shopCarInfo;
    if (!shopCarInfo.shopNum){
      shopCarInfo.shopNum = 0;
    }
    if (!shopCarInfo.shopList){
      shopCarInfo.shopList = [];
    }
    var hasSameGoodsIndex = -1;
    for (var i = 0;i<shopCarInfo.shopList.length;i++) {
      var tmpShopCarMap = shopCarInfo.shopList[i];
      if (tmpShopCarMap.goodsId == shopCarMap.goodsId && tmpShopCarMap.propertyChildIds == shopCarMap.propertyChildIds) {
        hasSameGoodsIndex = i;
        shopCarMap.number=shopCarMap.number + tmpShopCarMap.number;
        break;
      }
    }

    shopCarInfo.shopNum = shopCarInfo.shopNum + this.data.buyNumber;
    if (hasSameGoodsIndex > -1) {
      shopCarInfo.shopList.splice(hasSameGoodsIndex,1, shopCarMap);
    } else {
       shopCarInfo.shopList.push(shopCarMap);
    }

    this.setData({
      shopCarInfo:shopCarInfo,
      shopNum:shopCarInfo.shopNum
    });

    // 写入本地存储
    wx.setStorage({
      key:"shopCarInfo",
      data:shopCarInfo
    })
    //console.log(shopCarInfo);
    this.closePopupTap();
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
    //加入购物车的数据库
    wx.request({
      url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=add_cart',
      data: {
        goods_id: this.data.goodsDetail.goods_id,
        number: this.data.buyNumber,
        spe: this.data.propertyChildIds,
        user_id: app.globalData.token.user_id,
      },
      success: function (res) {
        console.log(res);
      }
    })
  },
  goShopCar:function () {
    wx.reLaunch({
      url: "/pages/shop-cart/index",
    });
  },
  tobuy:function(){
    if (this.data.goodsDetail.is_on_sale && !this.data.canSubmit) {
      this.bindGuiGeTap();
      return;
    }
    if(this.data.buyNumber < 1){
      wx.showModal({
        title: '提示',
        content: '暂时缺货哦~',
        showCancel:false
      })
      return;
    }
    this.addShopCar();
    this.goShopCar();
  },
  onShareAppMessage: function () {
    return {
      title: this.data.goodsDetail.basicInfo.name,
      path: '/pages/goods-details/index?id=' + this.data.goodsDetail.basicInfo.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
