function Render(context) {
	this.ctx = context;
	this.clear = function(canvas) {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	this.drawLeaf = function(rect, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
		this.ctx.strokeStyle = "#000000";
		this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
	};
	this.drawRoom = function(rect) {
		this.ctx.fillStyle = "#666666";
		this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
		this.ctx.strokeStyle = "#ffffff";
		this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
	};
	this.drawHall = function(point1, point2) {
		this.ctx.fillStyle = "#999999";
		this.ctx.fillRect(point1.x, point2.y, point2.x - point1.x, point2.y - point1.y);
		this.ctx.strokeStyle = "#ffffff";
		this.ctx.strokeRect(point1.x, point2.y, point2.x - point1.x, point2.y - point1.y);
	};
	this.getRandomColor = function(random) {
		var r = random.random(256, true);
		var g = random.random(256, true);
		var b = random.random(256, true);
		return "rgb(" + r + "," + g + "," + b + ")";
	};
}
