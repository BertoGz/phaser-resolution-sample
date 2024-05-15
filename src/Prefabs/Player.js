import Phaser from "phaser";
class MovementHandler {
  constructor(gameObject, config = { moveSpeed: 1 }) {
    this.gameObject = gameObject;
    this.moveSpeed = config.moveSpeed;
    this.keyA = gameObject.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.keyD = gameObject.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this.keyW = gameObject.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.keyS = gameObject.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
  }
  update() {
    if (this.keyA.isDown) {
      this.gameObject.x -= this.moveSpeed; // Adjust velocity as needed
    } else if (this.keyD.isDown) {
      this.gameObject.x += this.moveSpeed;
    }
    if (this.keyW.isDown) {
      this.gameObject.y -= this.moveSpeed; // Adjust velocity as needed
    } else if (this.keyS.isDown) {
      this.gameObject.y += this.moveSpeed;
    }
  }
}
export default class Player extends Phaser.GameObjects.Image {
  constructor(scene, x, y, config) {
    super(scene, x, y, "char_sprite", 6 * 8 - 1);
    this.scene = scene;
    this.movementHandler = new MovementHandler(this, config);
    //);
    this.setOrigin(0.5, 0.5);
  }
  update() {
    this.movementHandler.update();
  }
}
