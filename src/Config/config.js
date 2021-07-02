import Phaser from 'phaser';

export default {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scale: {
    parent: 'phaser-example',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,

  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};
