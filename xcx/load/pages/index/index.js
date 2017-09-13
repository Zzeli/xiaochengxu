//index.js
//获取应用实例
var app = getApp()
var id, url1, url2, list = [], that, data, listadd;
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.setData({
    // id:options.id //options.id是上个页面传来的参数 赋值给此js对应的html
    // })
    that = this;//在请求数据时setData使用
    id = options.id;//options.id为上个页面传来的参数
    // console.log(id)
    url1 = "http://xxx" + id + "xxx";
    queryRequest(url1);
  },
  lower: function (e) {
    url2 = url2 = url1 + "&nt=" + data.nt;
    getmoreRequest(url2);
  }
})

//请求数据
function queryRequest(url) {
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // success
      console.log(res.data);
      data = res.data.data;
      list = res.data.data.list;
      // console.log(list);
      for (var i = 0; i < list.length; i++) {
        var a = timeString(list[i].display_time);
        list[i].time = a;
        list[i].name = list[i].user.name;
        list[i].headpic = list[i].user.avatar;
        // console.log(list[i])
        // console.log(list[i].time)
      }
      that.setData({
        list: list
      })
    }
  })
}

//下拉加载的请求
function getmoreRequest(url) {
  wx.request({
    url: url,
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // success
      // console.log(res.data);
      listadd = res.data.data.list
      data = res.data.data
      // list.post(listadd)
      for (var i = 0; i < listadd.length; i++) {
        var a = timeString(listadd[i].display_time);
        listadd[i].time = a;
        listadd[i].name = listadd[i].user.name;
        listadd[i].headpic = listadd[i].user.avatar;
      }
      list = list.concat(listadd)
      // console.log(list)
      console.log(list.length)
      that.setData({
        list: list
      })
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}

//时间戳转换为时间
function timeString(time) {
  var newDate = new Date();
  newDate.setTime(time);
  // console.log(newDate.toLocaleDateString());
  var result = newDate.toLocaleDateString();
  return result;
}