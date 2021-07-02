import Phaser from 'phaser';
import config from '../Config/config';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // add logo image
    this.add.image(config.width / 2, config.height / 2 - 200, 'logo').setScale(0.6);

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(config.width / 2 - 160, config.height / 2 - 70, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 + 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 100,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(config.width / 2 - 150, config.height / 2 - 60, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', 'src/assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'src/assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'src/assets/logo.png');
    this.load.image('box', 'src/assets/ui/grey_box.png');
    this.load.image('checkedBox', 'src/assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['src/assets/space/Dafunk - Hardcore Power (We Believe In Goa - Remix).m4a']);
    this.load.image('logo', 'src/assets/logo.png');
    this.load.audio('explosion', 'src/assets/space/explosion.mp3');
    this.load.audio('blaster', 'src/assets/space/blaster.mp3');

    this.load.image('background', 'src/assets/space/nebula.jpg');
    this.load.image('stars', 'src/assets/space/stars.png');
    this.load.image('ship', 'src/assets/space/ship.png');
    this.load.atlas('space', 'src/assets/space/space.png', 'src/assets/space/space.json');

    this.load.image('spark0', 'src/assets/space/blue.png');
    this.load.image('spark1', 'src/assets/space/red.png');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
