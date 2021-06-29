import 'phaser';
import config from '../Config/config';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  preload () {
    // add logo image
    this.add.image(config.width / 2, config.height / 2 - 250, 'logo');

    // display progress bar
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(config.width / 2 - 160, config.height / 2 - 150, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(config.width / 2 - 150, config.height / 2 - 140, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', 'src/assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'src/assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'src/assets/logo.png');
    this.load.image('box', 'src/assets/ui/grey_box.png');
    this.load.image('checkedBox', 'src/assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['src/assets/TownTheme.mp3']);
    this.load.image("sprBg0", "src/assets/shooter/sprBg0.png");
    this.load.image("sprBg1", "src/assets/shooter/sprBg1.png");
    this.load.image('logo', 'src/assets/logo.png');
    this.load.image("sprBg0", "src/assets/shooter/sprBg0.png");
    this.load.image("sprBg1", "src/assets/shooter/sprBg1.png");
    this.load.spritesheet("sprExplosion", "src/assets/shooter/sprExplosion.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("sprEnemy0", "src/assets/shooter/sprEnemy0.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprEnemy1", "src/assets/shooter/sprEnemy1.png");
    this.load.spritesheet("sprEnemy2", "src/assets/shooter/sprEnemy2.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprLaserEnemy0", "src/assets/shooter/sprLaserEnemy0.png");
    this.load.image("sprLaserPlayer", "src/assets/shooter/sprLaserPlayer.png");
    this.load.spritesheet("sprPlayer", "src/assets/shooter/sprPlayer.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.audio("sndExplode0", "src/assets/shooter/sndExplode0.wav");
    this.load.audio("sndExplode1", "src/assets/shooter/sndExplode1.wav");
    this.load.audio("sndLaser", "src/assets/shooter/sndLaser.wav");
    this.load.audio("sndBtnDown", "src/assets/shooter/sndBtnDown.wav");
    this.load.audio("sndBtnOver", "src/assets/shooter/sndBtnOver.wav");
    this.load.image("sprBg0", "src/assets/shooter/sprBg0.png");
    this.load.image("sprBg1", "src/assets/shooter/sprBg1.png");
    this.load.image("sprBtnPlay", "src/assets/shooter/sprBtnPlay.png");
    this.load.image("sprBtnPlayDown", "src/assets/shooter/sprBtnPlayDown.png");
    this.load.image("sprBtnRestart", "src/assets/shooter/sprBtnRestart.png");
    this.load.image("sprBtnRestartDown", "src/assets/shooter/sprBtnRestartDown.png");
    this.load.image("sprBtnRestartHover", "src/assets/shooter/sprBtnRestartHover.png");
  }

  init () {
    this.readyCount = 0;
  }

  ready () {
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};
