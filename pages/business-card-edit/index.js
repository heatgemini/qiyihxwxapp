var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data:{
    id: "",
    val:""
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
    this.setData({
      id: options.id,
      val: options.val
    });
  },
  save_info: function(e){
    wx.showModal({
      title: '234',
      content: '保存通讯录' + e.detail.value + "--" + e.currentTarget.dataset.id,
    })
    wx.request({
      url: 'https://www.baiduc.om',
    })
  }
})