(function() {
    var cardCol = document.querySelectorAll(".card"); // 卡片集合
    var headrEle = document.querySelector(".header"); //头部
    var cardBOX = document.querySelector(".content");
    var cardTitles = document.querySelectorAll(".card-title"); //标题集合
    var cardContents = document.querySelectorAll(".card-content"); // 内容集合
    var cardOptions = document.querySelectorAll(".card-option-item"); //卡片选项集合
    var sideNavBtn = document.querySelector('[data-func="side-toggle"]'); //控制侧边栏的按钮
    var sideNavElement = document.querySelector(".sidenav"); //侧边栏
    var FAB = document.querySelector(".FAB"); // Float Action Button

    // 定义悬浮提示函数
    var hoverTip = (function() {
        return {
            hideTip: function(tipElement) {
                if (tipElement) {
                    tipElement.style.display = 'none';
                }
            },
            showTip: function(tipElement) {
                if (tipElement) {
                    tipElement.style.display = 'block'
                }
            },
            setTip: function(element, cssClassName) {
                var html = createElement('div');
                html.innerHTML = element.dataset.func;
                element.appendChild(html);
                element.css += cssClassName;
            },
        }
    })();

    // 定义侧边栏函数
    var sideNav = (function(btnElement, toggleElement) {
        var style = toggleElement.style;
        // style.left
        var timer = null;

        return {
            showSide: function() {
                showAnimate();
                function showAnimate() {
                    timer = setInterval(function(){
                        if (parseInt(style.left)>= 0) {
                            clearInterval(timer);
                        } else {
                            // style.left = -300 + 30 + "px"
                            style.left = parseInt(style.left) + 30 + "px";
                        }
                    }, 30)
                }
            },
            hideSide: function() {
                hideAnimate();
                function hideAnimate() {
                    timer = setInterval(function(){
                        if (parseInt(style.left) <= -300) {
                            clearInterval(timer);
                        } else {
                            style.left = parseInt(style.left) - 30 + "px"
                        }
                    }, 30)
                }
            }
        };

    }
    )(sideNavBtn, sideNavElement);
// sideNav 开关事件
document.addEventListener("click", function(event) {
    if (1) {
        if (event.target == sideNavBtn) {
            sideNav.showSide();
        } else if (sideNavElement.contains(event.target) || event.target == sideNavElement) {
            return false;
        } else {
            sideNav.hideSide();
        }
    }
}, false);

// 定义数据管理函数
var dataManage = (function() {
    return {
        setUIData: function(element) {
            var title = element.querySelector(".card-title").innerHTML;
            var content = element.querySelector(".card-content").innerHTML;
            localStorage.title = context;
        },
        removeUIData: function(key) {
            localStorage.removeItem(key);
        }
    }
})();

// 定义卡片方法
var cardFunc = (function() {
    return {
        createCard: function(cardBOX) {
            var newCard = cardBOX[0].cloneNode(true);
            newCard.querySelector(".card-title").innerHTML = 'Title';
            // newCard.querySelector(".card-title").setAttribute("placeholder", "Title");
            newCard.querySelector(".card-content").innerHTML = 'content';
            // newCard.querySelector(".card-content").setAttribute("placeholder", "input your code");
            console.log(cardBOX[1].parentNode);
            cardBOX[1].parentNode.insertBefore(newCard, cardBOX[0]);
            return newCard;
        },
        removeCard: function(cardElement) {
            var title = cardElement.querySelector('.card-title').innerHTML;
            var content = cardElement.querySelector('card-content').innerHTML;
            // Delete Card Node
            cardElement.parentNode.removeChild(cardElement);

            // 清除存储数据
            dataManage.removeItem(title);

        }
    }
})();

var floatMask = (function() {
    return {
        createMsk: function() {
            var mskEle = document.createElement('div');
            mskEle.className = "float-msk";
            document.body.insertBefore(mskEle, document.body.firstChild);
        },
        hasMask: function() {
            var className = document.body.firstChild.className;
            if (className) {
                if (className.match('float-msk') != -1) {
                    return true;
                }
            }
        },
        hideMask: function() {
            var maskEle = document.querySelector('.float-msk');
            maskEle.style.display = "none";
        },
        showMask: function() {
            var maskEle = document.querySelector('.float-msk');
            maskEle.style.display = "block";
        }
    }
})()

function cardFocusHandler(event) {
    //floatMask.hasMask() add detect maskEle
    event.target.parentNode.style.position = "relative"
    if (!floatMask.hasMask()) {
        floatMask.createMsk()
    }
    floatMask.showMask();
}

function cardBlurHandler() {
    event.target.parentNode.style.position = "static"
    floatMask.hideMask();
}
for (var k = 0, cardNum = cardTitles.length; k < cardNum; k++) {
    cardTitles[k].addEventListener("focus", cardFocusHandler);
    cardTitles[k].addEventListener("blur", cardBlurHandler);
    cardContents[k].addEventListener("focus", cardFocusHandler);
    cardContents[k].addEventListener("blur", cardBlurHandler);
}

// 全部设置为可编辑状态
for (var q = 0, len = cardTitles.length; q < len; q++) {
    cardTitles[q].setAttribute("contenteditable", "true");
    cardContents[q].setAttribute("contenteditable", "true");
}
FAB.addEventListener("click", function() {
    cardFunc.createCard(cardCol);
    cardBOX.firstChild.addEventListener("focus", cardFocusHandler);
    cardBOX.firstChild.addEventListener("blur", cardBlurHandler);
    console.log(cardBOX.firstChild)
})

// 组织tab键跳转, 然而并不能
document.addEventListener('keypress', function(event) {
    if(event.keyCode == 9) {
        event.preventDefault();
        // return false;
    }
    console.log(event.keyCode);
});
})()
