/**
 * Created by Whiskey on 2016/5/28.
 */
// 外链无效

window.onload = function () {
    var topBar = document.querySelector('.notice');
    var close = document.querySelector('.close');
    if (CookieUtil.get('hiddenTopBar')) {
        topBar.style.display = 'none';
    } else {
        close.onclick = function () {
//                    依次传入cookie的名字，有效值，和过期时间
//                    有效值为布尔值true，方便getcookie时的if判断，过期时间设置，先把当天的时间转化为毫秒，再加上一天的毫秒，最后new出新的Date
            CookieUtil.set('hiddenTopBar', true, new Date(new Date().getTime() + 86400000));
            topBar.style.display = 'none';
        }
    }
};

