function Render(context) {
	this.ctx = context;
	this.clear = function(canvas) {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	this.drawLeaf = function(x, y, width, height, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, width, height);
	};
	this.drawRoom = function(x, y, width, height) {
		this.ctx.fillStyle = "#666666";
		this.ctx.fillRect(x, y, width, height);
		this.ctx.strokeStyle = "#ffffff";
		this.ctx.strokeRect(x, y, width, height);
	};
	this.getRandomColor = function() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return "rgb(" + r + "," + g + "," + b + ")";
	};
}