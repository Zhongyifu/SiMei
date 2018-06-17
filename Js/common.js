//获取页面的id，用以判断进入的是什么功能的页面
//然后根据得到的页面id来决定左侧的菜单栏的内容
//pageId="1"，咨询中心类
//pageId="2"，线下课程类
//pageId="2-1"，线下课程分类下的占座系统页面
//pageId="2-2，线下课程分类下的历年成绩页面
//pageId="3"，学院作品页面
//pageId="3-1"，学院作品页面下的作品详细页面
// var pageId = "";
// var leftNav = {

// }
// switch (pageId) {
//     case "1":

//         break;
//     case "2":

//         break;
//     case "2-1":

//         break;
//     case "2-2":

//         break;
//     case "3":

//         break;
//     case "3-1":

//         break;

//     default:
//         break;
// }

$(document).ready(function() {
	//对于模态框按钮pressed状态下出现边框的处理
	$("button").mousedown(function(){
		$(this).css("outline","none");
		$(this).css("-moz-box-shadow","none");
		$(this).css("-webkit-box-shadow","none");
		$(this).css("box-shadow","none");
	});
	//初始化搜索框
	$(".pageaddress .searchinput input").attr("placeholder","搜索关键词");
	
	$('li.dropdown').mouseover(function() { //触发顶部菜单下拉菜单
		$(this).addClass('open');
	}).mouseout(function() {
		$(this).removeClass('open');
	});
	$("[data-toggle='tooltip']").tooltip(); //触发底部图片提示
	//关闭今日推荐
	$("#toclose").click(function() {
		$(".todaynews").hide();
	});
	$(".todaynews").click(function() {
		todaylbFun();
	});
	var todaylbFun = function() {
		//轮播
		//设置全局变量
		var cur = 0; //当前的图片序号
		todaylbimgLen = $("#tadaynewModal .imgList li").length; //获取图片的数量
		todaylbtimer = null; //设置定时定时器的名字，方便后面关闭

		//当鼠标移到图片上关闭定时器，离开时则重置定时器
		$("#tadaynewModal .imgList").hover(function() {
			clearInterval(todaylbtimer);
		}, function() {
			todaylbchangeImg();
		});

		//为下方的圆点按钮绑定事件
		$("#tadaynewModal  .dollList li").hover(function() {
			clearInterval(todaylbtimer);
			var index = $(this).index();
			cur = index
			todaylbchangeTo(cur);
		}, function() {
			todaylbchangeImg();
		});

		//封装图片自动播放函数
		function todaylbchangeImg() {
			todaylbtimer = setInterval(function() {
				if(cur < todaylbimgLen) {
					cur++;
				} else {
					cur = 1;
				}
				todaylbchangeTo(cur);
			}, 2000);
		}

		//调用函数
		todaylbchangeImg();

		//图片切换函数
		function todaylbchangeTo(num) {
			var go = num * 800;
				if(num == todaylbimgLen) {
				go=0;
				num=0;
			}
			$("#tadaynewModal .imgList").animate({
				"left": -go
			}, 500);
			$("#tadaynewModal .dollList").find("li").removeClass("sec").eq(num).addClass("sec");

		}
		//触发轮播中的“点击查看更多”
		$("#lbclick").click(function() {
			alert("单击");
		});

	};

	//搜索页面的排序
	$(".sortbtn").click(function() {
		if($(this).hasClass("clicksort")) {
			$(this).siblings(".sortbtn").removeClass("clicksort");
			$(this).siblings(".sortbtn").children(".sort-clicked").hide();
			$(this).siblings(".sortbtn").children(".sort-unclick").show();
		} else {
			$(this).addClass("clicksort");
			$(this).children(".sort-clicked").show();
			$(this).children(".sort-unclick").hide();

			$(this).siblings(".sortbtn").removeClass("clicksort");
			$(this).siblings(".sortbtn").children(".sort-clicked").hide();
			$(this).siblings(".sortbtn").children(".sort-unclick").show();
		}
	});
	//关于搜索页面内容显示
	var testInfo = "通关JS截取一段特定长度的返回数据，再在末尾拼接出省略号。弹性盒子因为多个浏览器不支持所以放弃。截取的长度需要后面详细计算我的我的我的我的我的我的我的 "
	var listinfo = testInfo + "......";
	$(".listinfp-ab").text(listinfo);
	//关于搜索结果的标题中的文字和搜索的关键字相同的联动
	$("#searchbtn").click(function() {
		var testTitle = "模拟的返回数据中的标题";
		var keyword = $("#search-input").val();
		if(testTitle.indexOf(keyword) >= 0) {
			//定义一个新的正则用于匹配关键字
			var newEx = new RegExp("(" + keyword + ")", "g");
			var title = testTitle.replace(newEx, "<em >$1</em>");
			$(".listtitle-title").html(title);
			// alert("查询的数据中包含关键字 " + keyword);
		} else {
			alert("查询的数据中不包含关键字 " + keyword);
		}
	});

	//关于在线占座页面教室座位多少所决定的父层的宽度和外壳的高度
	var siteinfoFun = function() {
		var sitenumb = 5; //教室中每一列所需要放置的座位数量
		var fatherwidth = $(".siterow").width();
		var sitewidth = fatherwidth / sitenumb;
		//$(".site").width(sitewidth + "px");

		var colbnub = $(".sitearea").children().length;
		var siteheight = $(".site").height();
		var afterheight = $(".aftersite").height();
		$(".classroom").height(colbnub * siteheight + afterheight + "px");

		//最外壳的高度，这个可能需要在所有能动态添加内容的页面使用
		var height1 = $(".order").height();
		var height2 = $(".classinfo").height();
		var height3 = $(".classroom").height();
		var height4 = $(".classabs").height();
		//150为各个层之间的margin的补充，20为中间hr分割线的高度
		$(".saveinfolist .bgdiv-black").height(150 + (height1 + height2 + height3 + height4) + 20 * 3 + "px");
		$(".saveinfolist .bgdiv-white").height(150 + (height1 + height2 + height3 + height4) + 20 * 3 + "px");
	};
	siteinfoFun();

	//关于官方公告
	var testInfoaan = "。弹性盒子因为多个浏览器不支持所以放弃。截取的长度需要后面详细计算 通关JS截取一段特定长度的返回数据，再在末尾拼接出省略号。弹性盒子因为多个浏览器不支持所以放弃。截取的长度需要后面详细计算 通关JS截取一段特定长度的返回数据，再在末尾拼接出省略号。弹性盒子因为多个浏览器不支持所以放弃。截取的长度需要后面详细计算 通关JS截取一段特定长度的返回数据，再在末尾拼接出省略号 "
	var listinfoann = testInfoaan + "......";
	// $("#info-abs-c").text(listinfoann);
	//学生心得
	var testInfostu = "内容自己定，如果是分段返回更好,内容循环往上加就行了";
	$(".stuetclist .stu-abs-c").text(testInfostu);
	//学生作品详情轮播
	var stuworkinfoFun = function() {
		var cur = 0; //当前的图片序号
		stuworkinfoimgLen = $("#stuworkinfo-lb .imgList li").length;
		stuworkinfotimer = null;

		//当鼠标移到向左和向右的图标上关闭定时器，离开时则重置定时器
		$("#stuworkinfo-lb .pre,.next").hover(function() {
			clearInterval(stuworkinfotimer);
		}, function() {
			stuworkinfochangeImg();
		});

		//当鼠标移到图片上关闭定时器，离开时则重置定时器
		$("#stuworkinfo-lb .imgList").hover(function() {
			clearInterval(stuworkinfotimer);
		}, function() {
			stuworkinfochangeImg();
		});

		//点击向左图标根据cur进行上一个图片处理
		$("#stuworkinfo-lb .pre").click(function() {
			cur = cur > 0 ? (--cur) : (stuworkinfoimgLen - 1);
			stuworkinfochangeTo(cur);
		});

		//点击向右图标根据cur进行上一个图片处理
		$("#stuworkinfo-lb .next").click(function() {
			cur = cur < (stuworkinfoimgLen - 1) ? (++cur) : 0;
			stuworkinfochangeTo(cur);
		});
		//封装图片自动播放函数
		function stuworkinfochangeImg() {
			stuworkinfotimer = setInterval(function() {
				if(cur < stuworkinfoimgLen) {
					cur++;
				} else {
					cur = 1;
				}
				stuworkinfochangeTo(cur);
			}, 2000);
		}

		//调用函数
		stuworkinfochangeImg();

		//图片切换函数
		function stuworkinfochangeTo(num) {
			var go = num * 800;
			if(num == stuworkinfoimgLen) {
				go=0;
			}
			
			$("#stuworkinfo-lb .imgList").animate({
				"left": -go
			}, 500);
		}
	};
	stuworkinfoFun();

	// 关于我的占座
	var statenum = 1; //模拟返回数据中的关于位置的状态,从而确定不同的样式
	var mysiteFun = function(hid) {
		var hiddenid = hid; //在将数据绑定到页面上的同时为每一份数据提供一个唯一状态库id
		var dateid = $("#sitestate" + hiddenid);
		var hidden = parseInt(dateid.val());
		var statue = dateid.siblings(".mysiteitem .sitestate .statue");
		var rightstatue = dateid.siblings(".mysiteitem .sitestate .right-statue");
		console.log(hidden);
		switch(hidden) {
			case 1: //预定成功
				statue.text("预定成功");
				statue.addClass("sueecss");
				rightstatue.text("具体座位号");
				rightstatue.addClass("normal");
				break;
			case 2: //审核中
				statue.text("审核中，拼接时间变量");
				statue.addClass("fail");
				rightstatue.text("");
				rightstatue.addClass("normal");
				break;
			case 3: //未通过
				statue.text("未通过");
				statue.addClass("fail");
				rightstatue.text("【重新占座】");
				rightstatue.addClass("sueecss");
				break;
			case 4: //失效,课程已结束
				statue.text("已失效");
				statue.addClass("normal");
				rightstatue.text("");
				rightstatue.addClass("normal");
				rightstatue.parents().parents().parents().parents(".mysiteitem").addClass("opacity");
				break;

			default:
				break;
		}
	};
	var sun = $(".mysiteitem").children().length;
	for(let index = 1; index <= sun; index++) { //测试数据
		mysiteFun(index);
	}

	//我的通知
	//关于官方公告
	var testInfomyn = "通关JS截取一段特定长度的返回数据，再在末尾拼接出省略号。弹性盒子因为多个浏览器不支持所以放弃。截取的长度需要后面详细计算 通关JS截取一段特定长度的返回数据，再在末尾拼再在末尾拼再在末尾拼"
	var listinfomyn = testInfomyn + "......";
	// $(".mynoticelist #info-abs-c").text(listinfomyn);

	//关于视频控件播放键的修改
	var playbtn = $(".vjs-big-play-button").html("<i class='fa fa-play' style='color:black;'></i>");
	//课程详情页的tab
	$("#classinfo").show();
	$("#classchapter").hide();
	$('.classinfobody .btn-item').click(function() {
		$(this).addClass("checkon"); //关于tab按钮的处理
		$(this).addClass("hideborder");
		$(this).children("div").show();
		$(this).siblings().removeClass("checkon");
		$(this).siblings().removeClass("hideborder");
		$(this).siblings("div").children("div").hide();

		if($(this).hasClass("classinfo")) {
			$(".classinfobody .tabbtn").addClass("hideleftborder"); //关于父级边框的处理
			$(".classinfobody .tabbtn").removeClass("hiderightborder");
			$("#classinfo").fadeToggle(); //关于页面内容的处理
			$("#classchapter").fadeToggle();
		} else {
			$(".classinfobody .tabbtn").addClass("hiderightborder");
			$(".classinfobody .tabbtn").removeClass("hideleftborder");
			$("#classinfo").fadeToggle();
			$("#classchapter").fadeToggle();
		}

	});

    //课程章节详情轮播
    var classchartinfoFun = function() {
		var cur = 0; //当前的图片序号
		classchartinimgLen = $("#chart-lb.imgList li").length;
		classchartintimer = null;

		//当鼠标移到向左和向右的图标上关闭定时器，离开时则重置定时器
		$("#chart-lb .pre,.next").hover(function() {
			clearInterval(classchartintimer);
		}, function() {
			classchartinchangeImg();
		});

		//当鼠标移到图片上关闭定时器，离开时则重置定时器
		$("#chart-lb .imgList").hover(function() {
			clearInterval(classchartintimer);
		}, function() {
			classchartinchangeImg();
		});

		//点击向左图标根据cur进行上一个图片处理
		$("#chart-lb .pre").click(function() {
			cur = cur > 0 ? (--cur) : (classchartinimgLen - 1);
			classchartinchangeTo(cur);
		});

		//点击向右图标根据cur进行上一个图片处理
		$("#chart-lb .next").click(function() {
			cur = cur < (classchartinimgLen - 1) ? (++cur) : 0;
			classchartinchangeTo(cur);
		});
		//封装图片自动播放函数
		function classchartinchangeImg() {
			classchartintimer = setInterval(function() {
				if(cur < classchartinimgLen) {
					cur++;
				} else {
					cur = 1;
				}
				classchartinchangeTo(cur);
			}, 2000);
		}

		//调用函数
		classchartinchangeImg();

		//图片切换函数
		function classchartinchangeTo(num) {
			var go = num * 800;
			if(num == classchartinimgLen) {
				go=0;
			}
			
			$("#chart-lb .imgList").animate({
				"left": -go
			}, 500);
		}
	};
	classchartinfoFun();
});