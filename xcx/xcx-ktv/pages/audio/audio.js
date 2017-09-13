// audio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    singerTab: false,
    list: [
      { path: 'singer', name: '歌手' },
      { path: 'rinking', name: '排行榜' },
      { path: 'singer', name: '常唱' },
      { path: 'singer', name: '推荐歌单' },
      { path: 'singer', name: '商店' },
    ],
    //排行榜
    navList: ['月排行', '季排行', '年排行'],

    navSwich: [
      'king1.png',
      'king2.png',
      'king3.png',
    ],
    ranking: [
      { name: '歌手与演员－李荣浩', img: 'singername1.png', time: "04'52'" },
      { name: '歌手与演员－李荣浩', img: 'singername2.png', time: "04'52'" },
      { name: '歌手与演员－李荣浩', img: 'singername3.png', time: "04'52'" },
      { name: '歌手与演员－李荣浩', img: 'singername4.png', time: "04'52'" },
    ],

    //歌手
    singer: [
      { id: '1', path: 'singer-list1.png', name: '内地偶像组合', },
      { id: '2', path: 'singer-list2.png', name: '内地男歌手' },
      { id: '3', path: 'singer-list3.png', name: '港台歌手' },
      { id: '4', path: 'singer-list4.png', name: '日韩女歌手' },
      { id: '5', path: 'singer-list5.png', name: '内地女歌手' },
      { id: '6', path: 'singer-list6.png', name: '青春偶像男歌手' }
    ],
    //歌手信息
    singerInfo: [
      { name: '蔡妍', num: '382', img: 'singername1.png' },
      { name: '林夕', num: '463', img: 'singername2.png' },
      { name: '王菲', num: '382', img: 'singername3.png' },
      { name: '那英', num: '298', img: 'singername4.png' },
      { name: '孙燕姿', num: '367', img: 'singername5.png' },
      { name: '莫文蔚', num: '567', img: 'singername6.png' },
      { name: '张惠妹', num: '382', img: 'singername7.png' },
      { name: '叮当', num: '382', img: 'singername8.png' },
      { name: '蔡妍', num: '382', img: 'singername9.png' },
    ],
  },
  navClick: function (e) {
    var that = this;
    this.setData({
      active: e.currentTarget.id,
      singerTab: false
    })
    wx.setNavigationBarTitle({
      title: that.data.list[that.data.active].name
    })
  },
  mainSinger: function (e) {
    var that = this;
    wx.setNavigationBarTitle({
      title: e.target.dataset.singer
    })
    this.setData({ singerTab: true })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: that.data.list[that.data.active].name
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