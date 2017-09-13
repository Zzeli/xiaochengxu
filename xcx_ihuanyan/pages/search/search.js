// search.js
var url = require('../../utils/url.js')
var page = 1;
var last_page = 1;
var classifyid = 1;
var loadMore = function (that) {
  that.setData({
    hidden: false
  });
  if (page < last_page || page == last_page) {
    wx.request({
      url: "https://" + url.URl + "/api/class_details",
      data: { page: page, gcate_id: classifyid },
      method: 'get',
      success: function (res) {
        page++;
        that.setData({
          list: that.data.list.concat(res.data.data.data)
        });

        that.setData({
          hidden: true
        });
      }
    });
  } else {
    that.setData({
      hidden: true,
      nodata: false
    })
  }

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    nodata: true,
    nosearch:true,
    nodes: [{
      name: 'hr',
      attrs: {
        class: 'hr_class',
        style: 'line-height: 60px;border-bottom:none;'
      }
    }],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var word = options.word
   console.log(word)
    var that = this;
    wx.request({
      url: "https://" + url.URl + "/api/search?word=" + word,
      data: {word:word},
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data.code==204){
          that.setData({
            nosearch:false,
            hidden: true
          })
        }else{
          last_page = res.data.data.last_page
          console.log(res.data)
          that.setData({
            list: res.data.data.data,
            hidden: true
          })
          page++;
        }
        
      }
    })  
  
  },

  onUnload: function () {
    page = 1
  },
  onPullDownRefresh: function () {
    page = 1
    var that = this;
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.setData({
      list: []
    })
    wx.request({
      url: "https://" + url.URl + "/api/class_details",
      data: { page: page, gcate_id: classifyid },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data.data.data,
          hidden: true
        })
        page++;
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }

    })
  },

  onReachBottom: function () {
    var that = this;
    loadMore(that)
    this.setData({
      skill: true
    })
  }
})