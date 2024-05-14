import Phaser from "phaser";
class MovementHandler {
  constructor(gameObject) {
    this.gameObject = gameObject;
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
    const speed = 1;

    if (this.keyA.isDown) {
      this.gameObject.x -= speed; // Adjust velocity as needed
    } else if (this.keyD.isDown) {
      this.gameObject.x += speed;
    }
    if (this.keyW.isDown) {
      this.gameObject.y -= speed; // Adjust velocity as needed
    } else if (this.keyS.isDown) {
      this.gameObject.y += speed;
    }
  }
}
export default class Player extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "char_sprite", 6 * 8 - 1);
    this.scene = scene;
    this.movementHandler = new MovementHandler(this);
    scene.add.existing(this);
    this.setOrigin(0.5, 0.5);
  }
  update() {
    this.movementHandler.update();
  }
}
