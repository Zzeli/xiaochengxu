
//http://localhost/xia_la_jia_zai/

// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var count = 2;

var GetList = function (count) {
  var list=[];
  for(var i=0;i<count;i++){
    list.push(i);
  }
  return list;
 
}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight:''
  },
  onLoad: function () {
    //  这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight,
          list:GetList(1)
        });
      }
    });
    
  },
  //页面滑动到底部
  bindDownLoad: function () {
    var that=this
    this.setData({
      hidden:false
    })

    count++;
    setTimeout(function () { 
      that.setData({
        list: GetList(count),
        scrollTop: 0,
        hidden: true
      });


     },2000)
   
    console.log("lower");
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
})