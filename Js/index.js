$(document).ready(function () {


	//tab菜单
	// 初始化
	$("#yanxueshe").show();
	$("#yunketang").hide();
	$('.btn-item').click(function () {

		$(this).addClass("checkon"); //关于tab按钮的处理
		$(this).addClass("hideborder");
		$(this).children("div").show();
		$(this).removeClass("bgwhite");
		$(this).siblings().removeClass("checkon");
		$(this).siblings().removeClass("hideborder");
		$(this).siblings().addClass("bgwhite");
		$(this).siblings("div").children("div").hide();

		if ($(this).hasClass("yanxueshe")) {
			$(".tabbtn").addClass("hideleftborder"); //关于父级边框的处理
			$(".tabbtn").removeClass("hiderightborder");
			$("#yanxueshe").fadeToggle(); //关于页面内容的处理
			$("#yunketang").fadeToggle();
			$(".indexbody .indextab .bgdiv-white").height(880); //关于页面高度的处理
			$(".indexbody .indextab .bgdiv-black").height(880);
		} else {
			$(".tabbtn").addClass("hiderightborder");
			$(".tabbtn").removeClass("hideleftborder");
			$("#yunketang").fadeToggle();
			$("#yanxueshe").fadeToggle();
			$(".indexbody .indextab .bgdiv-white").height(980); //关于页面高度的处理
			$(".indexbody .indextab .bgdiv-black").height(980);
		}
	});
	//瀑布流
	//用数组存放图片的文件名
	var pictureSources = [
		"1.jpg",
		"2.jpg",
		"3.jpg",
		"4.jpg",
		"5.jpg",
		"6.jpg",
		"7.jpg",
		"8.jpg",
		"9.jpg",
		"10.jpg",
		// "11.jpg",
		// "12.jpg",
		// "13.jpg",
		// "14.jpg",
		// "15.jpg",
		// "16.jpg",
		// "17.jpg",
		// "18.jpg",
		// "19.jpg",
		// "20.jpg",
	];
	var base = "../Img/index/pbl/";

	//item 元素的基本结构
	var baseElem = $("<div class='item stupbl div-black'></div>").append("<div class='div-white'><img/></div>");
	//var baseElem = $("<div class='item'></div>").append("<img/>");
	//实现瀑布流布局的函数
	function waterfall() {
		var items = $(".workslist .item"); //获取到所有的类名为item的元素
		var postop = []; //这个数组用来存放item定位的高度
		var itemWidth = items.eq(0).width() + 10; //宽度都是一样的所有随便获取一个就行
		items.each(function (index, elem) {
			var targetItemTop = items.eq(index).height() + 10; //遍历所有item并获取高度
			if (index < 5) { //如果是在第一行
				postop[index] = targetItemTop; //把高度直接加入数组中
				$(elem).css({
					"left": 170 * index, //设置left
					"top": 0 //和top
				});
			} else {
				//其他行
				var mintop = Math.min.apply(null, postop); //获取数组中最小的一个
				var minindex = $.inArray(mintop, postop); //获取到数组最小值对应的排序
				$(elem).css({
					"top": mintop + 10, //设置top为数组中最小值
					"left": parseInt(items.eq(minindex).css("left")) //设置left
				});
			}
			postop[minindex] += $(elem).height() + 20; //更新数组
		});
	}

	//添加item的函数
	function getItems() {
		for (var i = 0; i < pictureSources.length; i++) {
			baseElem.clone().find("img").attr("src", base + pictureSources[i]).bind("load", function () {
				$(this).parent().parent(".stupbl").height($(this).parent().height());
				waterfall();
				$(this).parent().fadeIn(500);
			}).end().appendTo("#picturewall");
		}
	}

	//判断文档滚动的位置
	function wheelListen() {
		var srollHeight = $(".workslist").scrollTop();
		console.log(srollHeight);
		if (srollHeight + $(".workslist").height() >= $('#picturewall').height() - 100) {
			// getItems();		
		}
	}

	//绑定事件
	getItems();
	$("#picturewall").bind("mousewheel DOMMouseScroll scroll", function () {
		wheelListen();
	});
	$("#picturewall").scroll(function () {
		wheelListen();
	});
	$("#picturewall img").bind("click", function () {
		alert("111");
	});






	//搜索历史
	$(".search .search-input").click(function () {
		$(".searchhistory").addClass("show");
		$(".searchhistory").removeClass("hide");
	});
	$(".search .search-input").blur(function () {
		$(".searchhistory").addClass("hide");
		$(".searchhistory").removeClass("show");
	});

});