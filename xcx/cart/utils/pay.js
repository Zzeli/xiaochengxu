function wxpay(app, money, orderId, redirectUrl) {
  wx.request({
    url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=to_pay',
    data: {
      token:app.globalData.token.user_id,
      money:money,
      orderId: orderId,
      payName:"在线支付",
      nextAction:{type:0, id:orderId}
    },
    //method:'POST',
    success: function(res){
      console.log(res);
      if(res.data != 0){
        // 发起支付
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType:'MD5',
          paySign: res.data.paySign,
          fail:function (aaa) {
            wx.showToast({title: '支付失败:' + aaa})
          },
          success:function () {
            wx.showToast({title: '支付成功'})
            wx.request({
              url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=wan_pay',
              data: {
                orderId: orderId
              },
            })
            wx.reLaunch({
              url: redirectUrl
            });
          }
        })
      } else {
        wx.showToast({title: '服务器忙' + res.data.code})
      }
    }
  })
}

module.exports = {
  wxpay: wxpay
}
