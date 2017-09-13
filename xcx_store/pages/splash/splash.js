// splash.js
var url = require('../../utils/url.js');
var flag=true;
var go;
function countdown(that) {
  if(flag==false){
    return;
  }
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

 
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 5,
    splash:false,
    img:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    flag=true
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
        go = setTimeout(function () {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, 5000)
      }
    })
  },




  goIndex: function () {
    clearTimeout(go)
    flag=false
    wx.switchTab({
      url: '/pages/index/index'
    })

  },
})