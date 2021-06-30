import 'phaser';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser-example',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};
