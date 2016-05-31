/**
 * Created by Whiskey on 2016/5/30.
 */
var EventUtil = {

    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }
};


var CookieUtil = {

    get: function (name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd;

        if (cookieStart > -1){
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }

        return cookieValue;
    },

    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }

        if (path) {
            cookieText += "; path=" + path;
        }

        if (domain) {
            cookieText += "; domain=" + domain;
        }

        if (secure) {
            cookieText += "; secure";
        }

        document.cookie = cookieText;
    },

    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    }


};



var Page = {
    pages: function(opt) {
        //获取ID
        var obj = document.getElementById(opt.id);
        var nowNum = opt.nowNum || 1;
        var allNum = opt.allNum || 8;
        //清空重新生成元素
        obj.innerHTML = "";
        //出现上一页的情况
        if (nowNum >= 2) { //当前选中的a标签>=2出现上一页标签
            var oA = document.createElement("a");
            oA.href = "#" + (nowNum - 1);
            oA.innerHTML = "&lt;";
            oA.className = "pn";
            obj.appendChild(oA)
        }
        //allNUM大于8 这条可以忽略
        if (allNum <= 8) {
            for (var i = 1; i <= allNum; i++) {
                oA = document.createElement("a");
                oA.href = "#" + i;
                if (nowNum == i) {
                    oA.innerHTML = i
                } else {
                    oA.innerHTML = "[" + i + "]";
                }
                obj.appendChild(oA);
            }
        } else {
            //每次生成8条a标签
            for (var i = 1; i <= 8; i++) {
                oA = document.createElement("a");
                //生成左边 4个a标签
                if (nowNum <= 4) { //如果当前选中的a标签为4
                    oA.href = "#" + i;
                    //如果当前选中的a标签在左边区域
                    if (nowNum == i) {
                        //给左边区域相应a标签加上高亮
                        oA.innerHTML = i;
                        oA.className = "curt"
                    } else {
                        //生成左边其他标签
                        oA.innerHTML = i;
                    }
                    //生成右边区域
                } else if ((allNum - nowNum) == 0 || (allNum - nowNum) == 1 || (allNum - nowNum) == 2 || (allNum - nowNum) == 3) { //判断最后3条元素
                    //生成右边区域
                    oA.href = "#" + (allNum - 8 + i);
                    //如果当前选中的为最后一个
                    if ((allNum - nowNum) == 0 && i == 8) {
                        //生成右边区域
                        oA.innerHTML = (allNum - 8 + i);
                        //加上高亮
                        oA.className = "curt";
                    } else if ((allNum - nowNum) == 1 && i == 7) {
                        oA.innerHTML = (allNum - 8 + i);
                        oA.className = "curt"
                    } else if ((allNum - nowNum) == 2 && i == 6) {
                        oA.innerHTML = (allNum - 8 + i);
                        oA.className = "curt"
                    } else if ((allNum - nowNum) == 3 && i == 5) {
                        oA.innerHTML = (allNum - 8 + i);
                        oA.className = "curt"
                    } else {
                        //生成右边区域
                        oA.innerHTML = (allNum - 8 + i);
                    }
                } else {
                    oA.href = "#" + (nowNum - 4 + i);
                    if (i == 4) {
                        oA.innerHTML = (nowNum - 4 + i);
                        oA.className = "curt"
                    } else {
                        oA.innerHTML = nowNum - 4 + i;
                    }
                }
                //添加a标签
                obj.appendChild(oA)
            }
        }
        //生成下一页标签
        if ((allNum - nowNum) >= 1) { //当前选中a标签不等于最后个a标签
            oA = document.createElement("a");
            oA.href = "#" + (nowNum + 1);
            oA.innerHTML = "&gt;";
            obj.appendChild(oA);
            oA.className = "pn"
        }
    }
};





var AjaxUtil = {
    ajax: function (option) {
        var data = option.data;
        var url = option.url;
        var callback = option.callback;
        var key, value, arr = [];
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                key = encodeURIComponent(i);
                value = encodeURIComponent(data[i]);
                arr.push(key + '=' + value);
            }
        }
        url += '?';
        url += arr.join('&');
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                callback(request);
            }
        };
        request.open('get', url, true);
        request.send(null);
    }

};