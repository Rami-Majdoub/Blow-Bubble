const maxSize = 80;
const initSize = 5;
const growSize = 0.5;

class Target {

	constructor() {
		this.visible = false;
	}

	setVisible() { this.visible = true; }
	setUnvisible() { this.visible = false; }

	isUnvisible() { return !this.visible; }
	isVisible() { return this.visible; }

	reset() {
		this.visible = true;
		this.x = random(maxSize, width - maxSize);
		this.y = random(maxSize, height - maxSize);
		this.size = initSize;

		this.r = random(0, 255);
		this.g = random(0, 255);
		this.b = random(0, 255);
	}

	act() {
		this.size += growSize;
		if (this.size >= maxSize) {
			this.visible = false;
			missedTargets++;
		}
	}

	draw() {
		noStroke();
		fill(this.r, this.g, this.b);
		ellipse(this.x, this.y, this.size, this.size);
	}

	checkHit(x, y) {
		if (this.size < 2 * rad) return false;

		var dist2 = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2);
		var d2 = Math.pow(rad + this.size, 2);
		return dist2 <= d2;
	}

}