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

     function getClassName (ele,cls) {
                    var elem = ele.getElementsByTagName("*");
                    var arr = [];
                    for (var i = 0; i < elem.length; i++) {
                        if (elem[i].className == cls) {
                            arr.push(elem[i])
                        }
                    }
                    return arr;
                }




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
                if (request.status == 200) {
                    callback(request);
                } else {
                    console.log("发生错误: " + request.status);
                }
            }
        };
        request.open('get', url, true);
        request.send(null);
    }

};