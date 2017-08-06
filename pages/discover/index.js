var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data:{
    userInfo: {},
    currentTpye:0,
    tabClass: ["", "", "", "", ""],
    stepList:"",
    color: "red",
    backgroundImg:{},
    ideas:[]
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
    wx.request({
      url: app.globalData.requestUrl.replace('URL', app.globalData.apiDomain + '/area/random.php'),
      data: {
        type: '1',
        status: '1'
      },
      success: function (res) {
        that.setData({
          backgroundImg: res.data.data
        });
      }
    })

    wx.request({
      url: app.globalData.requestUrl.replace('URL', app.globalData.apiDomain + '/area/list.php'),
      data: {
        type: '1',
        status: '1'
      },
      success: function (res) {
        that.setData({
          ideas: res.data.data
        });
      }
    })
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
  changebackground: function (e) {
    if (e.currentTarget.dataset.id != 0) {
      var that = this;
      wx.request({
        url: app.globalData.requestUrl.replace('URL', app.globalData.apiDomain + '/area/random.php'),
        data: {
          type: '1',
          id: e.currentTarget.dataset.id,
          status: '1'
        },
        success: function (res) {
          that.setData({
            backgroundImg: res.data.data
          });
        }
      })
    }
  },
  wxappcontact: function(e){
    wx.navigateTo({
      url: "/pages/business-card/index"
    })
  }
})