/**
 * Created by Whiskey on 2016/5/27.
 */
var followed = document.querySelector('.followed');
var unfollowed = document.querySelector('.unfollowed');
var followNum = document.querySelector('.follow-num');



var modal = document.getElementById('modal');
var formClose = document.getElementById('form-close');

var form = document.getElementById('form-login');
var inputName = form.getElementsByTagName('input')[0];
console.log(inputName);
var inputpass = form.getElementsByTagName('input')[1];
var errorMsg = document.querySelector('.error');
var submit = document.querySelector('.submit');


//点击弹出登入窗口
followed.onclick = function () {
    checkLogin();
    // modal.style.display = 'block';
};
formClose.onclick = function () {
    modal.style.display = 'none';
};
submit.onclick = function () {
    modal.style.display = 'none';
    followNum.innerHTML = parseInt(followNum.innerHTML) + 1;
    followed.style.display = 'none';
    unfollowed.style.display = 'in-block';
};

inputName.onfocus = function () {
    errorMsg.style.visibility = 'visible';
    errorMsg.innerHTML = '请输入用户名';
};

inputName.onblur = function () {
    if (inputName.value === '') {
        errorMsg.innerHTML = '用户名:studyOnline';
        errorMsg.style.visibility = 'visible';
        inputName.style.borderColor = 'red';
    } else if (errorMsg.innerHTML = 'studyOnline') {
        inputName.style.borderColor = '';
        errorMsg.style.visibility = 'hidden';
    }
};
inputpass.onfocus = function () {
    errorMsg.innerHTML = '请输入密码';
    errorMsg.style.visibility = 'visible';
};
inputpass.onblur = function () {
    if (inputpass.value === '') {
        errorMsg.innerHTML = '密码：study.163.com';
        inputpass.style.borderColor = 'red';
    } else if (inputpass.value === 'study.163.com') {
        inputpass.style.borderColor = '';
        errorMsg.style.visibility = 'hidden';
    }
};

function checkLogin() {
    if (CookieUtil.get('loginSuc')) {
        followed.style.display = 'none';
        unfollowed.style.display = 'in-block';
        followNum.innerHTML = parseInt(followNum.innerHTML) + 1;
    } else {
        modal.style.display = 'block';
        //导航关注
        attention();
    }
}

function attention () {
    CookieUtil.set('loginSuc', true, new Date(new Date().getTime() + 86400000));
    var xhr = new XMLHttpRequest();

}