import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import ScrollingBackground from '../Objects/ScrollingBackground';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(config.width / 2 - 85, config.height / 2 - 250, 'Options', { fontSize: 40 });

    this.musicButton = this.add.image(config.width / 2 - 110, config.height / 2 - 40, 'checkedBox');
    this.musicText = this.add.text(config.width / 2 - 70, config.height / 2 - 50, 'Music Enabled', { fontSize: '24px' });

    this.musicButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.menuButton = new Button(this, config.width / 2, config.height / 2 + 150, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.updateAudio();

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const key = ['background'];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
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
  }
}
