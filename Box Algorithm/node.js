function Node(rect, split) {
	this.rect = rect;
	this.dir = -1;
	this.end = 0;
	this.leftNode = null;
	this.rightNode = null;
	this.split = function(dir, endChance) {
		if (this.end == 1 && this.leftNode != null && this.rightNode != null) {
			this.leftNode.split(dir, endChance);
			this.rightNode.split(dir, endChance);
			return false;
		}
		// dir 0 = row, 1 = col
		var seed = random.range(0, 100);
		if(seed >= endChance) {
			var cRect = {
				height: (dir == 0)?this.rect.height / 2:this.rect.height,
				width: (dir == 1)?this.rect.width / 2:this.rect.width
			};
			var rightPoint = {
				x: (dir == 1)?this.rect.x + cRect.width:this.rect.x,
				y: (dir == 0)?this.rect.y + cRect.height:this.rect.y
			};
			this.dir = dir;
			this.leftNode = new Node({x:this.rect.x, y:this.rect.y, width:cRect.width, height:cRect.height});
			this.rightNode = new Node({x:rightPoint.x, y:rightPoint.y, width:cRect.width, height:cRect.height});
		}
		this.end = 1;
	};
	this.commit = function(arr) {
		if (this.leftNode == null && this.rightNode == null) {
			for (var i = this.rect.y; i < this.rect.y + this.rect.height; i++)
				for (var j = this.rect.x; j < this.rect.x + this.rect.width; j++)
				{
					if (i == this.rect.y || i == this.rect.y + this.rect.height - 1 || j == this.rect.x || j == this.rect.x + this.rect.width - 1)
						arr[i][j] = 2;
					else
						arr[i][j] = 1;
				}
		} else {
			this.leftNode.commit(arr);
			this.rightNode.commit(arr);
		}
	};
}