function Render(context) {
	this.ctx = context;
	this.clear = function(canvas) {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	this.drawLeaf = function(x, y, width, height, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, width, height);
		this.ctx.strokeStyle = "#000000";
		this.ctx.strokeRect(x, y, width, height);
	};
	this.drawRoom = function(x, y, width, height) {
		this.ctx.fillStyle = "#666666";
		this.ctx.fillRect(x, y, width, height);
		this.ctx.strokeStyle = "#ffffff";
		this.ctx.strokeRect(x, y, width, height);
	};
	this.getRandomColor = function(random) {
		var r = random.random(256, true);
		var g = random.random(256, true);
		var b = random.random(256, true);
		return "rgb(" + r + "," + g + "," + b + ")";
	};
}
