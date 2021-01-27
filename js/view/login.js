
var code; //在全局定义验证码      
//产生验证码     
window.onload = function() {  
  createCode();  
}  

function createCode(){  
  code = "";  
  var codeLength = 5; //验证码的长度     
  var checkCode = document.getElementById("checkCode");  
  var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',  
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数     
  for(var i = 0; i < codeLength; i++) { //循环操作     
      var charIndex = Math.floor(Math.random() * 36); //取得随机数的索引     
      code += random[charIndex]; //根据索引取得随机数加到code上     
  }  
  checkCode.value = code; //把code值赋给验证码     
} 
   
//校验验证码     
function validate() {  
  var inputCode = document.getElementById("input").value.toUpperCase(); //取得输入的验证码并转化为大写           
  if(inputCode.length <= 0) { //若输入的验证码长度为0     
      alert("请输入验证码！"); //则弹出请输入验证码     
  } else if(inputCode != code) { //若输入的验证码与产生的验证码不一致时     
      alert("验证码输入错误！"); //则弹出验证码输入错误     
      createCode(); //刷新验证码     
  } else { //输入正确时     
      alert("^-^"); //弹出^-^     
  }  
} 

layui.use(['element', 'form', 'layer'], function(){
  var element = layui.element,
      form = layui.form,
      layer = layui.layer;
  form.verify({
      phone: [/^1[3|4|5|7|8]\d{9}$/, '手机必须11位，只能是数字！'],
      account: function(value){
        if(value.length < 1){
            return '账号不能为空！';
        }
      },
      password: function(value){
        if(value.length < 1){
            return '密码不能为空！';
        }
      },
      imgcode: function(value){
        if(value.length < 1){
            return '图形验证码不能为空！';
        }
      }
  });
  form.on("submit(Login)", function (data) {
    const res = data.field;
    let model = {};
    model.account = res.account ? res.account : res.phone;
    model.code = res.account ? res.imgcode : res.phonecode;
    model.password = res.account ? res.password : '';
    console.log(model)

    window.location.href = './index.html';
    return false;

    // $.post('/passport/login', model, function (data) {
    //   console.log(data);
    //   if (data.isError) {
    //     layer.msg('用户名或密码错误！');
    //     return;
    //   }
    //   $.cookie('access_token', data.accessToken);
    //   window.location.href = '/Home';
    // });

  });
})


// var ViewModel = function () {
//   var self = this;
//   self.account = ko.observable("");
//   self.password = ko.observable("");
//   self.imgcode = ko.observable(""); 

//   self.phone = ko.observable("");
//   self.phonecode = ko.observable("");

//   self.Login = function () {
//     var model = {};

//     if(self.phone()){
//       model.phone = self.phone();
//       model.phonecode = self.phonecode();
//     }else{
//       model.account = self.account();
//       model.password = self.password();
//       model.imgcode = self.imgcode();
//       if (model.account != '' && model.password != ''&&model.imgcode != '') {
//         window.location.href = './index.html';
//       } 
//     }
//   };
// }
// var model = new ViewModel();
// ko.applyBindings(model);



