var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data:{
    userInfo: {},
    currentTpye:0,
    tabClass: ["", "", "", "", ""],
    stepList:"",
    color: "red",
    backcolor:"#eee"
  },
  statusTap:function(e){
     var curType =  e.currentTarget.dataset.index;
     this.data.currentTpye = curType
     this.setData({
      currentTpye:curType
     });
     this.onShow();
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    app.registerUser()
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
 
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  },
  addContact: function(e) {
    var userInfo = this.data.userInfo;
    wx.addPhoneContact({
      photoFilePath: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      lastName: '张庆',
      middleName: '张庆',
      firstName: '张庆',
      remark: '只有我自己知道',
      mobilePhoneNumber: '18761169562',
      weChatNumber: 'heatgemini',
      addressCountry: '中国',
      addressState: '',
      addressCity: '',
      addressStreet: '',
      addressPostalCode: '',
      organization: '',
      title: '',
      workFaxNumber: '',
      workPhoneNumber: '',
      hostNumber: '',
      email: '616743670@qq.com',
      url: 'http://qiyihx.com',
      workAddressCountry: '',
      workAddressState: '',
      workAddressCity: '',
      workAddressStreet: '',
      workAddressPostalCode: '',
      homeFaxNumber: '',
      homePhoneNumber: '',
      homeAddressCountry: '',
      homeAddressState: '',
      homeAddressCity: '',
      homeAddressStreet: '',
      homeAddressPostalCode: '',
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '添加通讯录成功',
          showCancel: false
        })
       },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '添加通讯录失败，请重试',
          showCancel: false
        })
      },
      complete: function (res) { },
    });
   // app.sendTplMsg(e.detail.formId, '添加通讯录');
  },
  editcontact: function(e){
    console.log('编辑通讯录');
    wx.navigateTo({
      url: "/pages/business-card-edit/detail"
    })
  },
  callme: function (e){
    wx.makePhoneCall({
      phoneNumber: '18761169562'
    })
  }
})