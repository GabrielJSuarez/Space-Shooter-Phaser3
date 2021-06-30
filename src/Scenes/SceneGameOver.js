import 'phaser';
import ScrollingBackground from "../Objects/ScrollingBackground";
import Button from "../Objects/Button";
import config from "../Config/config";


export default class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: "SceneGameOver" });
    }

    create() {
        this.title = this.add.text(this.game.config.width * 0.5, 128, "GIT GUD SCRUB", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.restartButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Restart', 'Game');

        this.menuButton = new Button(this, config.width/2, config.height/2 + 150, 'blueButton1', 'blueButton2', 'Menu', 'Title');

        this.backgrounds = [];
        for (let i = 0; i < 5; i++) {
            let key = ["background"];
            let bg = new ScrollingBackground(this, key, i * 10);
            this.backgrounds.push(bg);
        }
    }
}