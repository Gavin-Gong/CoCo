var cardCol = document.querySelector(".card");
var cardTitles = cardCol.querySelector(".card-title");
var cardContents = cardCol.querySelector(".card-content");
var cardOptions = cardCol.querySelector(".card-option-item");



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
HoverTip.

var sideNav = function(btnElement,toggleElement) {
	function sideNavHandler() {
		var status = null;
		var style = toggleElement.style;
		var width = style.width;

		if (!status) {
			showSide()
		} else {
			hideSide()
		}

		function showSide() {
			style.left = 0;
			status = 1;
		}
		function hideSide() {
			style.left = width;
			status = 0;
		}
	}

	toggleElement.addEventListener('mouseover', sideNavHandler);
}

var dataManage = function() {
	return {
		setUIData: function(element) {
			var title = element.querySelector(".card-title").innerHTML;
			var context = element.querySelector(".card-content").innerHTML;
			localStorage.title = context;
		},
		removeUIData: function(key) {
			localStorage.removeItem(key);
		}
	}
}
var DataManage = dataManage();


// 设置为可编辑状态
for(var q=0, len=cardTitles.length; q<len; q++ ) {
	cardTitles[q].setAttribute("contenteditable","true");
	cardContents[q].setAttribute("contenteditable","true");
}

// 定义卡片方法
var cardFunc = function() {
	createCard: function(cardBOX) {
		var newCard = cardBOX.cloneNode(deep);
		newCard.querySelector(".card-title").innerHTML = '';
		newCard.querySelector(".card-title").setAttribute("placeholder", "Title")
		newCard.querySelector("card-content").innerHTML = '';
		newCard.querySelector("card-content").setAttribute("placeholder", "input your code") = '';
		cardBOX.insertBefore(newCard, cardBOX.firstChild);
	}
	removeCard: function(cardElement) {
		var title = cardElement.querySelector('.card-title').innerHTML;
		var content = cardElement.querySelector('card-content').innerHTML;
		// Delete Card Node
		cardElement.parentNode.removeChild(cardElement) = "";

		// 清除存储数据
		DataManage.removeItem(title);

	}
}



