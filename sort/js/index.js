(function() {
	var btns = document.getElementsByTagName('span');
	var list = document.querySelector('.list');
	create();
	function create() {
		for(var i = 0; i < data.length; i++) {
			var li = document.createElement('li');
			var img = new Image();
			img.src = data[i].url;
			var p = document.createElement('p');
			p.innerHTML = data[i].text;
			li.appendChild(img);
			li.appendChild(p);
			list.appendChild(li);
		}
	}
	btns[0].onclick = function() {
		for(var i = 0; i < btns.length; i++) {
			btns[i].className = "";
		}
		this.className = "active";
		list.innerHTML = "";
		data.sort(function(a,b){
			return parseInt(a.text) - parseInt(b.text);
		})
		create();
	};
	btns[1].onclick = function() {
		for(var i = 0; i < btns.length; i++) {
			btns[i].className = "";
		}
		this.className = "active";
		list.innerHTML = "";
		data.sort(function(a,b){
			return .5 - Math.random();
		})
		create();
	};
})();
