(function() {
	var list = document.querySelector('.list');
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
})();
