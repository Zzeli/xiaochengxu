var tcity = require("../../utils/citys.js");

var app = getApp()
Page({
  data: {
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    shaow:true,
    addressData: {
    gcate_id: 1, consignee: '陈聪', address: '山西省太原市学府街华宇百花谷C座26层', mobile: '13834159700', zipcode:'034000'
    }
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition,
      shaow: !this.data.shaow
    })
  },
  onLoad: function (e) {
    console.log("onLoad");

    // 初始化地址
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;

    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');


// 获取数据


//     // var that = this;
//     // this.initCityData(1);
//     var id = e.id;
//     console.log(id)
// if(id){
    console.log(that.data.addressData)
  that.setData({
              addressData: that.data.addressData,
            });
// }




    // if (id) {
      // 初始化原数据
      // wx.showLoading();



      //根据id查询用户的收货地址
      // wx.request({
      //   url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=chaaddress',
      //   data: {
      //     address_id: id,
      //   },
      //   success: function (res) {
      //     wx.hideLoading();
      //     //console.log(res);
      //     if (res.data != 0) {
      //       that.setData({
      //         id: res.data.address_id,
      //         addressData: res.data,
      //         selProvince: res.data.province.region_name,
      //         selCity: res.data.city.region_name,
      //         selDistrict: res.data.district.region_name
      //       });
      //       return;
      //     } else {
      //       wx.showModal({
      //         title: '提示',
      //         content: '无法获取快递地址数据',
      //         showCancel: false
      //       })
      //     }
      //   }
      // })
      // 
    // }


  },
  bindSave:function(e){
    var that = this;
    var linkMan = e.detail.value.linkMan;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    var code = e.detail.value.code;
    var county = e.detail.value.county;
    console.log(county)
    if (linkMan == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (mobile == "") {
      wx.showModal({  
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }
    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }
    if (code == "") {
      wx.showModal({
        title: '提示',
        content: '请填写邮编',
        showCancel: false
      })
      return
    }
  




    
    // wx.navigateBack();    
    // wx.showToast({
    //   title: '成功保存',
    //   icon: 'success',
    //   duration: 2000
    // });



    var apiAddoRuPDATE = "add";
    var apiAddid = that.data.id;
    if (apiAddid) {
      apiAddoRuPDATE = "update";
    } else {
      apiAddid = 0;
    }
    //添加新地址和修改
    wx.request({
      url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=add_address',
      data: {
        user_id: app.globalData.token.user_id,
        id: apiAddid,
        province: commonCityData.cityData[this.data.selProvinceIndex].id,
        city: cityId,
        district: districtId,
        consignee: linkMan,
        address: address,
        mobile: mobile,
        zipcode: code,
        isDefault: 'true'
      },
      success: function (res) {
        console.log(res);
        if (res.data == 400) {
          // 登录错误 
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: '请先授权登陆',
            showCancel: false
          })
          return;
        }
        if (res.data == 123) {
          wx.showToast({
            title: '添加地址成功',
            icon: 'success',
            duration: 3000
          })
        }
        // 跳转到结算页面
        wx.navigateBack({})
      }
    })



  },
  cancel:function(){
    wx.navigateBack();  
  },

  deleteAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://shop.demo.ihuanyan.cn/wxapp/index.php?act=delete_address',
            data: {
              address_id: id
            },
            success: function (res) {
              wx.navigateBack({})

            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
 
})
