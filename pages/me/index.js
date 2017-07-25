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
    var that = this
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
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.formId)
    app.sendTplMsg(e.detail.formId, '你从哪里了');
  },
  wxrun: function(e) {
    var that = this;
    app.wxRunData(function (stepList) {
      //更新数据
      that.setData({
        stepList: stepList
      })
      wx.showModal({
        title: '提示',
        content: '您的当日步数 ：' + stepList,
        showCancel: false
      })
    });
   
  },
  showtime: function(e){
    console.log(Math.random().toString(16).substr(2, 6));
    var color = Math.random().toString(16).substr(2, 6); 
    var backcolor = Math.random().toString(16).substr(2, 6);
    this.setData({
      color: '#' + color,
      backcolor: '#' + backcolor
    })
  }
})