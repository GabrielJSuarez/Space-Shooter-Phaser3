import 'phaser';
import config from '../Config/config';
import ScrollingBackground from "../Objects/ScrollingBackground";

export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
  }

  create () {
    this.backgrounds = [];
    for (let i = 0; i < 5; i++) {
      let key = ["background"];
      let bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Gabriel Suárez', { fontSize: '26px', fill: '#fff' });
    this.createdText = this.add.text(0, 0, 'Created With: Phaser 3', { fontSize: '26px', fill: '#fff' });
    this.baseDesignText = this.add.text(0, 0, 'Base Design By: Phaser 3 Library', { fontSize: '26px', fill: '#fff' });
    this.assetsText = this.add.text(0, 0, 'Sound Effects: Phaser 3 Library', { fontSize: '26px', fill: '#fff' });
    this.musicText = this.add.text(0, 0, 'Music: Dafunk - Hardcore Power (DMCA FREE)', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
        this.createdText,
        this.zone
    );

    Phaser.Display.Align.In.Center(
        this.baseDesignText,
        this.zone
    );

    Phaser.Display.Align.In.Center(
        this.assetsText,
        this.zone
    );

    Phaser.Display.Align.In.Center(
        this.musicText,
        this.zone
    );

    this.madeByText.setY(1000);
    this.createdText.setY(1200);
    this.baseDesignText.setY(1400);
    this.assetsText.setY(1600);
    this.musicText.setY(1800);

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
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this)
    });

    this.createdTextTweens = this.tweens.add({
      targets: this.createdText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 2000,
      onComplete: function () {
        this.createdText.destroy;
        this.scene.start('Title');
      }.bind(this)
    });

    this.baseDesignTextTweens = this.tweens.add({
      targets: this.baseDesignText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 3000,
      onComplete: function () {
        this.baseDesignText.destroy;
        this.scene.start('Title');
      }.bind(this)
    });

    this.assetsTextTweens = this.tweens.add({
      targets: this.assetsText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 4000,
      onComplete: function () {
        this.assetsText.destroy;
        this.scene.start('Title');
      }.bind(this)
    });

    this.musicTextTweens = this.tweens.add({
      targets: this.musicText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 5000,
      onComplete: function () {
        this.musicText.destroy;
        this.scene.start('Title');
      }.bind(this)
    });
  }
};