function Render(context, size) {
	this.ctx = context;
	this.blockSize = size;
	this.clear = function(canvas) {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	this.drawCanvas = function(canvas) {
		this.ctx.fillStyle = "#ffffff";
		this.ctx.strokeStyle = "#000000";
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.ctx.strokeRect(0, 0, canvas.width, canvas.height);
	};
	this.draw = function(x, y, width, height) {
		// inner dungeon
		this.ctx.fillStyle = this.getRandomColor();
		this.ctx.strokeStyle = "#000000";
		for (var i = 0; i < height; i++) {
			for (var j = 0; j < width; j++) {
				this.ctx.fillRect((x + j) * this.blockSize, (y + i) * this.blockSize, this.blockSize, this.blockSize);
				this.ctx.strokeRect((x + j) * this.blockSize, (y + i) * this.blockSize, this.blockSize, this.blockSize);
			}
		}
	};
	this.getRandomColor = function() {
		var r = random.random(256, true);
		var g = random.random(256, true);
		var b = random.random(256, true);
		return "rgb(" + r + "," + g + "," + b + ")";
	};
}
