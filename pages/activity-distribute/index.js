var util = require('../../utils/util.js')
var app = getApp()
Page({
  data:{
    userInfo: {},
    currentTpye:0,
    date: util.formatDate(new Date),
    time: util.formatTime(new Date),
    title:"",
    detail:"",
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
    var formId = e.detail.formId;
    app.addActivity(this.data, formId, function(res){
        console.log('发布活动==>'+res.data);
        if (res.data== 0){
            wx.showModal({
              title: '提示',
              content: '发布成功'
            })
        }
    });
    //app.sendTplMsg(e.detail.formId, '你哪里了');
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '开启你的幻想旅行',
      path: '/pages/discover/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
   bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  edit_info: function (e) {
    var val = e.currentTarget.dataset.val;
    if (val == null || val == 'undefined') {
      val = "";
    }
    wx.navigateTo({
      url: "/pages/activity-edit/index?id=" + e.currentTarget.dataset.id + "&val=" + val
    })
  }
})