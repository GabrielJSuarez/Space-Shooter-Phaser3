import 'phaser';
import ScrollingBackground from "../Objects/ScrollingBackground";
import Button from "../Objects/Button";
import config from "../Config/config";
import asyncScores from "../Objects/asyncScores";

export default class TitleScene extends Phaser.Scene {
    constructor () {
        super('HiScores');
    }
    create() {
        // Leaderboard Title
        this.title = this.add.text(this.game.config.width * 0.5, 30, "Hall Of Fame", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        // Get/set user on a local session
        const setUser = (user = 'Anonymous') => localStorage.setItem('user', user);

        const getUser = () => localStorage.getItem('user');

        getUser() || setUser();

        // Set / Change your username
        const changeName = () => {
            // eslint-disable-next-line no-alert
            const newUser = prompt('Enter your User Name', `${getUser()}`) || getUser();
            if (newUser) setUser(newUser);
        };

        // Username's button
        // Change Name
        const nameButton = this.add.sprite(config.width/2 - 150, config.height/2 + 200, 'blueButton2');
        this.add.text(config.width/2 - 225, config.height/2 + 185, 'Set Name', { fontSize: '32px', fill: '#fff' });

        // Button interactions
        nameButton.setInteractive();
        nameButton.on('pointerdown',() => { changeName(); });

        nameButton.on('pointerover',() => nameButton.setTexture('blueButton2'));

        nameButton.on('pointerout',() => nameButton.setTexture('blueButton1'));

        // Render scores in the scene
        const renderBoard = (scores) => {
            let separation = 30;
            for (let i = 0; i < scores.length; i++) {
                this.name = this.add.text(this.game.config.width * 0.3, 100 + separation, `${i + 1} - ${scores[i].user}`, {
                    fontFamily: 'monospace',
                    fontSize: 28,
                    fontStyle: 'bold',
                    color: '#ffffff',
                    align: 'center'
                });
                this.name.setOrigin(0.5);

                this.hiScore = this.add.text(this.game.config.width * 0.7, 100 + separation, `score: ${scores[i].score}`, {
                    fontFamily: 'monospace',
                    fontSize: 28,
                    fontStyle: 'bold',
                    color: '#ffffff',
                    align: 'center'
                });
                this.hiScore.setOrigin(0.5);
                separation += 70;
            }
        };

        // Get the first 5 high scores in order
        const sortResults = scores => scores.sort((a, b) => (a.score > b.score ? -1 : 1)).slice(0, 5);

        asyncScores.getAllScores()
            .then(data => {
                let results = data.result;
                let sortedResults = sortResults(results);
                // Call the render function
                renderBoard(sortedResults);
            })
            .catch(error => console.log('Error', error));

        this.menuButton = new Button(this, config.width/2 + 150, config.height/2 + 200, 'blueButton1', 'blueButton2', 'Menu', 'Title');

        this.backgrounds = [];
        for (let i = 0; i < 5; i++) {
            let key = ["background"];
            let bg = new ScrollingBackground(this, key, i * 10);
            this.backgrounds.push(bg);
        }
    }
}