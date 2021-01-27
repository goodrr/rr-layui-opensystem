layui.use(['laypage', 'layer'], function(){
	var laypage = layui.laypage;
	var layer = layui.layer;
	//完整功能
	var data = [];
	laypage.render({
	  	elem: 'demo7',
	  	count: 100,
	  	layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
	  	jump: function(obj){
	  		console.log(obj)
	  		 //模拟渲染
		    document.getElementById('page_list').innerHTML = function(){
		        var arr = []
		        ,thisData = data.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
		        layui.each(thisData, function(index, item){
		          arr.push('<li>'+ item +'</li>');
		        });
		        return arr.join('');
		    }();
	  	}
	});

});
