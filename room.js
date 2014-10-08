function Room(rect) {
	this.rect = rect;
	this.node = new Array();
	this.draw = function(render) {
		render.drawRoom(rect);
	};
	this.getDistance = function(room) {
		var x = Math.abs(this.rect.x + this.rect.width / 2 - room.rect.x + room.rect.width / 2);
		var y = Math.abs(this.rect.y + this.rect.height / 2 - room.rect.y + room.rect.height / 2);
		return Math.round(Math.sqrt((x * x) + (y * y)));
	};
	this.addNode = function(room) {
		this.node.push({room1:this, room2:room});
	};
	this.isNodeConnected = function(room) {
		for (var i = 0; i < this.node.length; i++) {
			if (this.node[i].room1 == this && this.node[i].room2 == room) {
				return true;
			}
		}
		return false;
	};
}
