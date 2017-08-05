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
    app.getContact(function(data){
      console.log(data);
      if (data.data == '' || data.data.mobile_phone_number == '') {
        wx.showModal({
          title: '提示',
          content: '请先编辑通讯录',
        })
      }else{
        app.addContact(data.data);
      }
    });
   // app.sendTplMsg(e.detail.formId, '添加通讯录');
  },
  editcontact: function(e){
    console.log('编辑通讯录');
    wx.navigateTo({
      url: "/pages/business-card-detail/index"
    })
  },
  callme: function (e){
    app.getContact(function (data) {
      console.log(data);
      if (data.data == '' || data.data.mobile_phone_number == '') {
        wx.showModal({
          title: '提示',
          content: '请先编辑通讯录',
        })
      } else {
        wx.makePhoneCall({
          phoneNumber: data.data.mobile_phone_number
        })
      }
    });  
  }
})