$(function(){
    $(".layui-nav-child>dd").bind("click",openPage);
    $(".layui-nav-tree dd").each(function(k) {
        if (!$(this).children('a').attr("data-url")) {
            $(this).children('a').attr("data-url", k)
        }
    });
    function openPage(){
        var wrapW = $(".layui-top-wrap").width();
        var actWidth = $(".layui-top-title .layui-this").outerWidth(true);
        var sumWidth = 0;
        var hre = $(this).children("a").attr("href"),
            ind = $(this).index(),
            txt = $.trim($(this).children("a").text()),
            k = true;
            //console.log(hre)
        if (hre == undefined || $.trim(hre).length == 0) {
            return false ;
        }
       
        if($(this).closest(".layui-nav-item").hasClass('layui-this-self')){
            $(this).addClass("layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
            $(this).closest(".layui-nav-item").siblings("li.layui-nav-item").children('.layui-nav-child').css('display','none');
            $(this).closest(".layui-nav-item").siblings("li.layui-nav-itemed").removeClass("layui-nav-itemed");
        }else{
            $(this).addClass("layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
            $(this).closest(".layui-nav-item").siblings().find(".layui-nav-itemed").removeClass("layui-nav-itemed");
        }
        $(".layui-top-title .layui-this").each(function() { 
            if ($(this).children(".layui-top-subnav").data("id") == hre) {
                if (!$(this).hasClass("layui-nav-itemed")) {                 
                    $(this).addClass("layui-nav-itemed").siblings(".layui-this").removeClass("layui-nav-itemed");
                    $(".layui-tab-content .larry-iframe").each(function() {
                        if ($(this).data("id") == hre) {
                            $(this).show().siblings(".larry-iframe").hide();
                            return false ;
                        }
                    }) 
                }
                k = false;
                var beforeWidth = 0,afterWidth = 0; 
                var actWidth = $(this).outerWidth(true);
                var beforeAll = $(this).prevAll();
                var afterAll = $(this).nextAll();
                beforeAll.each(function(){
                    beforeWidth += $(this).outerWidth(true);   
                })
                afterAll.each(function(){
                    afterWidth += $(this).outerWidth(true);   
                })
                //console.log(beforeWidth,afterWidth)
                if((afterWidth + actWidth - wrapW) >= 0){
                    $(".layui-top-title").animate({
                        "margin-left":-beforeWidth - 120 +'px'
                    },"fast")
                }
                return false ;
            } ;
        });

        if (k) {
            var p = '<li class="layui-this layui-nav-itemed"><span class="layui-top-subnav" data-id="' + hre + '"><em>'+ txt + '</em><i class="icon iconfont icon-guanbi fr layui-close-btn"></i></span></li>';
            $(".layui-top-title .layui-this").removeClass("layui-nav-itemed");
            var n = '<iframe class="larry-iframe" name="' + txt + '" src="' + hre + '" data-id="' + hre + '"></iframe>';
            $(".layui-tab-content").find(".larry-iframe").hide().parents(".layui-tab-content").append(n);
            $(".layui-top-title").append(p);
            $(".layui-this").each(function() {                   
                sumWidth += $(this).outerWidth(true);   
            })
            if((sumWidth-wrapW) >= 0){
                $(".layui-top-title").animate({
                    "margin-left":-(sumWidth - wrapW) + 50 +'px'
                },"fast")
            }
        }   
        return false ; 
        $(".layui-nav-child>dd").unbind("click",openPage); 
    }

    function closeBtn(e) {  
        e.stopPropagation();
        var wrapW = $(".layui-top-all").width();
        var sumWidth = 0;
        var m = $(this).parent(".layui-top-subnav").data("id");
        var l = $(this).closest(".layui-top-title").width();
        if ($(this).closest(".layui-this").hasClass("layui-nav-itemed")) {
            if ($(this).closest(".layui-this").next(".layui-this").size()) {
                var k = $(this).closest(".layui-this").next(".layui-this").children(".layui-top-subnav").data("id");
                $(this).closest(".layui-this").next(".layui-this").addClass("layui-nav-itemed");
                $(".layui-tab-content .larry-iframe").each(function() {
                    if ($(this).data("id") == k) {
                        $(this).show().siblings(".larry-iframe").hide();
                        return false;
                    }
                });
                $(this).closest(".layui-this").remove();
            }else{
                $(this).closest(".layui-this").prev(".layui-this").addClass("layui-nav-itemed");
                $(".layui-tab-content .larry-iframe").each(function() {
                    if ($(this).data("id") == m) {
                        $(this).hide().prev(".larry-iframe").show();
                        return false;
                    }
                });
                $(this).closest(".layui-this").remove();
            }
            if ($(this).closest(".layui-this").prev(".layui-this").size()) {
                var k = $(this).closest(".layui-this").prev(".layui-this:last").data("id");    
                $(this).closest(".layui-this").prev(".layui-this:last").addClass("layui-nav-itemed");
                $(".layui-tab-content .larry-iframe").each(function() {
                    if ($(this).data("id") == k) {
                        $(this).show().siblings(".larry-iframe").hide();
                        return false;
                    }
                });
                $(this).closest(".layui-this").remove();
                $(".layui-tab-content .larry-iframe").each(function() {
                    if ($(this).data("id") == m) {
                        $(this).remove();
                        return false;
                    }
                })
            }
        } else {
            $(this).closest(".layui-this").remove();
            $(".layui-tab-content .larry-iframe").each(function() {
                if ($(this).data("id") == m) {
                    $(this).remove();
                    return false ;
                }
            });
        }
        $(".layui-top-title .layui-this").each(function() { 
            sumWidth += $(this).outerWidth(true);
        })
        //console.log(sumWidth,wrapW)
        if((sumWidth - wrapW) >= 0){
            $(".layui-top-title").animate({
                "margin-left":-(sumWidth - wrapW) + 'px'
            },"fast")
        }
        if((sumWidth-wrapW)<0){
             $(".layui-top-title").animate({
                "margin-left":'0'
            },"fast")
        }
        return false ;
    }
    $(".layui-top-title").on("click", ".layui-this .layui-close-btn", closeBtn);

    function togglePage(){
        var $self = $(this);
        var listId = $self.children('.layui-top-subnav').data("id"); 
        $(".layui-nav-tree dd").each(function(){    
            var menuhre = $(this).children("a").attr("href");  
            if (menuhre == "main/main.html"){
                $(".larry-iframe.main-iframe").show().siblings(".larry-iframe").hide();
            }else{
                $(".larry-iframe.main-iframe").hide();
            }
            if (menuhre == listId) {
                $(this).addClass("layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
                $(this).show().siblings(".larry-iframe").hide();
            } 
            $(".layui-tab-content .larry-iframe").each(function() {
                if ($(this).data("id") == listId) {
                    $(this).show().siblings(".larry-iframe").hide();
                    return false;
                }
            }) 
        }); 
        if (!$self.hasClass("layui-nav-itemed")) {
            $self.addClass("layui-nav-itemed").siblings(".layui-this").removeClass("layui-nav-itemed");
        } 
    }
    $(".layui-top-title").on("click", ".layui-this", togglePage); 

    //主内容右边总的关闭按钮
    $(".closeALLbtn").on("click",function(){
        $(".layui-top-title").children(".layui-this:not(:first)").remove();
        $(".layui-top-title .layui-this:first").addClass("layui-nav-itemed");
        $(".larry-iframe:first").show().siblings(".larry-iframe").hide();
        $(".layui-top-title").animate({
            "margin-left":'0'
        },"fast")
        return false ;
    }); 
})
    
    
    




















