var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data:{
    userInfo: {},
    currentTpye:0,
    tabClass: ["", "", "", "", ""],
    stepList:"",
    color: "red",
    backcolor:"#eee",
    wxappcontact: {}
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
    var id = decodeURIComponent(options.scene);
    if (id != 'undefined'){
      app.getContact(id, function(res){
        that.setData({
          wxappcontact: res.data
        });
      });
    }else{
      app.getContactByCode(function(res){
        var data = res.data;
        app.getUserInfo(function (userInfo) {
          //更新数据
          that.setData({
            wxappcontact: { "photo_file_path": userInfo.avatarUrl, "nick_name": userInfo.nickName }
          })
          app.saveContact("photo_file_path", userInfo.avatarUrl);
          app.saveContact("nick_name", userInfo.nickName);
          if (data) {
            data.nick_name = userInfo.nickName;
            data.photo_file_path = userInfo.avatarUrl;
            that.setData({
              wxappcontact: data
            });
          }
        })
      });
    }
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
    app.getContactByCode(function(res){
      console.log(res);
      if (res.data == '' || res.data.mobile_phone_number == '') {
        wx.showModal({
          title: '提示',
          content: '请先编辑通讯录',
        })
      }else{
        if (wx.vibrateLong) {
          wx.vibrateLong({})
        } 
        app.addContact(res.data);
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
    var mobile_phone_number = e.currentTarget.dataset.id;
    if (mobile_phone_number) {
      if (wx.vibrateLong) {
        wx.vibrateLong({})
      } 
      wx.makePhoneCall({
        phoneNumber: mobile_phone_number
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先编辑通讯录',
      })
    }  
  }
})