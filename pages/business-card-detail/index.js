var app = getApp()
Page({
  data:{
    userInfo: {},
    currentTpye:0,
    tabClass: ["", "", "", "", ""],
    stepList:"",
    color: "red",
    backcolor:"#eee",
    wxappcontact:{}
  },
  statusTap:function(e){
    console.log('234333');
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
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.request({
          url: app.globalData.requestUrl.replace('URL', app.globalData.apiDomain + '/area/detail.php'),
          data: {
            code: code
          },
          success: function (res) {
            var data = res.data;
            app.getUserInfo(function (userInfo) {
              //更新数据
              that.setData({
                wxappcontact: { "photo_file_path": userInfo.avatarUrl, "nick_name": userInfo.nickName }
              })
              app.saveContact("photo_file_path", userInfo.avatarUrl);
              app.saveContact("nick_name", userInfo.nickName);
              console.log('----->'+data.data);
              if (data.data != null && data.data != "") {
                data.data.nick_name = userInfo.nickName;
                data.data.photo_file_path = userInfo.avatarUrl;
                that.setData({
                  wxappcontact: data.data
                });
              }  
            })  
          }
        })
      }
    });
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    console.log('onReady');
 
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    console.log('onHide');
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    console.log('onUnload');
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    console.log('onPullDownRefresh');
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    console.log('onReachBottom');
  },
  edit_info: function(e){
    console.log('修改通讯录' + e.currentTarget.dataset.id);
    var val = e.currentTarget.dataset.val;
    if (val == null || val == 'undefined'){
      val = "";
    }
    wx.navigateTo({
      url: "/pages/business-card-edit/index?id=" + e.currentTarget.dataset.id + "&val=" + val
    })
  }
})