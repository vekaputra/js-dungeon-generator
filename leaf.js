function Leaf(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.minSize = 100;
	this.color = color;
	this.leftNode = null;
	this.rightNode = null;
	this.createRoom = function(offset) {
		var wOffset = this.width - offset;
		var hOffset = this.height - offset;
		var minOffset = this.minSize - offset;
		var w = Math.floor(Math.random() * wOffset + minOffset);
		var h = Math.floor(Math.random() * hOffset + minOffset);
		var x = this.x + Math.floor(Math.random() * (this.width - w));
		var y = this.y + Math.floor(Math.random() * (this.height - h));
		return new Room(x, y, w, h);
	};
	this.split = function(render) {
		if (this.leftNode != null || this.rightNode != null)
			return false;
		
		var splitH = (Math.floor(Math.random() * 2) != 0);
		if (this.width > this.height && this.width / this.height >= 1.5)
			splitH = false;
		else if (this.height > this.width && this.height / this.width >= 1.5)
			splitH = true;
		
		var max = (splitH ? this.height : this.width) - this.minSize;
		if (max <= this.minSize)
			return false;
			
		var split = Math.floor(Math.random() * (max - this.minSize)) + this.minSize;
		if (splitH) {
			this.leftNode = new Leaf(this.x, this.y, this.width, split, color);
			this.rightNode = new Leaf(this.x, this.y + split, this.width, this.height - split, render.getRandomColor());
		} else {
			this.leftNode = new Leaf(this.x, this.y, split, this.height, color);
			this.rightNode = new Leaf(this.x + split, this.y, this.width - split, this.height, render.getRandomColor());
		}
		return true;
	};
	this.draw = function(render) {
		render.drawLeaf(this.x, this.y, this.width, this.height, this.color);
	};
}