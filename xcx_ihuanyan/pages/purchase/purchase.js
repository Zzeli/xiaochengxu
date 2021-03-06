// purchase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '待付款', '待发货', '待收货','已完成'],
    currentTab: 0,
    carts: [
      {
        cid: 1008, title: '短身金头蓝底过背金龙24-25公分 翡翠蓝底', image: 'https://img12.360buyimg.com/n7/jfs/t2584/348/1423193442/572601/ae464607/573d5eb3N45589898.jpg', num: '1', price: '198.0', sum: '54420.00', selected: true,status:'交易成功',indent:'2222222222'},
      { cid: 1012, title: 'iPhone7 Plus', image: 'https://img13.360buyimg.com/n7/jfs/t3235/100/1618018440/139400/44fd706e/57d11c33N5cd57490.jpg', num: '1', price: '7188.0', sum: '7188.0', selected: true, status: '交易成功', indent: '2222222222'},
      { cid: 1031, title: '得力订书机', image: 'https://img10.360buyimg.com/n7/jfs/t2005/172/380624319/93846/b51b5345/5604bc5eN956aa615.jpg', num: '3', price: '15.0', sum: '45.0', selected: false, status: '交易成功', indent: '2222222222' },
      { cid: 1054, title: '康师傅妙芙蛋糕', image: 'https://img14.360buyimg.com/n7/jfs/t2614/323/914471624/300618/d60b89b6/572af106Nea021684.jpg', num: '2', price: '15.2', sum: '30.4', selected: false, status: '交易成功', indent: '2222222222'},
      { cid: 1063, title: '英雄钢笔', image: 'https://img10.360buyimg.com/n7/jfs/t1636/60/1264801432/53355/bb6a3fd1/55c180ddNbe50ad4a.jpg', num: '1', price: '122.0', sum: '122.0', selected: true, status: '交易成功', indent: '2222222222'},
    ]
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

 
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})