 
var ViewModel = function () {
  var self = this;

  self.phone = ko.observable("");
  self.email = ko.observable("");
  self.code = ko.observable("");
  self.psw = ko.observable("");
  self.npsw = ko.observable("");

  self.next = function(){
    if (self.phone()&&self.phone().length == 11) {
      $('#first').css('display','none');
      $('#second').css('display','block');
      $('.page-forget-progress').find("li").eq(1).addClass('this-active');
    } else if(self.phone()==''){
      $('#p_error').css('display','block').html('手机号不能为空');
    } else{
      $('#p_error').css('display','block').html('请输入正确的手机号码');
    }

    if(self.email()&&self.email().indexOf('@')!=-1){
      $('#first').css('display','none');
      $('#second').css('display','block');
    } else if(self.email() == ''){
      $('#e_error').css('display','block').html('邮箱不能为空');
    } else {
      $('#e_error').css('display','block').html('邮箱格式不正确');
    }
  }

  self.second = function(){
    console.log(22)
    if (self.code()&&self.code().length == 4) {
      $('#first').css('display','none');
      $('#second').css('display','none');
      $('#three').css('display','block');
      $('.page-forget-progress').find("li").eq(2).addClass('this-active');
    } 
  }

  self.submit = function () {
    var model = {};

    model.account = self.phone()&&self.phone().length == 11? self.phone() :self.email();
    model.code = self.code();
    model.psw = self.psw();
    model.npsw = self.npsw();

    if (self.psw()&&self.psw()== self.npsw()) {
      window.location.href = './login.html';
    } else if(self.psw()!=self.npsw()){
      $('#npsw_error').css('display','block').html('两次密码不一致');
    } else if(self.psw() == ''){
      $('#npsw_error').css('display','block').html('新密码不能为空');
    } else if(self.npsw() == ''){
      $('#npsw_error').css('display','block').html('请确认密码');
    }
  };
}
var model = new ViewModel();
ko.applyBindings(model);


$('#find-button span').click(function(){
  if($('#find-email-group').css('display') == 'none'){
    $('#find-email-group').show();
    $('#find-email-group').siblings('.find-phone-group').hide();
    $(this).removeClass('layui-icon-aliyouxiang').addClass('layui-icon-alishouji1');
    $(this).text('手机号码找回');
  }else{
    $('#find-phone-group').show();
    $('#find-phone-group').siblings('.find-email-group').hide();
    $(this).removeClass('layui-icon-alishouji1').addClass('layui-icon-aliyouxiang');
    $(this).text('邮箱账号找回');
  }
})




  // self.phone = ko.observable().extend({
  //   required: { params: true, message: "请输入手机号"} ,
  //   number: {
  //     params: true,
  //     message: "手机必须11位的数字",
  //   }
  // });

  // self.email = ko.observable().extend({
  //   required: { params: true, message: "请输入您的邮箱"},
  //   email: {
  //     params: true,
  //     message: "邮箱格式不正确"
  //   } 
  // });

  // self.code = ko.observable().extend({
  //   required: { params: true, message: "请输入验证码"} ,
  //   number: {
  //     params: true,
  //     message: "验证码为4位数字",
  //   }
  // });

  // self.next = function(){
  //   console.log(self.phone())
  //   self.errors = ko.validation.group(self);
  //   if (self.isValid()) {
  //     console.log(22)
  //     $('#second').css('display','block');
  //     $('#first').css('display','none');
  //   } else {
  //     self.errors.showAllMessages();
  //   }
  // }


 
