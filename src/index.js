import Phaser from "phaser";
import Player from "./Prefabs/Player";
import SmoothCamera from "./Classes/SmoothCamera";

const UPSCALE_FACTOR = 4;
const GAME_WIDTH = 320 * UPSCALE_FACTOR;
const GAME_HEIGHT = (320 * UPSCALE_FACTOR) / 1.78;

let tiles = [];

class Scene extends Phaser.Scene {
  preload() {
    // load game assets
    this.load.spritesheet("char_sprite", "./assets/monster-ghost.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("nature_tile", "./assets/nature-tile.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }
  create() {
    //create camera
    this.camera = new SmoothCamera(this, 0, 0);
    this.camera.setZoom(UPSCALE_FACTOR);

    // make render texture for grass tiles
    this.renderTexture = this.make.renderTexture(
      {
        x: 0,
        y: 0,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
      },
      true
    );
    //align render texture to top left
    this.renderTexture.setOrigin(0, 0);
    this.renderTexture.setScrollFactor(0, 0);

    // create grass tiles
    for (let x = -25; x < 25; x++) {
      for (let y = -25; y < 25; y++) {
        const newTile = new Phaser.GameObjects.Image(
          this,
          x * 16,
          y * 16,
          "nature_tile",
          12
        );
        tiles.push(newTile);
      }
    }

    // create player
    this.player = new Player(this, 0, 0);
    this.player.setDepth(10);

    //set player as camera target
    this.camera.setTarget(this.player, 0.01);
  }
  update() {
    this.player.update();

    // prepare render texture
    this.renderTexture.clear();

    //batch draw grass texture
    this.renderTexture.beginDraw();
    tiles.forEach((t) => {
      this.renderTexture.batchDraw(
        t,
        t.x - this.camera.scrollX,
        t.y - this.camera.scrollY
      );
    });
    this.renderTexture.endDraw();
  }
}

const phaserConfig = {
  type: Phaser.WEBGL,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  orientation: "landscape",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
  },
  scene: [Scene],
  pixelArt: true,
  roundPixels: false,
  autoRound: false,
};

new Phaser.Game(phaserConfig);
