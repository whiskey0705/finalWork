window.onload = function () {
    var oBox = document.getElementById("slide");
    var aOl = document.getElementsByTagName("ol");
    var aImg = aOl[0].getElementsByTagName("li");
    var aCtrl = aOl[1].getElementsByTagName("li");
    var timer = null;
    var play = null;
    var i = 0;
    var index = 0;

    //切换按钮
    for (i = 0; i < aCtrl.length; i++) {
        aCtrl[i].index = i;
        aCtrl[i].onmouseover = function ()
        {
            show(this.index);
        }
    }

    //图片切换, 淡入淡出效果
    function show (a) {
        index = a;
        var alpha = 0;
        for (i = 0; i < aCtrl.length; i++) {
            aCtrl[i].className = "";
        }
        aCtrl[index].className = "ctrl-current";
        clearInterval(timer);

        for (i = 0; i < aImg.length; i++) {
            aImg[i].style.opacity = 0;
            aImg[i].style.filter = "alpha(opacity=0)";
        }

        timer = setInterval(function () {
            alpha += 2;
            if (alpha > 100) {alpha = 100;}
            // alpha > 100 && (alpha =100);
            aImg[index].style.opacity = alpha / 100;
            aImg[index].style.filter = "alpha(opacity = " + alpha + ")";
            if (alpha === 100) {clearInterval(timer);}
            // alpha == 100 && clearInterval(timer)
        },20);
    }
    //鼠标划过关闭定时器
    oBox.onmouseover = function () {
        clearInterval(play);
    };

    //鼠标离开启动自动播放
    oBox.onmouseout = function () {
        autoPlay();
    };

    //自动播放函数
    function autoPlay () {
        play = setInterval(function () {
            index++;
            if (index >= aImg.length) {index = 0;}
            // index >= aImg.length && (index = 0);
            show(index);
        },5000);
    }
    autoPlay();//应用

};