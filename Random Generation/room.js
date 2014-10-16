function Room() {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.create = function(minSize, maxSize, canvasWidth, canvasHeight) {
		this.width = random.randomRange(minSize, maxSize);
		this.height = random.randomRange(minSize, maxSize);
		do {
			this.x = random.randomRange(0, canvasWidth - this.width);
			this.y = random.randomRange(0, canvasHeight - this.height);
		} while(this.isCollided());
	};
	this.isCollided = function() {
		for (var i = 0; i < rooms.length; i++) {
			var room = rooms[i];
			if (room.isInside(this.x, this.y) || room.isInside(this.x + this.width, this.y) || room.isInside(this.x, this.y + this.height) || room.isInside(this.x + this.width, this.y + this.height)) {
				return true;
			}
		}
		return false;
	};
	this.isInside = function(x, y) {
		if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) return true;
		return false;
	};
	this.draw = function() {
		render.draw(this.x, this.y, this.width, this.height);
	};
}