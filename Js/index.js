$(document).ready(function () {
    //视频 音量控制
    // 初始化
    $("#soundcontrol").change(function () {
        var mv = $("#myVideo");
        var val = $("#soundcontrol").val();
        switch (key) {
            case 1:
                mv.volume = 0.0;
                break;
            case 5:
                mv.volume = 0.5;
                break;
            case 10:
                mv.volume = 1.0;
                break;


        }
    });

    //tab菜单
    // 初始化
    $("#yanxueshe").show();
    $("#yunketang").hide();
    $('.btn-item').click(function () {

        $(this).addClass("checkon"); //关于tab按钮的处理
        $(this).addClass("hideborder");
        $(this).children("div").show();
        $(this).siblings().removeClass("checkon");
        $(this).siblings().removeClass("hideborder");
        $(this).siblings("div").children("div").hide();

        if ($(this).hasClass("yanxueshe")) {
            $(".tabbtn").addClass("hideleftborder"); //关于父级边框的处理
            $(".tabbtn").removeClass("hiderightborder");
            $("#yanxueshe").fadeToggle(); //关于页面内容的处理
            $("#yunketang").fadeToggle();
            $(".indexbody .indextab .bgdiv-white").height(880); //关于页面高度的处理
            $(".indexbody .indextab .bgdiv-white").height(880);
        } else {
            $(".tabbtn").addClass("hiderightborder");
            $(".tabbtn").removeClass("hideleftborder");
            $("#yunketang").fadeToggle();
            $("#yanxueshe").fadeToggle();
            $(".indexbody .indextab .bgdiv-white").height(920); //关于页面高度的处理
            $(".indexbody .indextab .bgdiv-white").height(920);
        }

    });
    //瀑布流


});