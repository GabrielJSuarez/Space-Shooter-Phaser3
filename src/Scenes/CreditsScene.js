import Phaser from 'phaser';
import config from '../Config/config';
import ScrollingBackground from '../Objects/ScrollingBackground';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const key = ['background'];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Gabriel Suárez', { fontSize: '26px', fill: '#fff' });
    this.createdText = this.add.text(0, 0, 'Created With: Phaser 3', { fontSize: '26px', fill: '#fff' });
    this.baseDesignText = this.add.text(0, 0, 'Base Design By: Phaser 3 Library', { fontSize: '26px', fill: '#fff' });
    this.assetsText = this.add.text(0, 0, 'Sound Effects: Phaser 3 Library', { fontSize: '26px', fill: '#fff' });
    this.musicText = this.add.text(0, 0, 'Music: Dafunk - Hardcore Power (DMCA FREE)', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    const displayCenter = (text, duration, delay, value = 0, title = null) => {
      Phaser.Display.Align.In.Center(
        text,
        this.zone,
      );
      if (value !== 0) text.setY(value);
    };

    displayCenter(this.creditsText, 3000, 1000);
    displayCenter(this.madeByText, 8000, 2000, 1000);
    displayCenter(this.createdText, 8000, 4000, 1200);
    displayCenter(this.baseDesignText, 8000, 6000, 1400);
    displayCenter(this.assetsText, 8000, 8000, 1600);
    displayCenter(this.musicText, 8000, 10000, 1800, 'Title');

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: () => this.destroy
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: () => this.destroy
    });

    this.createdTextTweens = this.tweens.add({
      targets: this.createdText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 2000,
      onComplete: () => this.destroy
    });

    this.musicTextTweens = this.tweens.add({
      targets: this.baseDesignText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 3000,
      onComplete: () => this.destroy
    });

    this.musicTextTweens = this.tweens.add({
      targets: this.assetsText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 4000,
      onComplete: () => {
        this.destroy
        this.scene.start('Title');
      }
    });
  }
}