//app.js
App({
  globalData: {
    userInfo: null,
    subDomain: "mall",
    requestUrl: "https://wxapi.hotapp.cn/proxy/?appkey=hotapp2427615&url=URL",
    apiDomain: "http://qiyihx.com/api"
  },
  onLaunch: function () {
    var that = this;
    this.login();
  },
  login : function () {
    var that = this;
    var token = that.globalData.token;
    if (token) {
      wx.request({
        url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/check-token',
        data: {
          token: token
        },
        success: function (res) {
          if (res.data.code != 0) {
            that.globalData.token = null;
            that.login();
          }
        }
      })
      return;
    }
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://api.it120.cc/'+ that.globalData.subDomain +'/user/wxapp/login',
          data: {
            code: res.code
          },
          success: function(res) {
            if (res.data.code == 10000) {
              // 去注册
              that.registerUser();
              return;
            }
            if (res.data.code == 0) {
              // 登录错误 
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel:false
              })
              return;
            }
            that.globalData.token = res.data.token;
          }
        })
      }
    })
  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            //wx.request({
              //url: 'https://api.it120.cc/' + that.globalData.subDomain +'/user/wxapp/register/complex',
             // data: {code:code,encryptedData:encryptedData,iv:iv}, // 设置请求的 参数
              //success: (res) =>{
               // console.log();
                //wx.hideLoading();
                //that.login();
              //}
           // })
          }
        })
      }
    })
  },
  
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              console.log(res.userInfo);
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  sendTplMsg: function (formId, content) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.request({
          url: that.globalData.requestUrl.replace('URL', 'http://qiyihx.com/api/wxapp/sendTplMsg.php?code=' + code + '&form_id=' + formId),
          success: function (res) {
            var result = res.data.result;
            console.log(res.data);
            wx.showModal({
              title: '提示',
              content: result.errcode == 0 ? '发送成功' : '发送失败:' + result.errcode,
              showCancel: false
            })
          }
        })
      }
    });
  },
  wxRunData: function (cb) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getWeRunData({
          success(res) {
            const encryptedData = encodeURIComponent(res.encryptedData);
            const iv = encodeURIComponent(res.iv);
            var url = 'http://qiyihx.com/api/wxapp/wxRunData.php?code=' + code + '&encryptedData=' + encryptedData + '&iv=' + iv;
            url = that.globalData.requestUrl.replace('URL', url);  
            wx.request({
              url: url,
              success: function (res) {
                var result = res.data;
                console.log(result);
                that.globalData.stepList = result;
                cb(that.globalData.stepList);   
              }
            })
          }
        })
      }
    });
  },

})