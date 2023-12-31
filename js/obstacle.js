class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 400;
    this.top = Math.floor(Math.random() * 300 + 250);
    this.width = 30;
    this.height = 30;
    this.element = document.createElement("img");

    this.element.src = "./images/bullet.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    // Update the obstacle's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // Move the obstacle down by 3px
    this.left += -3;
    //this.height = 100;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}

class obstacle extends Component {
  constructor(gameScreen) {
    super(
      gameScreen,
      Math.floor(Math.random() * 300 + 70),
      0,
      100,
      150,
      "./images/bullet.png"
    );
  }

  move() {
    // Move the obstacle down by 3px
    this.right += -2;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}
