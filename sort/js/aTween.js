 // 获取元素封装
function getId(name){
			return document.getElementById(name);
}
function getTag(parent,tag){
	return parent.getElementsByTagName(tag);
}
function getClass(parent,name){
	return parent.getElementsByClassName(name);
}

function M(sele) { // 传入一个元素名称
	var first = sele.substr(0,1);
	var isArr = sele.split(' ');
	if(first === '#' && isArr.length == 1){
		return document.getElementById(sele.substr(1));
	}else{
		var arr = Array.from(document.querySelectorAll(sele));
		return arr.length == 1 ? arr[0] : arr;
	}
}

// Tween 函数封装
/*
 	linear 匀速
	easeIn 加速
	easeOut 减速
	easeBoth 先加速后减速
	easeInStrong 二次方加速
	easeOutStrong 二次方减速
	easeBothStrong 二次方先加速后减速
	elasticIn 弹性在开始方向
	elasticout 弹性在结束方向
	elasticBoth 弹性 开始和结束都有
	backIn 回弹 在开始方向
	backOut 回弹 在结束方向
	backBoth 回弹 开始和结束都有
	bounceIn  碰撞 在开始方向
	bounceOut 碰撞 在结束方向
	bounceBoth 碰撞 开始和结束都有

*/ 
// t: 执行次数   b: 初始值    c：差值    d：执行总次数
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};

// 获取计算后样式封装
/* 当css的参数个数小于3，获取否则 设置 */
function css(el,attr,val) {
	if(arguments.length < 3) {
		var val  = 0;
		if(el.currentStyle) {
			val = el.currentStyle[attr];
		} else {
			val = getComputedStyle(el)[attr];
		}
		if(attr == "opacity") {
			val*=100;
		}
		return parseFloat(val);
	}
	if(attr == "opacity") {
		el.style.opacity = val/100;
		el.style.filter = "alpha(opacity = "+val+")";
	} else {
		el.style[attr] = val + "px";
	}
}

// mTween 运动框架函数封装
function mTween(el,target,time,type,callBack) { // 传参 传的也可以是一个函数 设置mTween 函数（属性名，要改变的样式， 时间，运动类型，回调函数）
	clearInterval(el.timer);
	var t = 0;
	var b = {}; 
	var c = {}; // 因为开始值有多个 所以要定义 一个对象组	
	var d = time/20; 
	for(var s in target) { // 因为操作的是一组元素，所以要用循环  ，操作的是目标对象组里数
		b[s] = css(el,s);   // 定义b 的s 属性 等于 css 里的s 属性 	  b[s] 的值 等于 css 里的 s 的初始值， s 是属性名，b[s]是属性值
		c[s] = target[s] - b[s]; // 差额的值 等于 目标值 减 初始值  ， 给c 对象组赋值
	}
	el.timer = setInterval(function(){
		t++;
		if(t>d) {
			clearInterval(el.timer);
			/*if(callBack) {
				callBack()
			}*/
			callBack&&callBack(); //回调函数 动画执行完了以后，要执行的内容 ，类型 function	满足这个条件就执行，否则就不执行
		} else {
			for(var s in target) {
				var val = Tween[type](t,b[s],c[s],d); // 因为 b,c,操作的是一组元素，所以 要通过定义 确定值
				css(el,s,val); // 设置 元素要改变的属性 的值 为需要的值
			}
		}
	},20);
}

// lTween 运动框架的封装，传几个参数都能使用（最少两个）
function lTween(obj,attrs,times,fx,fn) { // （对象，样式名，时间，运动样式，回调函数）
	if(typeof times == 'undefined'){
		times = 400;
		fx = 'linear';
	}
	if(typeof times == 'string'){  // (box,{opacity:30},'linear')
		if(typeof fx == 'undefined'){
			fx = times;
			times = 400;
		}else{
			fn = fx;
			fx = times;
			times = 400;
		}
	}
	if(typeof times == 'function'){ //(box,{opacity:30},function(){})
		fn = times;
		fx = 'linear';
		times = 400;
	}
	if(typeof times == 'number'){//(box,{opacity:30},400,function(){})
		if(typeof fx == 'undefined'){ //(box,{opacity:30},400)
			fx = 'linear';
		}
		if(typeof fx == 'function'){ //(box,{opacity:30},400,fn)
			fn = fx;
			fx = 'linear';
		}
	}
	var json = {};
	for(var attr in attrs){
		if(attr == 'opacity'){
			json[attr] = getComputedStyle(obj)[attr]*100;
		}else{
			json[attr] = parseInt(getComputedStyle(obj)[attr]);
		}
	}
	var startTime = new Date().getTime();
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var nowTime = new Date().getTime();
		var t = Math.min(times,nowTime - startTime);
		for(var attr in attrs){
			var value = Tween[fx](t,json[attr],attrs[attr] - json[attr],times);
			if(attr == 'opacity'){
				obj.style.opacity = value/100;
			}else{
				obj.style[attr] = value + 'px';
			}
		}
		if(t == times){
			clearInterval(obj.timer);
			if(typeof fn == 'function'){
				setTimeout(function() {
					fn();
				}, 16);
			}
		}
	}, 16);

}


// 随机数 函数封装 (使随机数为任意两个数中间的数) 使用的时候要设置一个数组，传入两个参数
function rP(arr) {
	var max = Math.max(arr[0],arr[1]),
		min = Math.min(arr[0],arr[1]);
	return Math.round(Math.random() * (max - min)) + min;	
}

// 抖函数封装
function shake(obj,times,dir,fn) { // （对象，次数，方向， 回调函数）
	var arr = [];
	
	for(var i=times; i>=0; i--){
		arr.push(i,-i); // 在数组的最后以为添加一个数
	}

	arr.push(0);  // 因为没有0 ，所以单独添加一下

	var n = 0;

	clearInterval(obj.timer);

	obj.timer = setInterval(function() {
		obj.style.transform = 'translate'+dir+'('+arr[n]+'px)'; // 让元素的位移，从而抖动
		n++;
		if(n == arr.length){
			clearInterval(obj.timer);
			if(typeof fn == 'function'){ // 会出先还没有走完就停止执行的bug,所以在判断一下是否有回调函数，有就加延迟，让当前的先走完
				setTimeout(fn, 16);
			}
		}
	}, 16);
}

// 倒计时函数封装
function cT(el,t,fn) { // （显示倒计时的元素，目标时间，回调函数）

	var startTime = new Date().getTime();

	var endTime = new Date(t).getTime();
	var syTime = Math.max(0,Math.round((endTime - startTime)/1000));

	if(syTime == 0){
		alert('时间到了');
		clearInterval(timer);
		if(typeof fn == 'function'){
			fn();
		}
		return;
	}

	var days = parseInt(syTime/(24 * 60 * 60));
	var hours = parseInt((syTime - (days * 24 * 3600))/3600);
	var mins = parseInt((syTime - (days * 24 * 3600) - hours*3600)/60);
	var secs = syTime%60;

	var str = days + '天' + add0(hours) + '小时' + add0(mins) + '分钟' + add0(secs) + '秒';

	el.innerHTML = str;
}


function add0(n) {
	return n < 10 ? '0' + n : '' + n;
}



