function Render(context) {
	this.ctx = context;
	this.clear = function(canvas) {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	this.drawLeaf = function(rect, color) {
		this.ctx.fillStyle = color;
		this.ctx.strokeStyle = "#000000";
		for (var i = 0; i < rect.height; i++) {
			for (var j = 0; j < rect.width; j++) {
				this.ctx.fillRect((rect.x + j) * 10, (rect.y + i) * 10, 10, 10);
				this.ctx.strokeRect((rect.x + j) * 10, (rect.y + i) * 10, 10, 10);
			}
		}
	};
	this.drawRoom = function(rect) {
		this.ctx.fillStyle = "#ffffff";
		//this.ctx.strokeStyle = "#000000";
		this.ctx.fillRect(rect.x * 10, rect.y * 10, rect.width * 10, rect.height * 10);
		//this.ctx.strokeRect(rect.x * 10, rect.y * 10, rect.width * 10, rect.height * 10);
	};
	this.drawHall = function(point1, point2) {
		this.ctx.fillStyle = "#000000";
		this.ctx.fillRect(point1.x, point2.y, point2.x - point1.x, point2.y - point1.y);
		this.ctx.strokeStyle = "#ffffff";
		this.ctx.strokeRect(point1.x, point2.y, point2.x - point1.x, point2.y - point1.y);
	};
	this.getRandomColor = function() {
		var r = random.random(256, true);
		var g = random.random(256, true);
		var b = random.random(256, true);
		return "rgb(" + r + "," + g + "," + b + ")";
	};
}
