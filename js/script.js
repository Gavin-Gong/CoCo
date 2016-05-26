/**
 * Created by Kefen Gong on 5/26/2016.
 */
(function() {
    var cardCol = document.querySelectorAll(".card");
    var headrCOl = document.querySelector(".header");
    var cardTitles = document.querySelectorAll(".card-title");
    var cardContents = document.querySelectorAll(".card-content");
    var cardOptions = document.querySelectorAll(".card-option-item");
    var sideNavBtn = document.querySelector('[data-func="side-toggle"]');
    var sideNavElement = document.querySelector(".sidenav"); 

    // Float Action Button
    var FAB = document.querySelector(".FAB");
 



    var hoverTip = function() {
        return {
            hideTip: function(tipElement) {
                if(tipElement) {
                    tipElement.style.display = 'none';
                }
            },
            showTip: function(tipElement) {
                if(tipElement) {
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
    };

    var HoverTip = hoverTip();

    var sideNav = function(btnElement,toggleElement) {
            var style = toggleElement.style;
            var width = style.width;

            return {
            	showSide: function () {
	                style.left = 0;
	                style.display = "block";
            	},
            	hideSide: function() {
            		style.left = width;
            		style.display = "none";
            	},
            }
    };
    var SideNav = sideNav(sideNavBtn, sideNavElement);
    // sideNavBtn.addEventListener("click", SideNav.showSide);
    document.addEventListener("click", function(event) {
    	if(1) {
    		if(event.target ==  sideNavBtn) {
    			SideNav.showSide();
    		} 
    		else if(sideNavElement.contains(event.target) || event.target == sideNavElement) {
    			return false;
    		} else {
    			SideNav.hideSide();
    		}
    	}
    }, true);

    var dataManage = function() {
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
    };
    var DataManage = dataManage();


// 设置为可编辑状态
    for(var q=0, len=cardTitles.length; q<len; q++ ) {
        cardTitles[q].setAttribute("contenteditable","true");
        cardContents[q].setAttribute("contenteditable","true");
    }

// 定义卡片方法
    var cardFunc = function() {
        return {
            createCard: function(cardBOX) {
                var newCard = cardBOX.cloneNode(deep);
                newCard.querySelector(".card-title").innerHTML = '';
                newCard.querySelector(".card-title").setAttribute("placeholder", "Title");
                newCard.querySelector("card-content").innerHTML = '';
                newCard.querySelector("card-content").setAttribute("placeholder", "input your code");
                cardBOX.insertBefore(newCard, cardBOX.firstChild);
            },
            removeCard: function(cardElement) {
                var title = cardElement.querySelector('.card-title').innerHTML;
                var content = cardElement.querySelector('card-content').innerHTML;
                // Delete Card Node
                cardElement.parentNode.removeChild(cardElement);

                // 清除存储数据
                DataManage.removeItem(title);

            }
        }
    }
    var CardFunc = cardFunc();
    FAB.addEventListener("click", function() {
    	
    })




})()