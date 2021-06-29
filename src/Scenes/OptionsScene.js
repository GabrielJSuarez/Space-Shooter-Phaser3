import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }

  create () {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(config.width/2 - 85, config.height/2 - 250, 'Options', { fontSize: 40 });

    this.musicButton = this.add.image(config.width/2 - 110, config.height/2 - 140, 'checkedBox');
    this.musicText = this.add.text(config.width/2 - 70, config.height/2 - 150, 'Music Enabled', { fontSize: '24px' });

    this.soundButton = this.add.image(config.width/2 - 110, config.height/2 - 10, 'checkedBox');
    this.soundText = this.add.text(config.width/2 - 70, config.height/2 - 20, 'Sound Enabled', { fontSize: '24px' });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', function () {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    }.bind(this));

    this.soundButton.on('pointerdown', function () {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    }.bind(this));

    this.menuButton = new Button(this, config.width/2, config.height/2 + 150, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
};
