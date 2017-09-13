//app.js
App({
  onLaunch: function () {
    var that = this;
    //  获取商城名称
    //发起的是 HTTPS 请求。
    // wx.request({
    //   url: 'https://api.it120.cc/'+ that.globalData.subDomain +'/config/get-value',
    //   data: {
    //     key: 'mallName'
    //   },
    //   success: function(res) {
    //     wx.setStorageSync('mallName','欢颜商城');
    //   }
    // })
    this.login();
  },
  login : function () {
    var that = this;
    var token = that.globalData.token;
    if (!token) {
      wx.login({
        success: function (res) {
          //获得code后需要用code换区session_key和open_id
          //console.log(res);
          //把code传到服务器中，再由服务器传值到微信api换取session_key和open_id
          wx.request({
            url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=code',
            data: {
              code: res.code
            },
            success: function (res) {
              //console.log(res);
              // 登录错误 
              if (res.data.user_id == '' || res.data.user_name == '') {
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '无法登录，请重试',
                  showCancel: false
                })
                return;
              }             
              //修改登陆状态
              if (res.data.user_id != '' && res.data.user_name != ''){
                that.globalData.token = res.data;
              }
              // 去注册
              if (res.data == false) {
                //console.log(123456789);
                that.registerUser();
                return;
              }
            }
          })
        }
      })
    }
  },
  //新用户注册函数
  //需要客户授权
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        //console.log(res);
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            // 下面开始调用注册接口
            wx.request({
              url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=login',
              data: {
                name: res.userInfo.nickName,
                code: code
                }, // 设置请求的 参数
              success: (res) =>{
                wx.hideLoading();
                //更改状态
                that.globalData.token = res.data.userinfo;
                that.login();
              }
            })
          }
        })
      }
    })
  },
  globalData:{
    userInfo:null,
    subDomain:"mall"
  }
})