function Node(rect, index) {
	this.rect = rect;
	this.dir = -1;
	this.leftNode = null;
	this.rightNode = null;
	this.room = {x:0, y:0, width:0, height:0};
	this.index = index;
	this.createRoom = function(minSize, maxOffset) {
		if (this.leftNode == null && this.rightNode == null) {
			if (minSize > this.rect.width - maxOffset) this.room.width = minSize;
			else this.room.width = random.range(minSize, this.rect.width - maxOffset);
			if (minSize > this.rect.height - maxOffset) this.room.height = minSize;
			else this.room.height = random.range(minSize, this.rect.height - maxOffset);
			this.room.x = this.rect.x + random.range(1, this.rect.width - this.room.width - 1);
			this.room.y = this.rect.y + random.range(1, this.rect.height - this.room.height - 1);
		} else {
			if (this.leftNode != null) this.leftNode.createRoom(minSize, maxOffset);
			if (this.rightNode != null) this.rightNode.createRoom(minSize, maxOffset);
		}
	};
	this.split = function(minSize) {
		if (this.leftNode != null || this.rightNode != null || this.dir != -1) {
			if (this.leftNode != null) this.leftNode.split(minSize);
			if (this.rightNode != null) this.rightNode.split(minSize);
		} else {
			this.dir = random.random(2);
			if (this.rect.width / this.rect.height >= 1.5) 
				this.dir = 1;
			else if (this.rect.height / this.rect.width >= 1.5) 
				this.dir = 0;
			
			var max = ((this.dir == 0)?this.rect.height:this.rect.width) - minSize;
			if (max < minSize) return false;
			
			var split = random.range(minSize, max);
			if (this.dir == 0) {
				// split horizontal
				this.leftNode = new Node({x:this.rect.x, y:this.rect.y, width:this.rect.width, height:split}, 0);
				this.rightNode = new Node({x:this.rect.x, y:this.rect.y + split, width:this.rect.width, height:this.rect.height - split}, 1);
			} else {
				// split vertical
				this.leftNode = new Node({x:this.rect.x, y:this.rect.y, width:split, height:this.rect.height}, 0);
				this.rightNode = new Node({x:this.rect.x + split, y:this.rect.y, width:this.rect.width - split, height:this.rect.height}, 1);
			}
		}
	};
	this.commit = function(arr) {
		if (this.leftNode != null || this.rightNode != null) {
			if (this.leftNode != null) this.leftNode.commit(arr);
			if (this.rightNode != null) this.rightNode.commit(arr);
		} else {
			for (var i = this.rect.y; i < this.rect.y + this.rect.height; i++) {
				for (var j = this.rect.x; j < this.rect.x + this.rect.width; j++) {
					if (i == this.rect.y || i == this.rect.y + this.rect.height - 1 || j == this.rect.x || j == this.rect.x + this.rect.width - 1) 
						arr[i][j] = 3;
					else 
						arr[i][j] = 2;
				}
			}
			for (var i = this.room.y; i < this.room.y + this.room.height; i++) {
				for (var j = this.room.x; j < this.room.x + this.room.width; j++) {
					arr[i][j] = 0;
				}
			}
		}
	};
}