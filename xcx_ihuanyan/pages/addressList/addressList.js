// pages/addressList/addressList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: [{
      gcate_id: 1, name: '陈聪', address: '山西省太原市学府街华宇百花谷C座26层', tel: '13834159700', selected: false},
      { gcate_id: 2, name: '陈聪', address: '山西省太原市学府街华宇百花谷C座26层', tel: '13834159700', selected: false},
      {
        gcate_id: 3, name: '陈聪', address: '山西省太原市学府街华宇百花谷C座26层', tel: '13834159700', selected: false
}]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  selectList(e) {
    const index = e.currentTarget.dataset.index;  // 获取data- 传进来的index
    let message = this.data.message;          // 获取购物车列表
    const selected = message[index].selected;     // 获取当前商品的选中状态    
    for(var i=0; i<message.length;i++){
      message[i].selected=false;
      message[index].selected = !selected;       // 改变状态
      
    }
    this.setData({
      message: message
    });
  },
  add:function(){
    wx.navigateTo({
      url: '/pages/addAddress/addAddress'
    })

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
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})