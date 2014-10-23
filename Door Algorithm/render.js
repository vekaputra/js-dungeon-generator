function Render(context, size) {
	this.ctx = context;
	this.blockSize = size;
	this.clear = function(canvas) {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	this.drawCanvas = function(canvas) {
		this.ctx.fillStyle = "#333333";
		this.ctx.strokeStyle = "#000000";
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.ctx.strokeRect(0, 0, canvas.width, canvas.height);
	};
	this.draw = function(x, y, width, height) {
		this.ctx.fillStyle = "#999999";
		this.ctx.fillRect(x * blockSize, y * blockSize, width * blockSize, height * blockSize);
		
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillRect((x + 1) * blockSize, (y + 1) * blockSize, (width - 2) * blockSize, (height - 2) * blockSize);
	};
	this.getRandomColor = function() {
		var r = random.random(256, true);
		var g = random.random(256, true);
		var b = random.random(256, true);
		return "rgb(" + r + "," + g + "," + b + ")";
	};
}
