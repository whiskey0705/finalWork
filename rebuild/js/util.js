/**
 * Created by Whiskey on 2016/5/31.
 */

var util = {

    // 跨浏览器的事件处理
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },


    // 获取cookie
    getCookie: function (name){
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


    // 设置cookie
    setCookie: function (name, value, expires, path, domain, secure) {
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

    unsetCookie: function (name, path, domain, secure){
        this.setCookie(name, "", new Date(0), path, domain, secure);
    },


    // ajax的get请求

    //option{
    //	url:[string],需要传递的url
    //	data:[object],需要传递的参数
    //	callback:[function],需要调用的函数
    //}
    getAjax: function (option) {
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
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 && xhr.status < 300 || xhr.status == 304) {
                    callback(xhr);
                } else {
                    console.log("发生错误：" + xhr.status);
                }
            }
        };
        xhr.open('get', url, true);
        xhr.send(null);
    }

};