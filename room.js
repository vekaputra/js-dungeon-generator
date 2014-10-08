function Room(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.draw = function(render) {
		render.drawRoom(this.x, this.y, this.width, this.height);
	};
}
