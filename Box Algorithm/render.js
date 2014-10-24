function Render(context, size) {
	this.ctx = context;
	this.blockSize = size;
	this.clear = function(canvas) {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	this.drawCanvas = function(canvas) {
		this.ctx.fillStyle = "#333333";
		this.ctx.strokeStyle = "#ffffff";
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.ctx.strokeRect(0, 0, canvas.width, canvas.height);
	};
	this.draw = function(arr, width, height) {
		for (var i = 0; i < height; i++)
		{
			for (var j = 0; j < width; j++)
			{
				if (arr[i][j] == 0)
				{
					this.ctx.fillStyle = "#ffff00";
					this.ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
				}
				else if (arr[i][j] == 1)
				{
					this.ctx.fillStyle = "#ffffff";
					this.ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
				}
				else if (arr[i][j] == 2)
				{
					this.ctx.fillStyle = "#999999";
					this.ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
				}
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
