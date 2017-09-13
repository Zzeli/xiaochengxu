// splash.js
var url = require('../../utils/url.js')
var is;
function countdown(that) {
  if(is == 1){
    var second = that.data.second
    if (second == 0) {
      return;
    }
    var time = setTimeout(function () {
      that.setData({
        second: second - 1
      });
      countdown(that);
    }, 1000)


  }else{
    return;
  }
 

}
function go(){
  if(is==1){
    setTimeout(function () {
      wx.switchTab({
        url: '../index/index',
      })
    }, 5000)
  }
  else{
    return;
  }
  
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 5,
    splash:false,
    img:[],
    is:1,

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   is=this.data.is

    var that=this

    wx.request({
      url: "https://" + url.URl + "/api/shan",
      data: {},
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          img:res.data.data
        })
        countdown(that)
        go();
      
      } 
    })
   
    
   
  },
  goIndex: function () {
    this.setData({
      is:2
    })
     wx.reLaunch({
      url: '/pages/index/index'
    })
    
  },
})