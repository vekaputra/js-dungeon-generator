function Render(context) {
	this.ctx = context;
	// clear the canvas
	this.clear = function(canvas) {
		// clear canvas from 0,0 with the size of canvas
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	// draw leaf 10x10 pixel each
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
	// draw room and hall
	this.drawRoom = function(rect) {
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillRect(rect.x * 10, rect.y * 10, rect.width * 10, rect.height * 10);
	};
	// randomized color to format 'rgb(r,g,b)'
	this.getRandomColor = function() {
		var r = random.random(256, true);
		var g = random.random(256, true);
		var b = random.random(256, true);
		return "rgb(" + r + "," + g + "," + b + ")";
	};
}
