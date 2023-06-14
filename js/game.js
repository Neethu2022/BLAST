class Game {
  // code to be added
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.gameSound = document.getElementById("game-sound");
    this.collisionSound = document.getElementById("collision-sound");

    this.player = null;
    this.height = 600;
    this.width = 500;
    this.obstacle = [];
    this.score = 0;
    this.lives = 3;
    //this.gamesound;
    //this.musicIsPlaying = 0;
    //this.bouncesound;
    //this.collisionsound;
    this.gameIsOver = false;
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/man.png"
    );
    this.obstacles = [];
    //this.gamesound = loadSound("../game.mp3");
    //this.bouncesound = loadSound("../bounce.mp3");
    //this.collisionsound = loadSound("../collision.mp3");
  }
  playSound() {
    this.gameSound.play();
  }
  playcollision() {
    this.collisionSound.play();
  }
  start() {
    this.playSound();
    this.gameScreen.style.width = `${this.width}px`;
    this.gameScreen.style.height = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameLoop();
    // this.gamesound.play();
  }
  gameLoop() {
    console.log("inside loop method");
    if (this.gameIsOver) {
      return;
    }
    this.update();
    window.requestAnimationFrame(() => this.gameLoop());
  }
  update() {
    this.player.move();
    console.log("inside update method");
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      // If the player collides with an obstacle
      if (this.player.didCollide(obstacle)) {
        // Remove the obstacle element from the DOM

        obstacle.element.remove();

        //man.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        this.playcollision();

        // Reduce player's lives by 1
        this.lives--;
        document.getElementById("lives").innerHTML = this.lives;

        // Update the counter variable to account for the removed obstacle

        i--;
      } // If the obstacle is off the screen (at the bottom)
      else if (obstacle.left < 0) {
        // Increase the score by 1
        this.score++;
        document.getElementById("score").innerHTML = this.score;
        // Remove the obstacle from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        i--;
      }
    }

    // If the lives are 0, end the game
    if (this.lives === 0) {
      // this.handlePlayerDeath();
      this.player.changeEnding("./images/dead-man.png");
      setTimeout(() => {
        this.endGame();
      }, 300);
    }

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacles.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}
