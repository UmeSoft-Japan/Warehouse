var $,tab,dataStr,layer;
layui.config({
	base : "/resources/js/"
}).extend({
	"bodyTab" : "bodyTab"
})
layui.use(['bodyTab','form','element','layer','jquery'],function(){
	var form = layui.form,
		element = layui.element;
		$ = layui.$;
    	layer = parent.layer === undefined ? layui.layer : top.layer;
		tab = layui.bodyTab({
			openTabNum : "50",
			url : "/menu/loadIndexLeftMenuJson"
		});

	function getData(json){
		$.getJSON(tab.tabConfig.url,function(data){
			dataStr = data.data;
			tab.render();
		})
	}
	$(".topLevelMenus li,.mobileTopLevelMenus dd").click(function(){
		if($(this).parents(".mobileTopLevelMenus").length != "0"){
			$(".topLevelMenus li").eq($(this).index()).addClass("layui-this").siblings().removeClass("layui-this");
		}else{
			$(".mobileTopLevelMenus dd").eq($(this).index()).addClass("layui-this").siblings().removeClass("layui-this");
		}
		$(".layui-layout-admin").removeClass("showMenu");
		$("body").addClass("site-mobile");
		getData($(this).data("menu"));
		tab.tabMove();
	})

	$(".hideMenu").click(function(){
		if($(".topLevelMenus li.layui-this a").data("url")){
			layer.msg("此栏目状态下左侧菜单不可展开");
			return false;
		}
		$(".layui-layout-admin").toggleClass("showMenu");
		tab.tabMove();
	})

	getData("contentManagement");
	$("body").on("click",".layui-nav .layui-nav-item a:not('.mobileTopLevelMenus .layui-nav-item a')",function(){
		if($(this).siblings().length == 0){
			addTab($(this));
			$('body').removeClass('site-mobile');
		}
		$(this).parent("li").siblings().removeClass("layui-nav-itemed");
	})

    if(cacheStr == "true") {
        if (window.sessionStorage.getItem("menu") != null) {
            menu = JSON.parse(window.sessionStorage.getItem("menu"));
            curmenu = window.sessionStorage.getItem("curmenu");
            var openTitle = '';
            for (var i = 0; i < menu.length; i++) {
                openTitle = '';
                if (menu[i].icon) {
                    if (menu[i].icon.split("-")[0] == 'icon') {
                        openTitle += '<i class="seraph ' + menu[i].icon + '"></i>';
                    } else {
                        openTitle += '<i class="layui-icon">' + menu[i].icon + '</i>';
                    }
                }
                openTitle += '<cite>' + menu[i].title + '</cite>';
                openTitle += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + menu[i].layId + '">&#x1006;</i>';
                element.tabAdd("bodyTab", {
                    title: openTitle,
                    content: "<iframe src='" + menu[i].href + "' data-id='" + menu[i].layId + "'></frame>",
                    id: menu[i].layId
                })

                if (curmenu != "undefined") {
                    if (curmenu == '' || curmenu == "null") {
                        element.tabChange("bodyTab", '');
                    } else if (JSON.parse(curmenu).title == menu[i].title) {
                        element.tabChange("bodyTab", menu[i].layId);
                    }
                } else {
                    element.tabChange("bodyTab", menu[menu.length - 1].layId);
                }
            }
            tab.tabMove();
        }
    }else{
		window.sessionStorage.removeItem("menu");
		window.sessionStorage.removeItem("curmenu");
	}
})

function addTab(_this){
	tab.tabAdd(_this);
}
