var tabFilter,menu=[],liIndex,curNav,delMenu,
    changeRefreshStr = window.sessionStorage.getItem("changeRefresh");
layui.define(["element","jquery"],function(exports){
	var element = layui.element,
		$ = layui.$,
		layId,
		Tab = function(){
			this.tabConfig = {
				openTabNum : undefined,
				tabFilter : "bodyTab",
				url : undefined
			}
		};

    //左側メニュー
    Tab.prototype.navBar = function(strData){
        var data;
        if(typeof(strData) == "string"){
            var data = JSON.parse(strData);
        }else{
            data = strData;
        }
        var ulHtml = '';
        for(var i=0;i<data.length;i++){
            if(data[i].spread || data[i].spread == undefined){
                ulHtml += '<li class="layui-nav-item layui-nav-itemed">';
            }else{
                ulHtml += '<li class="layui-nav-item">';
            }
            if(data[i].children != undefined && data[i].children.length > 0){
                ulHtml += '<a>';
                if(data[i].icon != undefined && data[i].icon != ''){
                    if(data[i].icon.indexOf("icon-") != -1){
                        ulHtml += '<i class="seraph '+data[i].icon+'" data-icon="'+data[i].icon+'"></i>';
                    }else{
                        ulHtml += '<i class="layui-icon" data-icon="'+data[i].icon+'">'+data[i].icon+'</i>';
                    }
                }
                ulHtml += '<cite>'+data[i].title+'</cite>';
                ulHtml += '<span class="layui-nav-more"></span>';
                ulHtml += '</a>';
                ulHtml += '<dl class="layui-nav-child">';
                for(var j=0;j<data[i].children.length;j++){
                    if(data[i].children[j].target == "_blank"){
                        ulHtml += '<dd><a data-url="'+data[i].children[j].href+'" target="'+data[i].children[j].target+'">';
                    }else{
                        ulHtml += '<dd><a data-url="'+data[i].children[j].href+'">';
                    }
                    if(data[i].children[j].icon != undefined && data[i].children[j].icon != ''){
                        if(data[i].children[j].icon.indexOf("icon-") != -1){
                            ulHtml += '<i class="seraph '+data[i].children[j].icon+'" data-icon="'+data[i].children[j].icon+'"></i>';
                        }else{
                            ulHtml += '<i class="layui-icon" data-icon="'+data[i].children[j].icon+'">'+data[i].children[j].icon+'</i>';
                        }
                    }
                    ulHtml += '<cite>'+data[i].children[j].title+'</cite></a></dd>';
                }
                ulHtml += "</dl>";
            }else{
                if(data[i].target == "_blank"){
                    ulHtml += '<a data-url="'+data[i].href+'" target="'+data[i].target+'">';
                }else{
                    ulHtml += '<a data-url="'+data[i].href+'">';
                }
                if(data[i].icon != undefined && data[i].icon != ''){
                    if(data[i].icon.indexOf("icon-") != -1){
                        ulHtml += '<i class="seraph '+data[i].icon+'" data-icon="'+data[i].icon+'"></i>';
                    }else{
                        ulHtml += '<i class="layui-icon" data-icon="'+data[i].icon+'">'+data[i].icon+'</i>';
                    }
                }
                ulHtml += '<cite>'+data[i].title+'</cite></a>';
            }
            ulHtml += '</li>';
        }
        return ulHtml;
    }

	Tab.prototype.render = function() {
		var _this = this;
		$(".navBar ul").html('<li class="layui-nav-item layui-this"><a data-url="/sys/toWarehouseManager.html"><i class="layui-icon" data-icon=""></i><cite>トップページ</cite></a></li>').append(_this.navBar(dataStr)).height($(window).height()-210);
		element.init();
		$(window).resize(function(){
			$(".navBar").height($(window).height()-210);
		})
	}

	Tab.prototype.changeRegresh = function(index){
        if(changeRefreshStr == "true"){
            $(".clildFrame .layui-tab-item").eq(index).find("iframe")[0].contentWindow.location.reload();
        }
	}

	Tab.prototype.set = function(option) {
		var _this = this;
		$.extend(true, _this.tabConfig, option);
		return _this;
	};

	Tab.prototype.getLayId = function(title){
		$(".layui-tab-title.top_tab li").each(function(){
			if($(this).find("cite").text() == title){
				layId = $(this).attr("lay-id");
			}
		})
		return layId;
	}

	Tab.prototype.hasTab = function(title){
		var tabIndex = -1;
		$(".layui-tab-title.top_tab li").each(function(){
			if($(this).find("cite").text() == title){
				tabIndex = 1;
			}
		})
		return tabIndex;
	}

	//画面操作
	var tabIdIndex = 0;
	Tab.prototype.tabAdd = function(_this){
		if(window.sessionStorage.getItem("menu")){
			menu = JSON.parse(window.sessionStorage.getItem("menu"));
		}
		var that = this;
		var openTabNum = that.tabConfig.openTabNum;
			tabFilter = that.tabConfig.tabFilter;
		if(_this.attr("target") == "_blank"){
			window.open(_this.attr("data-url"));
		}else if(_this.attr("data-url") != undefined){
			var title = '';
			if(_this.find("i.seraph,i.layui-icon").attr("data-icon") != undefined){
				if(_this.find("i.seraph").attr("data-icon") != undefined){
					title += '<i class="seraph '+_this.find("i.seraph").attr("data-icon")+'"></i>';
				}else{
					title += '<i class="layui-icon">'+_this.find("i.layui-icon").attr("data-icon")+'</i>';
				}
			}

			if(that.hasTab(_this.find("cite").text()) == -1 && _this.siblings("dl.layui-nav-child").length == 0){
				if($(".layui-tab-title.top_tab li").length == openTabNum){
					layer.msg('同時に開けるタブは'+openTabNum+'個までです。');
					return;
				}
				tabIdIndex++;
				title += '<cite>'+_this.find("cite").text()+'</cite>';
				title += '<i class="layui-icon layui-unselect layui-tab-close" data-id="'+tabIdIndex+'">&#x1006;</i>';
				element.tabAdd(tabFilter, {
			        title : title,
			        content :"<iframe src='"+_this.attr("data-url")+"' data-id='"+tabIdIndex+"'></iframe>",
			        id : new Date().getTime()
			    })

				var curmenu = {
					"icon" : _this.find("i.seraph").attr("data-icon")!=undefined ? _this.find("i.seraph").attr("data-icon") : _this.find("i.layui-icon").attr("data-icon"),
					"title" : _this.find("cite").text(),
					"href" : _this.attr("data-url"),
					"layId" : new Date().getTime()
				}
				menu.push(curmenu);
				window.sessionStorage.setItem("menu",JSON.stringify(menu));
				window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));
				element.tabChange(tabFilter, that.getLayId(_this.find("cite").text()));
				that.tabMove();
			}else{
				var curmenu = {
					"icon" : _this.find("i.seraph").attr("data-icon")!=undefined ? _this.find("i.seraph").attr("data-icon") : _this.find("i.layui-icon").attr("data-icon"),
					"title" : _this.find("cite").text(),
					"href" : _this.attr("data-url")
				}
                that.changeRegresh(_this.parent('.layui-nav-item').index());
				window.sessionStorage.setItem("curmenu", JSON.stringify(curmenu));
				element.tabChange(tabFilter, that.getLayId(_this.find("cite").text()));
				that.tabMove();
			}
		}
	}

	Tab.prototype.tabMove = function(){
		$(window).on("resize",function(event){
			var topTabsBox = $("#top_tabs_box"),
				topTabsBoxWidth = $("#top_tabs_box").width(),
				topTabs = $("#top_tabs"),
				topTabsWidth = $("#top_tabs").width(),
				tabLi = topTabs.find("li.layui-this"),
				top_tabs = document.getElementById("top_tabs"),
				event = event || window.event;

			if(topTabsWidth > topTabsBoxWidth){
				if(tabLi.position().left > topTabsBoxWidth || tabLi.position().left+topTabsBoxWidth > topTabsWidth){
					topTabs.css("left",topTabsBoxWidth-topTabsWidth);
				}else{
					topTabs.css("left",-tabLi.position().left);
				}
				var flag = false;
				var cur = {
				    x:0,
				    y:0
				}
				var nx,dx,x ;
				function down(event){
				    flag = true;
				    var touch ;
				    if(event.touches){
				        touch = event.touches[0];
				    }else {
				        touch = event;
				    }
				    cur.x = touch.clientX;
				    dx = top_tabs.offsetLeft;
				}
				function move(event){
					var self = this;
                    if(flag){
						window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				        var touch ;
				        if(event.touches){
				            touch = event.touches[0];
				        }else {
				            touch = event;
				        }
				        nx = touch.clientX - cur.x;
				        x = dx+nx;
				        if(x > 0){
				        	x = 0;
				        }else{
				        	 if(x < topTabsBoxWidth-topTabsWidth){
				        	 	x = topTabsBoxWidth-topTabsWidth;
				        	 }else{
				        	 	x = dx+nx;
				        	 }
				        }
				        top_tabs.style.left = x +"px";
				        document.addEventListener("touchmove",function(){
				            event.preventDefault();
				        },false);
				    }
				}
				function end(){
				    flag = false;
				}
				topTabs.on("mousedown",down);
				topTabs.on("mousemove",move);
				$(document).on("mouseup",end);
				topTabs.on("touchstart",down);
				topTabs.on("touchmove",move);
				topTabs.on("touchend",end);
			}else{
				topTabs.off("mousedown",down);
				topTabs.off("mousemove",move);
				topTabs.off("mouseup",end);
				topTabs.off("touchstart",down);
				topTabs.off("touchmove",move);
				topTabs.off("touchend",end);
				topTabs.removeAttr("style");
				return false;
			}
		}).resize();
	}

	$("body").on("click",".top_tab li",function(){
		var curmenu = '';
		var menu = JSON.parse(window.sessionStorage.getItem("menu"));
        if(window.sessionStorage.getItem("menu")) {
            curmenu = menu[$(this).index() - 1];
        }
		if($(this).index() == 0){
			window.sessionStorage.setItem("curmenu",'');
		}else{
			window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));
			if(window.sessionStorage.getItem("curmenu") == "undefined"){
				if(curNav != JSON.stringify(delMenu)){
					window.sessionStorage.setItem("curmenu",curNav);
				}else{
					window.sessionStorage.setItem("curmenu",JSON.stringify(menu[liIndex-1]));
				}
			}
		}
		element.tabChange(tabFilter,$(this).attr("lay-id")).init();
        bodyTab.changeRegresh($(this).index());
		setTimeout(function(){
			bodyTab.tabMove();
		},100);
	})

	$("body").on("click",".top_tab li i.layui-tab-close",function(){
		liIndex = $(this).parent("li").index();
		var menu = JSON.parse(window.sessionStorage.getItem("menu"));
		if(menu != null) {
            delMenu = menu[liIndex - 1];
            var curmenu = window.sessionStorage.getItem("curmenu") == "undefined" ? undefined : window.sessionStorage.getItem("curmenu") == "" ? '' : JSON.parse(window.sessionStorage.getItem("curmenu"));
            if (JSON.stringify(curmenu) != JSON.stringify(menu[liIndex - 1])) {
                curNav = JSON.stringify(curmenu);
            } else {
                if ($(this).parent("li").length > liIndex) {
                    window.sessionStorage.setItem("curmenu", curmenu);
                    curNav = curmenu;
                } else {
                    window.sessionStorage.setItem("curmenu", JSON.stringify(menu[liIndex - 1]));
                    curNav = JSON.stringify(menu[liIndex - 1]);
                }
            }
            menu.splice((liIndex - 1), 1);
            window.sessionStorage.setItem("menu", JSON.stringify(menu));
        }
		element.tabDelete("bodyTab",$(this).parent("li").attr("lay-id")).init();
		bodyTab.tabMove();
	})

	$(".refresh").on("click",function(){
		if($(this).hasClass("refreshThis")){
			$(this).removeClass("refreshThis");
			$(".clildFrame .layui-tab-item.layui-show").find("iframe")[0].contentWindow.location.reload();
			setTimeout(function(){
				$(".refresh").addClass("refreshThis");
			},2000)
		}else{
			layer.msg("サーバーの応答が追いついていません。2秒ほど待ってから、もう一度リフレッシュしてください。");
		}
	})

	$(".closePageOther").on("click",function(){
		if($("#top_tabs li").length>2 && $("#top_tabs li.layui-this cite").text()!="トップページ"){
			var menu = JSON.parse(window.sessionStorage.getItem("menu"));
			$("#top_tabs li").each(function(){
				if($(this).attr("lay-id") != '' && !$(this).hasClass("layui-this")){
					element.tabDelete("bodyTab",$(this).attr("lay-id")).init();
					for(var i=0;i<menu.length;i++){
						if($("#top_tabs li.layui-this cite").text() == menu[i].title){
							menu.splice(0,menu.length,menu[i]);
							window.sessionStorage.setItem("menu",JSON.stringify(menu));
						}
					}
				}
			})
		}else if($("#top_tabs li.layui-this cite").text()=="トップページ" && $("#top_tabs li").length>1){
			$("#top_tabs li").each(function(){
				if($(this).attr("lay-id") != '' && !$(this).hasClass("layui-this")){
					element.tabDelete("bodyTab",$(this).attr("lay-id")).init();
					window.sessionStorage.removeItem("menu");
					menu = [];
					window.sessionStorage.removeItem("curmenu");
				}
			})
		}else{
			layer.msg("表示中のタブはありません");
		}
		tab.tabMove();
	})

	$(".closePageAll").on("click",function(){
		if($("#top_tabs li").length > 1){
			$("#top_tabs li").each(function(){
				if($(this).attr("lay-id") != ''){
					element.tabDelete("bodyTab",$(this).attr("lay-id")).init();
					window.sessionStorage.removeItem("menu");
					menu = [];
					window.sessionStorage.removeItem("curmenu");
				}
			})
		}else{
			layer.msg("表示中のタブはありません");
		}
		tab.tabMove();
	})

	var bodyTab = new Tab();
	exports("bodyTab",function(option){
		return bodyTab.set(option);
	});
})
