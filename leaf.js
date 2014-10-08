function Leaf(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.minSize = 100;
	this.color = color;
	this.leftNode = null;
	this.rightNode = null;
	this.room = null;
	this.createRoom = function(minOffset, maxOffset, random) {
		var w = Math.floor(random.randomRange(minOffset, maxOffset, false) * this.width);
		var h = Math.floor(random.randomRange(minOffset, maxOffset, false) * this.height);
		var x = this.x + random.random(this.width - w, true);
		var y = this.y + random.random(this.height - h, true);
		this.room = new Room(x, y, w, h);
	};
	this.split = function(render, random) {
		if (this.leftNode != null || this.rightNode != null)
			return false;

		var splitH = (random.random(2, true) != 0);
		if (this.width > this.height && this.width / this.height >= 1.5)
			splitH = false;
		else if (this.height > this.width && this.height / this.width >= 1.5)
			splitH = true;

		var max = (splitH ? this.height : this.width) - this.minSize;
		if (max <= this.minSize)
			return false;

		var split = random.randomRange(this.minSize, (max - this.minSize), true);
		if (splitH) {
			this.leftNode = new Leaf(this.x, this.y, this.width, split, color);
			this.rightNode = new Leaf(this.x, this.y + split, this.width, this.height - split, render.getRandomColor(random));
		} else {
			this.leftNode = new Leaf(this.x, this.y, split, this.height, color);
			this.rightNode = new Leaf(this.x + split, this.y, this.width - split, this.height, render.getRandomColor(random));
		}
		return true;
	};
	this.draw = function(render) {
		render.drawLeaf(this.x, this.y, this.width, this.height, this.color);
	};
}
