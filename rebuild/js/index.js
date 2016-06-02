/**
 * Created by Whiskey on 2016/6/1.
 */
// 初始化
window.onload = function () {
    closeTopBar();
    login();
    slide();
    courseList(1);
    changeCourse();
    changePage();
    hotRank();
    showVideo();
};


// 顶部通知栏
function closeTopBar() {
    var topBar = document.getElementById('top-bar');
    var topClose = topBar.querySelector('.top-bar-close');
    if (util.getCookie('closeTopBar')) {
        topBar.style.display = 'none';
    } else {
        util.addHandler(topClose, 'click', function () {
            // 设置有效期为一天
            util.setCookie('closeTopBar', true, new Date(new Date().getTime() + 86400000));
            topBar.style.display = 'none';
        })
    }
}



// 关注登入弹窗
function login() {
    var followedBtn = document.querySelector('.followed');
    var loginModal = document.getElementById('login-modal');
    var unfollowedBtn = document.querySelector('.unfollowed');
    var followNum = document.querySelector('.follow-num');
    var submitBtn = document.querySelector('.form-submit');
    var userName = document.getElementById('form-login').getElementsByTagName('input')[0];
    var passWord = document.getElementById('form-login').getElementsByTagName('input')[1];
    var closeBtn = document.querySelector('.form-close');
    var cancelBtn = document.querySelector('.unfollowed-cancel');
    var error = document.querySelector('.error');
    var error2 = document.querySelector('.error2');

    // 定义关注成功函数，隐藏modal、关注面板，显示已关注面板及关注数+1
    function followSuc() {
        loginModal.style.display = 'none';
        followedBtn.style.display = 'none';
        unfollowedBtn.style.display = 'inline-block';
        followNum.innerHTML = parseInt(followNum.innerHTML) + 1;
    }

    // 如果有followSuc的cookie，直接显示已关注面板
    if (util.getCookie('followSuc')) {
        followSuc();
    }

    // 用户名input输入框的focus和blur事件
    util.addHandler(userName, 'focus', function () {
        error.style.visibility = 'visible';
        error.innerHTML = '请输入用户名';
    });

    util.addHandler(userName, 'blur', function () {
        var nameReg = /[^a-zA-Z]/i;

        if (nameReg.test(this.value)) {
            error.style.visibility = 'visible';
            error.innerHTML = '用户名必须是字母';
        } else if (this.value === '') {
            error.style.visibility = 'visible';
            error.innerHTML = '用户名不能为空';
        } else if (this.value.length < 8 || this.value.length > 16) {
            error.style.visibility = 'visible';
            error.innerHTML = '用户名长度为8-16个字符';
        } else {
            error.style.visibility = 'hidden';
        }
    });


    // 密码input输入框的focus和blur事件
    util.addHandler(passWord, 'focus', function () {
        error2.style.visibility = 'visible';
        error2.innerHTML = '请输入密码';
    });

    util.addHandler(passWord, 'blur', function () {
        var numReg = /\D/g;
        var txtReg = /[^a-zA-Z]/ig;

       if (this.value === '') {
           error2.style.visibility = 'visible';
           error2.innerHTML = '密码不能为空';
       } else if (this.value.length < 8) {
           error2.style.visibility = 'visible';
           error2.innerHTML = '密码长度必须大于8个字符';
       } else if (!numReg.test(this.value)) {
           error2.style.visibility = 'visible';
           error2.innerHTML = '密码不能全是数字';
       } else if (!txtReg.test(this.value)) {
           error2.style.visibility = 'visible';
           error2.innerHTML = '密码不能全是字母';
       } else {
           error2.style.visibility = 'hidden';
       }
    });



    // 关注按钮click事件
    util.addHandler(followedBtn, 'click', function () {
        var option= {
            url: 'http://study.163.com/webDev/attention.htm',
            callback: function (xhr) {
                // 如果关注按钮的请求返回1，同时存在loginSuc的cookie，那么设置新的cookie，执行followSuc()
                if (xhr.responseText == 1) {
                    if (util.getCookie('loginSuc')) {
                        util.setCookie('followSuc', true);
                        followSuc();
                    } else {
                        loginModal.style.display = 'block';
                    }
                }
            }
        };
        util.getAjax(option);
    });

    // 提交按钮click事件
    util.addHandler(submitBtn, 'click', function (e) {
        var event = e || event;
        var option = {
            url: "http://study.163.com/webDev/login.htm",
            data: {
                userName: hex_md5(userName.value),
                password: hex_md5(passWord.value)
            },
            callback: function (xhr) {
                if (xhr.responseText == 1) {
                    util.setCookie('loginSuc', true);
                    util.setCookie('followSuc', true);
                    followSuc();
                } else if (xhr.responseText == 0) {
                    error.style.visibility = 'visible';
                    error.innerHTML = '用户名或密码错误，请重新输入';
                }
            }
        };
//                console.log(option.data.userName);
//                console.log(option.data.password);
        util.getAjax(option);
        // 阻止提交按钮的默认事件
        event.preventDefault();
    });

    // 关闭按钮click事件
    util.addHandler(closeBtn, 'click', function () {
        loginModal.style.display = 'none';
    });

    // 取消按钮click事件
    util.addHandler(cancelBtn, 'click', function () {
        followedBtn.style.display = 'inline-block';
        unfollowedBtn.style.display = 'none';
        followNum.innerHTML = parseInt(followNum.innerHTML) - 1;
        util.unsetCookie('followSuc');
    });

}



// 轮播图
function slide() {
    var oBox = document.querySelector('.slide');
    var aUl = oBox.getElementsByTagName('ul');
    var aImg = aUl[0].getElementsByTagName('li');
    var aNum = aUl[1].getElementsByTagName('li');
    // 开2个定时器
    var timer = play = null;
    var index = 0;

    // 定义show函数
    function show(a) {
        index = a;
        var alpha = 0;
        for (var i = 0; i < aNum.length; i++) {
            aNum[i].className = '';
        }
        aNum[index].className = 'ctrl-current';
        clearInterval(timer);

        for (var j = 0; j < aImg.length; j++) {
            aImg[j].style.opacity = 0;
            aImg[j].style.filter = 'alpha(opacity=0)';
        }
        timer = setInterval(function () {
            alpha += 10;
            if (alpha > 100) {
                alpha = 100;
            }
            aImg[index].style.opacity = alpha / 100;
            aImg[index].style.filter = 'alpha(opacity = ' + alpha + ')';
            if (alpha == 100) {
                clearInterval(timer);
            }
        }, 50);
    }

    // 切换按钮
    for (var i = 0; i < aNum.length; i++) {
        aNum[i].index = i;
        aNum[i].onmouseover = function () {
            show(this.index);
        }
    }

    // 自动播放函数
    function autoPlay() {
        play = setInterval(function () {
            index++;
            if (index >= aImg.length) {
                index = 0;
            }
            show(index);
        }, 5000);
    }
    // 开启自动播放
    autoPlay();

    // 鼠标滑过关闭定时器
    util.addHandler(oBox, 'mouseover', function () {
        clearInterval(play);
    });

    // 鼠标滑出开启自动播放
    util.addHandler(oBox, 'mouseout', function () {
       autoPlay();
    });
}



/**
 *课程列表
 * @param nowNum 当前页码
 * @param typeNum tab选项卡的种类
 */
function courseList(nowNum, typeNum) {
//            服务器返回的筛选类型（10：产品设计；20：编程语言），如果没传入typeNum默认取10
    typeNum = typeNum || 10;
//            typeNum = typeNum || 20;
//            定义ajax请求成功后的callback函数
    var createList = function (xhr) {
        var data = JSON.parse(xhr.responseText);
        var parentUl = document.getElementById('course-list');
//                先清空原来course-list下的内容
        parentUl.innerHTML = '';
//                生成新的课程内容
        for (var i = 0; i < data.list.length; i++) {
//                    课程列表简介
            var newLi = document.createElement('li');
            var newDiv = document.createElement('div');
            var newInner = document.createElement('div');
            var newImg = document.createElement('img');
            var newH4 = document.createElement('h4');
            var newProvider = document.createElement('div');
            var newLearnerCount = document.createElement('div');
            var newPrice = document.createElement('div');

            newLi.className = 'course-li';
            newDiv.className = 'course-info';
            newImg.src = data.list[i]. middlePhotoUrl;
            newH4.innerHTML = data.list[i].name;
            newH4.className = 'font-limited';
            newProvider.innerHTML = data.list[i].provider;
            newProvider.className = 'crs-provider';
            newLearnerCount.innerHTML = data.list[i].learnerCount;
            newLearnerCount.className = 'crs-count';
            newPrice.innerHTML = data.list[i].price == 0 ? '免费' : '￥' + data.list[i].price;
            newPrice.className = 'crs-price';
            newInner.className = 'crs-content';

            newInner.appendChild(newH4);
            newInner.appendChild(newProvider);
            newInner.appendChild(newLearnerCount);
            newInner.appendChild(newPrice);
            newDiv.appendChild(newImg);
            newDiv.appendChild(newInner);
            newLi.appendChild(newDiv);
//                    将动态生成的所有元素添加到ul上
            parentUl.appendChild(newLi);

//                  课程列表详情
            var hoverDiv = document.createElement('div');
            var hoverInner = document.createElement('div');
            var innerImg = document.createElement('img');
            var innerH3 = document.createElement('h3');
            var innerStudy = document.createElement('div');
            var innerAuthor = document.createElement('div');
            var innerClass = document.createElement('div');
            var outerP = document.createElement('p');

            hoverDiv.className = 'hover-div';
            hoverInner.className = 'hover-inner cf';
            innerImg.src = data.list[i].middlePhotoUrl;
            innerH3.innerHTML = data.list[i].name;
            innerH3.className = 'font-limited';
            innerStudy.className = 'inner-study';
            innerStudy.innerHTML = data.list[i].learnerCount + '人在学';
            innerAuthor.innerHTML = '发布者&nbsp;:&nbsp;' + data.list[i].provider;
            innerClass.innerHTML = '分类&nbsp;:&nbsp;' + data.list[i].categoryName;
            outerP.className = 'hover-descript';
            outerP.innerHTML = data.list[i].description;

            hoverInner.appendChild(innerImg);
            hoverInner.appendChild(innerH3);
            hoverInner.appendChild(innerStudy);
            hoverInner.appendChild(innerAuthor);
            hoverInner.appendChild(innerClass);
            hoverDiv.appendChild(hoverInner);
            hoverDiv.appendChild(outerP);
            newLi.appendChild(hoverDiv);

//                    默认情况下课程详情列表
            hoverDiv.style.display = 'none';
//                    hoverDiv.style.display = 'block';
//                    newDiv.style.display = 'none';
        }


        var showCourse = function () {
            // 默认显示的卡片
            var showElem = document.getElementsByClassName('course-info');
            // hover要显示的卡片
            var hideElem = document.getElementsByClassName('hover-div');

            for (var i = 0; i < showElem.length; i++) {
                showElem[i].index = i;
                showElem[i].onmouseover = function () {
                    for (var j = 0; j < showElem.length; j++) {
                        hideElem[j].style.display = 'none';
                    }
                    hideElem[this.index].style.display = 'block';
                };
            }
        };
        var hideCourse = function () {
            var hideElem = document.getElementsByClassName('hover-div');
            for (var i = 0; i < hideElem.length; i++) {
                hideElem[i].onmouseout = function () {
                    this.style.display = 'none';
                };
            }
        };
        showCourse();
        hideCourse();
    };

    var option = {
        url: 'http://study.163.com/webDev/couresByCategory.htm',
        data: {
            pageNo: nowNum,
            psize: 20,
            type: typeNum
        },
        callback: createList
    };

    util.getAjax(option);
}


// 点击tab更换课程
function changeCourse() {
    var designBtn = document.querySelector('#tab1');
    var codeBtn = document.querySelector('#tab2');

    util.addHandler(designBtn, 'click', function () {
        designBtn.className = 'tab-current';
        codeBtn.className = '';
        courseList(1, 10);
    });

    util.addHandler(codeBtn, 'click', function () {
        designBtn.className = '';
        codeBtn.className = 'tab-current';
        courseList(1, 20);
    })
}



// 点击page页更换课程内容
function changePage() {
    var coursePage = document.getElementById('course-page');
    var pageBtn = coursePage.getElementsByTagName('span');
    var prevBtn = coursePage.querySelector('.page-prev');
    var nextBtn = coursePage.querySelector('.page-next');
    var curPage = 0;

    for (var i = 0; i< pageBtn.length; i++) {
        pageBtn[i].index = i;
        pageBtn[i].onclick = function () {
            for (var j = 0; j < pageBtn.length; j++) {
                pageBtn[j].className = '';
            }
            this.className = 'page-current';
            curPage = this.index;
            courseList(curPage + 1);
            console.log(curPage);
        };

        prevBtn.onclick = function () {
            if (curPage < 1) {
                return;
            } else {
                curPage = curPage - 1;
                for (var j = 0; j < pageBtn.length; j++) {
                    pageBtn[j].className = '';
                }
                pageBtn[curPage].className = 'page-current';
                courseList(curPage + 1);
            }
        };

        nextBtn.onclick = function () {
            if (curPage > 6) {
                return;
            } else {
                curPage = curPage + 1;
                for (var j = 0; j < pageBtn.length; j++) {
                    pageBtn[j].className = '';
                }
                pageBtn[curPage].className = 'page-current';
                courseList(curPage + 1);
            }
        }
    }
}



// 排行榜自动滚动更新
function hotRank() {
    var elem = document.getElementById('rank-item');
    var hostList = function (xhr) {
        var data = JSON.parse(xhr.responseText);
        for (var i = 0; i< data.length; i++) {
            var newLi = document.createElement('li');
            var newImg = document.createElement('img');
            var newInner = document.createElement('div');
            var newTitle = document.createElement('div');
            var newUser = document.createElement('div');
            newLi.className = 'cf';
            newImg.src = data[i].smallPhotoUrl;
            newImg.width = 50;
            newImg.height =50;
            newInner.className = 'rank-item-content';
            newTitle.innerHTML = data[i].name;
            newTitle.className = 'rank-item-title';
            newUser.innerHTML = data[i].learnerCount;
            newUser.className = 'rank-item-user';

            newInner.appendChild(newTitle);
            newInner.appendChild(newUser);
            newLi.appendChild(newImg);
            newLi.appendChild(newInner);
            elem.appendChild(newLi);
        }
        rollUpdate();
    };

    var option = {
        url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
        callback: hostList
    };

    util.getAjax(option);
    function rollUpdate() {
        var step = function () {
            elem.insertBefore(elem.firstChild, elem.lastChild);
        };
        setInterval(step, 5000);
    }
}



// 视频modal
function showVideo() {
    var playBtn = document.querySelector('.org-play');
    var closeBtn = document.querySelector('.m2-video-close');
    var modal2 = document.querySelector('.modal2');

    util.addHandler(playBtn, 'click', function () {
        modal2.style.display = 'block';
    });
    util.addHandler(closeBtn, 'click', function () {
        modal2.style.display = 'none';
    })
}
