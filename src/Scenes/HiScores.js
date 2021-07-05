import Phaser from 'phaser';
import ScrollingBackground from '../Objects/ScrollingBackground';
import asyncScores from '../Objects/asyncScores';
import getDataFromStorage from '../Objects/localStorage';

const myDiv = document.querySelector('.textDiv');
const setBtn = document.querySelector('#submit-btn');

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('HiScores');
  }

  create() {
    myDiv.style.display = 'flex';

    // Leaderboard Title
    this.title = this.add.text(this.game.config.width * 0.5, 30, 'Hall Of Fame', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
    getDataFromStorage.getUser() || getDataFromStorage.setUser();

    setBtn.addEventListener('click', () => {
      const userName = document.querySelector('#username').value;
      const newUser = userName || getDataFromStorage.getUser();
      if (newUser) getDataFromStorage.setUser(newUser);
      myDiv.style.display = 'none';
      this.scene.start('Game');
    });

    // Render scores in the scene
    const renderBoard = (scores) => {
      let separation = 30;
      for (let i = 0; i < scores.length; i += 1) {
        this.name = this.add.text(this.game.config.width * 0.3, 100 + separation, `${i + 1} - User: ${scores[i].user}`, {
          fontFamily: 'monospace',
          fontSize: 28,
          fontStyle: 'bold',
          color: '#ffffff',
          align: 'center',
        });
        this.name.setOrigin(0.5);

        this.hiScore = this.add.text(this.game.config.width * 0.7, 100 + separation, `score: ${scores[i].score}`, {
          fontFamily: 'monospace',
          fontSize: 28,
          fontStyle: 'bold',
          color: '#ffffff',
          align: 'center',
        });
        this.hiScore.setOrigin(0.5);
        separation += 70;
      }
    };

    // Get the first 5 high scores in order
    const sortResults = (scores) => scores.sort((a, b) => (a.score > b.score ? -1 : 1)).slice(0, 5);

    asyncScores.getAllScores()
      .then((data) => {
        const results = data.result;
        const sortedResults = sortResults(results);
        // Call the render function
        renderBoard(sortedResults);
      })
      .catch((error) => error);

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const key = ['background'];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }
}