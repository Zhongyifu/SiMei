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


$(document).ready(function () {
    $('li.dropdown').mouseover(function () { //触发顶部菜单下拉菜单
        $(this).addClass('open');
    }).mouseout(function () {
        $(this).removeClass('open');
    });
    $("[data-toggle='tooltip']").tooltip(); //触发底部图片提示
    //关闭今日推荐
    $("#toclose").click(function () {
        $(".todaynews").hide();
    });
    //轮播
    //设置全局变量
    var cur = 0; //当前的图片序号
    imgLen = $(".imgList li").length; //获取图片的数量
    timer = null; //设置定时定时器的名字，方便后面关闭

    //当鼠标移到向左和向右的图标上关闭定时器，离开时则重置定时器
    // $(".pre,.next").hover(function () {
    //     clearInterval(timer);
    // }, function () {
    //     changeImg();
    // });

    //当鼠标移到图片上关闭定时器，离开时则重置定时器
    $(".imgList").hover(function () {
        clearInterval(timer);
    }, function () {
        changeImg();
    });

    //点击向左图标根据cur进行上一个图片处理
    // $(".pre").click(function () {
    //     cur = cur > 0 ? (--cur) : (imgLen - 1);
    //     changeTo(cur);
    // });

    //点击向右图标根据cur进行上一个图片处理
    // $(".next").click(function () {
    //     cur = cur < (imgLen - 1) ? (++cur) : 0;
    //     changeTo(cur);
    // });

    //为下方的圆点按钮绑定事件
    $(".dollList li").hover(function () {
        clearInterval(timer);
        var index = $(this).index();
        cur = index
        changeTo(cur);
    }, function () {
        changeImg();
    });

    //封装图片自动播放函数
    function changeImg() {

        timer = setInterval(function () {
            if (cur < imgLen - 1) {
                cur++;
            } else {
                cur = 0;
            }
            changeTo(cur);
        }, 2000);
    }

    //调用函数
    changeImg();

    //图片切换函数
    function changeTo(num) {
        var go = num * 800;
        $(".imgList").animate({
            "left": -go
        }, 500);
        $(".dollList").find("li").removeClass("sec").eq(num).addClass("sec");

    }

    //触发轮播中的“点击查看更多”
    $("#lbclick").click(function () {
        alert("单击");
    });
});