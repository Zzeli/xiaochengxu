// importer.js
var app = getApp();


var count = 2;

var GetList = function (count,lists) {
  var list = [];
  for (var i = 0; i < count+6; i++) {
    list.push(lists[i]);
  }
  return list;

}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    skill:false,
    sign: '￥',
    hidden: false,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var lists = [{ url: '', img: '../../images/classify1.png', name: '龙鱼', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/classify2.png', name: '魟鱼', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/classify3.png', name: '虎鱼', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/classify4.png', name: '罗汉鱼', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/classify5.png', name: '锦鲤鱼', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/classify6.png', name: '其他鱼只', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details3.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details4.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details1.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details2.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details3.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details4.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' }]
        that.setData({
          scrollHeight: res.windowHeight,
          list: GetList(0,lists),
          hidden:true
        });
      }
    });
  
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

  //页面滑动到底部
  bindDownLoad: function () {
    var lists = [{ url: '', img: '../../images/classify1.png', name: '龙鱼', price: '54420.00', previou: '64000.00' },
    { url: '', img: '../../images/classify2.png', name: '魟鱼', price: '54420.00', previou: '64000.00' },
    { url: '', img: '../../images/classify3.png', name: '虎鱼', price: '54420.00', previou: '64000.00' },
    { url: '', img: '../../images/classify4.png', name: '罗汉鱼', price: '54420.00', previou: '64000.00' },
    { url: '', img: '../../images/classify5.png', name: '锦鲤鱼', price: '54420.00', previou: '64000.00' },
    { url: '', img: '../../images/classify6.png', name: '其他鱼只', price: '54420.00', previou: '64000.00' },
    { url: '', img: '../../images/details3.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
    { url: '', img: '../../images/details4.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
    { url: '', img: '../../images/details1.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
    { url: '', img: '../../images/details2.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
    { url: '', img: '../../images/details3.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
    { url: '', img: '../../images/details4.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' }]
    count+=1;
    
    this.setData({
      list: GetList(count,lists),
      scrollTop: 0
    });
    console.log("lower");
  },
  // scroll: function (event) {
  //   var lists = [{ url: '', img: '../../images/classify1.png', name: '龙鱼', price: '54420.00', previou: '64000.00' },
  //   { url: '', img: '../../images/classify2.png', name: '魟鱼', price: '54420.00', previou: '64000.00' },
  //   { url: '', img: '../../images/classify3.png', name: '虎鱼', price: '54420.00', previou: '64000.00' },
  //   { url: '', img: '../../images/classify4.png', name: '罗汉鱼', price: '54420.00', previou: '64000.00' },
  //   { url: '', img: '../../images/classify5.png', name: '锦鲤鱼', price: '54420.00', previou: '64000.00' },
  //   { url: '', img: '../../images/classify6.png', name: '其他鱼只', price: '54420.00', previou: '64000.00' },
  //   { url: '', img: '../../images/details3.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
  //   { url: '', img: '../../images/details4.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
  //   { url: '', img: '../../images/details1.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
  //   { url: '', img: '../../images/details2.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
  //   { url: '', img: '../../images/details3.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
  //   { url: '', img: '../../images/details4.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' }]
  //   //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
  //   this.setData({
  //     scrollTop: event.detail.scrollTop
  //   });
  // },
  topLoad: function (event) {
    var lists = [{ url: '', img: '../../images/classify1.png', name: '龙鱼', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/classify2.png', name: '魟鱼', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/classify3.png', name: '虎鱼', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/classify4.png', name: '罗汉鱼', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/classify5.png', name: '锦鲤鱼', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/classify6.png', name: '其他鱼只', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details3.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details4.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details1.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details2.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details3.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' },
        { url: '', img: '../../images/details4.png', name: '这是一个比较长的商品名称  ', price: '54420.00', previou: '64000.00' }]
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    count+=1;
    this.setData({
      list: GetList(count,lists),
      scrollTop: 0
    });

    console.log("lower");
  },
  // onPullDownRefresh: function () {
  //   console.log('--------下拉刷新-------')
  //   　　wx.showNavigationBarLoading() //在标题栏中显示加载

  //   　　wx.request({
  //     url: 'https://URL',
  //     data: {},
  //     method: 'GET',
  //     // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //     // header: {}, // 设置请求的 header
  //     success: function (res) {
  //       // success
  //     },
  //     fail: function () {
  //       // fail
  //     },
  //     complete: function () {
  //       // complete
  //       wx.hideNavigationBarLoading() //完成停止加载
  //       wx.stopPullDownRefresh() //停止下拉刷新
  //     }
  //   })
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      skill:true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})