function Random() {
    // random value from min to max
    this.range = function(min, max, flag = true) {
        if (flag) {
            // if flag is true, returned floored value from randomized value with max and min parameter
			var rres = this.random(max - min);
			var res = Math.floor(rres + min);
            return res;
        } else {
            // if flag is false, returned randomized value with max and min parameter
            return this.random(max - min) + min;
        }
    };
    // random value from 0 to max
    this.random = function(max, flag = true) {
        if (flag) {
            // if flag is true, returned floored value from randomized value with max parameter
            return Math.floor(Math.random() * max);
        } else {
            // if flag is false, returned randomized value with max parameter
            return Math.random() * max;
        }
    };
}
