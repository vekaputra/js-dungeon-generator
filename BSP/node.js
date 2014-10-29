function Node(rect) {
	this.rect = rect;
	this.dir = -1;
	this.leftNode = null;
	this.rightNode = null;
	this.room = {x:0, y:0, width:0, height:0};
	this.halls = [];
	this.getRoom = function() {
		if (this.leftNode == null && this.rightNode == null) {
			return this.room;
		} else {
			var leftRoom, rightRoom;
			if (this.leftNode != null) leftRoom = this.leftNode.getRoom();
			if (this.rightNode != null) rightRoom = this.rightNode.getRoom();
			
			if (leftRoom == null) return rightRoom;
			else if (rightRoom == null) return leftRoom;
			else if (random.random(2) < 1) return rightRoom;
			else return leftRoom;
		}
	};
	this.createHall = function(leftRoom, rightRoom) {	
		var point1 = {
			x:random.range(leftRoom.x + 1, leftRoom.x + leftRoom.width - 3), 
			y:random.range(leftRoom.y + 1, leftRoom.y + leftRoom.height - 3)
		};
		var point2 = {
			x:random.range(rightRoom.x + 1, rightRoom.x + rightRoom.width - 3), 
			y:random.range(rightRoom.y + 1, rightRoom.y + rightRoom.height - 3)
		};
		
		var minX = Math.min(point1.x, point2.x);
		var minY = Math.min(point1.y, point2.y);
		var maxX = Math.max(point1.x, point2.x);
		var maxY = Math.max(point1.y, point2.y);
		var w = point1.x - point2.x;
		var h = point1.y - point2.y;
		var mW = Math.abs(w);
		var mH = Math.abs(h);
		
		if (w == 0) {
			this.halls.push({x:minX, y:minY, width:2, height:mH});
		} else if (h == 0) {
			this.halls.push({x:minX, y:minY, width:mW, height:2});
		} else {
			if ((w > 0 && h > 0) || (w < 0 && h < 0)) {
				if (random.random(2) > 1) {
					this.halls.push({x:minX, y:minY, width:mW, height:2});
					this.halls.push({x:maxX, y:minY, width:2, height:mH});
				} else {
					this.halls.push({x:minX, y:minY, width:2, height:mH});
					this.halls.push({x:minX, y:maxY, width:mW, height:2});
				}
			} else {
				if (random.random(2) > 1) {
					this.halls.push({x:minX, y:maxY, width:mW, height:2});
					this.halls.push({x:maxX, y:minY, width:2, height:mH});
				} else {
					this.halls.push({x:minX, y:minY, width:2, height:mH});
					this.halls.push({x:minX, y:minY, width:mW, height:2});
				}
			}
		}
	};
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
			
			this.createHall(this.leftNode.getRoom(), this.rightNode.getRoom());
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
				this.leftNode = new Node({x:this.rect.x, y:this.rect.y, width:this.rect.width, height:split});
				this.rightNode = new Node({x:this.rect.x, y:this.rect.y + split, width:this.rect.width, height:this.rect.height - split});
			} else {
				// split vertical
				this.leftNode = new Node({x:this.rect.x, y:this.rect.y, width:split, height:this.rect.height});
				this.rightNode = new Node({x:this.rect.x + split, y:this.rect.y, width:this.rect.width - split, height:this.rect.height});
			}
		}
	};
	this.commit = function(arr) {
		if (this.leftNode != null || this.rightNode != null) {
			if (this.leftNode != null) this.leftNode.commit(arr);
			if (this.rightNode != null) this.rightNode.commit(arr);
		} else {
			/*for (var i = this.rect.y; i < this.rect.y + this.rect.height; i++) {
				for (var j = this.rect.x; j < this.rect.x + this.rect.width; j++) {
					if (i == this.rect.y || i == this.rect.y + this.rect.height - 1 || j == this.rect.x || j == this.rect.x + this.rect.width - 1) 
						arr[i][j] = 3;
					else 
						arr[i][j] = 2;
				}
			}*/
			for (var i = this.room.y; i < this.room.y + this.room.height; i++) {
				for (var j = this.room.x; j < this.room.x + this.room.width; j++) {
					arr[i][j] = 0;
				}
			}
		}
		for (var k = 0; k < this.halls.length; k++) {
			var hall = this.halls[k];
			for (var i = hall.y; i < hall.y + hall.height; i++) {
				for (var j = hall.x; j < hall.x + hall.width; j++) {
					arr[i][j] = 0;
				}
			}
		}
	};
}