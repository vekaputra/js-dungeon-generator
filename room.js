function Room(rect) {
	this.rect = rect;
	this.draw = function() {
		render.drawRoom(rect);
	};
}
