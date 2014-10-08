function Leaf(rect, color) {
	this.rect = rect;
	this.minSize = 100;
	this.color = color;
	this.leftNode = null;
	this.rightNode = null;
	this.room = null;
	this.createRoom = function(minOffset, maxOffset, random) {
		var w = Math.floor(random.randomRange(minOffset, maxOffset, false) * this.rect.width);
		var h = Math.floor(random.randomRange(minOffset, maxOffset, false) * this.rect.height);
		var x = this.rect.x + random.random(this.rect.width - w);
		var y = this.rect.y + random.random(this.rect.height - h);
		this.room = new Room(new Rectangle(x, y, w, h));
		return this.room;
	};
	this.split = function(render, random) {
		if (this.leftNode != null || this.rightNode != null)
			return false;

		var splitH = (random.random(2, true) != 0);
		if (this.rect.width > this.rect.height && this.rect.width / this.rect.height >= 1.5)
			splitH = false;
		else if (this.rect.height > this.rect.width && this.rect.height / this.rect.width >= 1.5)
			splitH = true;

		var max = (splitH ? this.rect.height : this.rect.width) - this.minSize;
		if (max <= this.minSize)
			return false;

		var split = random.randomRange(this.minSize, (max - this.minSize));
		if (splitH) {
			this.leftNode = new Leaf(new Rectangle(this.rect.x, this.rect.y, this.rect.width, split), color);
			this.rightNode = new Leaf(new Rectangle(this.rect.x, this.rect.y + split, this.rect.width, this.rect.height - split), render.getRandomColor(random));
		} else {
			this.leftNode = new Leaf(new Rectangle(this.rect.x, this.rect.y, split, this.rect.height), color);
			this.rightNode = new Leaf(new Rectangle(this.rect.x + split, this.rect.y, this.rect.width - split, this.rect.height), render.getRandomColor(random));
		}
		return true;
	};
	this.draw = function(render) {
		render.drawLeaf(this.rect, this.color);
	};
}
