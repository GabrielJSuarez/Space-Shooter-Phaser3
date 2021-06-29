import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width:  window.innerWidth,
  height:   window.innerHeight,
  mode: Phaser.Scale.NONE,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  pixelArt: true,
  roundPixels: true
};
