var app = getApp()
Page({
  data: {
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    hasList: false,     // 列表是否有数据
    totalPrice: 0,      // 总价，初始为0
    selectAllStatus: false,  // 全选状态，默认全选
    collect:false
  },
  onLoad: function () {
  
  },
  onShow() {
    this.setData({
      hasList: true,    // 既然有数据了，那设为true吧
      items:[
        { id: 1, title: '短身金头蓝底过背金龙 24-25公分 翡翠蓝底', image: 'https://img12.360buyimg.com/n7/jfs/t2584/348/1423193442/572601/ae464607/573d5eb3N45589898.jpg', num: 4, price: 0.02, selected: false },
        { id: 2, title: '短身金头蓝底过背金龙 24-25公分 翡翠蓝底', image: 'https://img12.360buyimg.com/n7/jfs/t2584/348/1423193442/572601/ae464607/573d5eb3N45589898.jpg', num: 1, price: 0.03, selected: false }
      ]
    });
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
  },
  getTotalPrice() {
    let items = this.data.items;         // 获取购物车列表
    let total = 0;
    for (let i = 0; i < items.length; i++) {     // 循环列表得到每个数据
      if (items[i].selected) {          // 判断选中才会计算价格
        total += items[i].num * items[i].price;   // 所有价格加起来
      }
    }
    this.setData({                // 最后赋值到data中渲染到页面
      items: items,
      totalPrice: total.toFixed(2)
    });
  },
  selectList(e) {
    const index = e.currentTarget.dataset.index;  // 获取data- 传进来的index
    let items = this.data.items;          // 获取购物车列表
    const selected = items[index].selected;     // 获取当前商品的选中状态
    items[index].selected = !selected;       // 改变状态
    this.setData({
      items: items
    });
    this.getTotalPrice();              // 重新获取总价
  },
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;  // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let items = this.data.items;

    for (let i = 0; i < items.length; i++) {
      items[i].selected = selectAllStatus;      // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      items: items
    });
    this.getTotalPrice();                // 重新获取总价
  },
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let items = this.data.items;
    let num = items[index].num;
    num = num + 1;
    items[index].num = num;
    this.setData({
      items: items
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let items = this.data.items;
    let num = items[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    items[index].num = num;
    this.setData({
      items: items
    });
    this.getTotalPrice();
  },
 
})