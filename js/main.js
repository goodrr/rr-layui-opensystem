$(function(){
  // larry-side-menu向左折叠
  $('.larry-side-menu').click(function() {
    var sideWidth = $('#larry-side').width();
    if(sideWidth === 200) {
      $('#larry-body').animate({
        left: '0'
      }); 
      $('#larry-footer').animate({
        left: '0'
      });
      $('#larry-side').animate({
        width: '0'
      });
    } else {
      $('#larry-body').animate({
        left: '200px'
      });
      $('#larry-footer').animate({
        left: '200px'
      });
      $('#larry-side').animate({
        width: '200px'
      });
    }
  });

  $('.layui-nav-tree .layui-nav-even').on('click',function(){  
    if($(this).next('.layui-nav-child').css('display')=='block'){
      $(this).parent('.layui-nav-item').removeClass('layui-nav-itemed');
      $(this).next('.layui-nav-child').css('display','none');    
    }else{
      $(this).parent('.layui-nav-item').addClass('layui-nav-itemed');
      $(this).next('.layui-nav-child').css('display','block');
      $(this).parent('.layui-nav-item').siblings(':not(.layui-this-self)').find('.layui-nav-child').css('display','none');
      $(this).parent('.layui-nav-item').siblings().removeClass('layui-nav-itemed');
      $(this).siblings(".layui-nav-child").find("dd.layui-nav-itemed").removeClass('layui-nav-itemed');
    }  
  }); 

  //iframe自适应
  $(window).on('resize', function() {
    var $content = $('#larry-tab .layui-tab-content');
    $content.height($(this).height() - 155);
    $content.find('iframe').each(function() {
      $(this).height($content.height());
    });
    tab_W = $('#larry-tab').width();
    var larryFoot = $('#larry-footer').width();
  }).resize();

  // 刷新iframe操作
  $("#refresh_iframe").click(function(){
    $(".layui-tab-content .layui-tab-item").each(function(){
      if($(this).hasClass('layui-show')){
        $(this).children('iframe')[0].contentWindow.location.reload(true);
      }
    });
  });

});



