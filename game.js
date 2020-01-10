const rad = 20;

const leftElbow = 7;
const rightElbow = 8;
const leftWrist = 9;
const rightWrist = 10;

var screen;
const homeScreen = 0;
const gameScreen = 1;

var gameState
const gamePlaying = 0;
const gameLoose = 1;
const gameWon = 2;

// change screen targets
const X = 320, Y = 350, W = 80;
const X_ = 100, Y_ = 100, W_ = 50;

// hands positions
var x1, x2, y1, y2;

var targets = [];
const maxTargets = 5;

var score;
var missedTargets;
const targetsToLoose = 5;
const targetsToWin = 10;
const targetsProb = 0.01;

class Game {

	constructor() {
		for (var i = 0; i < maxTargets; i++)
			targets.push(new Target());
		this.resetGame();
		screen = homeScreen;
	}

	setPoint1(x_, y_) {
		x1 = x_;
		y1 = y_;
	}
	setPoint2(x_, y_) {
		x2 = x_;
		y2 = y_;
	}

	addTarget() {
		for (var i = 0; i < maxTargets; i++)
			if (targets[i].isUnvisible()) {
				targets[i].reset();
				break;
			}
	}

	resetGame() {
		x1 = x2 = y1 = y2 = null;
		score = missedTargets = 0;
		for (var i = 0; i < maxTargets; i++)
			targets[i].setUnvisible();
		gameState = gamePlaying;

	}

	goHomeButtonTouched(x, y) {
		return X - W < x && x < X + W && Y - W < y && y < Y + W;
	}

	startGameButtonTouched(x, y) {
		return (X_ - W_ < x && x < X_ + W_ && Y_ - W_ < y && y < Y_ + W_);
	}

	act() {
		switch (screen) {
			case homeScreen:
				if (this.startGameButtonTouched(x1, y1) || this.startGameButtonTouched(x2, y2)) {
					this.resetGame();
					screen = gameScreen;
				}
				break;

			case gameScreen:
				switch (gameState) {
					case gamePlaying:
						if (missedTargets >= targetsToLoose) {
							gameState = gameLoose;
						}
						if (score >= targetsToWin) {
							gameState = gameWon;
						}
						if (random() < targetsProb) this.addTarget();

						var nb = 0;
						for (var i = 0; i < maxTargets; i++)
							if (targets[i].isVisible()) nb++;

						if (nb == 0) this.addTarget();

						for (var i = 0; i < maxTargets; i++)
							if (targets[i].isVisible())
								targets[i].act();

						for (var i = 0; i < maxTargets; i++)
							if (targets[i].isVisible()) {
								if (targets[i].checkHit(x1, y1) || targets[i].checkHit(x2, y2)) {
									targets[i].setUnvisible();
									score++;
								}
							}
						break;

					case gameLoose:
						if (this.goHomeButtonTouched(x1, y1) || this.goHomeButtonTouched(x2, y2)) {
							this.resetGame();
							screen = homeScreen;
						}
						break;

					case gameWon:
						if (this.goHomeButtonTouched(x1, y1) || this.goHomeButtonTouched(x2, y2)) {
							this.resetGame();
							screen = homeScreen;
						}
						break;
				}

				break;
		}
	}

	drawPoints() {
		if (x1 && y1) this.drawAtPoint(x1, y1);
		if (x2 && y2) this.drawAtPoint(x2, y2);
	}

	drawAtPoint(x_, y_) {
		fill(255);
		ellipse(x_, y_, 2 * rad, 2 * rad);
	}

	draw() {
		switch (screen) {
			case homeScreen:
				fill(255);
				text("Blow Bubble", 250, 100);
				text("use your hands to aim", 170, 300);
				text("destroy the target to start !", 150, 350);

				fill(255, 0, 0, 100);
				ellipse(X_, Y_, W_, W_);
				break;

			case gameScreen:
				switch (gameState) {
					case gamePlaying:
						text("Score : " + score, 350, 50);
						text("Missed : " + missedTargets, 100, 50);
						for (var i = 0; i < maxTargets; i++)
							if (targets[i].isVisible())
								targets[i].draw();

						break;
					case gameWon:
						text("YOU WIN", 250, 50);
						fill(0, 255, 0);
						ellipse(X, Y, W, W);
						break;

					case gameLoose:
						text("YOU LOOSE :(", 200, 50);
						fill(255, 0, 0);
						ellipse(X, Y, W, W);
						break;
				}
				break;
		}
		this.drawPoints();
	}
}