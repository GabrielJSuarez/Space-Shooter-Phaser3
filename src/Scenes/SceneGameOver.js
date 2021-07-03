import Phaser from 'phaser';
import ScrollingBackground from '../Objects/ScrollingBackground';
import Button from '../Objects/Button';
import config from '../Config/config';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 100, 'GIT GUD SCRUB', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.name = this.add.text(this.game.config.width * 0.3, 200, `User: ${localStorage.getItem('user')}`, {
      fontFamily: 'monospace',
      fontSize: 28,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.name.setOrigin(0.5);

    this.hiScore = this.add.text(this.game.config.width * 0.7, 200, `score: ${localStorage.getItem('score')}`, {
      fontFamily: 'monospace',
      fontSize: 28,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.hiScore.setOrigin(0.5);

    this.restartButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Restart', 'Game');

    this.menuButton = new Button(this, config.width / 2, config.height / 2 + 150, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const key = ['background'];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }
}