function Leaf(rect, color, minSize) {
	this.rect = rect;
	this.minSize = minSize;
	this.color = color;
	this.leftNode = null;
	this.rightNode = null;
	this.room = null;
	this.halls = new Array();
	// get lowest child room
	this.getRoom = function() {
		// if this.room exists, return current room
		// else randomize child room to returned
		if (this.room != null) {
			return this.room;
		} else {
			var leftRoom, rightRoom;
			// if leftnode is not null, call getroom on leftnode and store it in leftroom
			if (this.leftNode != null) {
				leftRoom = this.leftNode.getRoom();
			}
			// if rightnode is not null, call getroom on rightnode and store it in rightroom
			if (this.rightNode != null) {
				rightRoom = this.rightNode.getRoom();
			}
			// determine which room will be returned
			if (leftRoom == null && rightRoom == null) {
				// if leftroom and rightroom is null return room as null
				return null;
			} else if (leftRoom == null) {
				// if leftroom is null return rightroom
				return rightRoom;
			} else if (rightRoom == null) {
				// if rightroom is null return lightroom
				return leftRoom;
			} else if (random.random(2) > 1) {
				// if random value more than 1, return rightroom
				return rightRoom;
			} else {
				// if random value less than 1, return leftroom
				return leftRoom;
			}
		}
	};
	this.createHall = function(leftRoom, rightRoom) {
		halls = new Array();


	};
	// create room in lowest child
	this.createRoom = function() {
		// if leftnode or rightnode is not null
		// else create room
		if (this.leftNode != null || this.rightNode != null) {
			// call createroom function in leftnode
			if (this.leftNode != null)
				this.leftNode.createRoom();
			// call createroom function in rightnode
			if (this.rightNode != null)
				this.rightNode.createRoom();
		} else {
			var roomSize, roomPos;
			// randomize width and height then store it as roomSize
			roomSize = new Point(random.randomRange(4, this.rect.width - 2), random.randomRange(4, this.rect.height - 2));
			// randomize x and y pos then store it as roomPos
			roomPos = new Point(random.randomRange(1, this.rect.width - roomSize.x - 1), random.randomRange(1, this.rect.height - roomSize.y - 1));
			// store current room info into this.room
			this.room = new Room(new Rectangle(this.rect.x + roomPos.x, this.rect.y + roomPos.y, roomSize.x, roomSize.y));
		}
	};
	// split leaf to leftnode and rightnode
	this.split = function() {
		// if leftnode or rightnode is not null, then mark split as failed and return false
		if (this.leftNode != null || this.rightNode != null)
			return false;
		// determine split direction from width or height
		var splitH = (random.random(2, true) != 0);
		// if width greater than height and width 50% bigger than height
		// force split width
		// if height greater than width and height 50% bigger than width
		// force split height
		if (this.rect.width > this.rect.height && this.rect.width / this.rect.height >= 1.5)
			splitH = false;
		else if (this.rect.height > this.rect.width && this.rect.height / this.rect.width >= 1.5)
			splitH = true;
		// find maximum split size to make sure all node always bigger than minimum split size
		var max = (splitH ? this.rect.height : this.rect.width) - this.minSize;
		// if maximum split size less than minimum split size, then mark split as failed and return false
		if (max <= this.minSize)
			return false;
		// randomize split size between minimum size and maximum size
		var split = random.randomRange(this.minSize, max);
		if (splitH) {
			// split by height
			// assigned split size as leftNode height
			this.leftNode = new Leaf(new Rectangle(this.rect.x, this.rect.y, this.rect.width, split), color, minSize);
			// assigned current leaf height - split size as rightNode height, and add node y position with split size
			this.rightNode = new Leaf(new Rectangle(this.rect.x, this.rect.y + split, this.rect.width, this.rect.height - split), render.getRandomColor(), minSize);
		} else {
			// split by width
			// assigned split size as leftNode width
			this.leftNode = new Leaf(new Rectangle(this.rect.x, this.rect.y, split, this.rect.height), color, minSize);
			// assigned current leaf width - split size as rightNode width, and add node x position with split size
			this.rightNode = new Leaf(new Rectangle(this.rect.x + split, this.rect.y, this.rect.width - split, this.rect.height), render.getRandomColor(), minSize);
		}
		// mark split as success and return true
		return true;
	};
	// draw leaf to canvas
	this.draw = function() {
		// call draw from Render class
		render.drawLeaf(this.rect, this.color);
	};
}
