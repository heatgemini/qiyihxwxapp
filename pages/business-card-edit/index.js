var app = getApp()
Page({
  data:{
    id: "",
    wxappcontact:{}
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
    app.saveContact(e.currentTarget.dataset.id, e.detail.value);
  }
})