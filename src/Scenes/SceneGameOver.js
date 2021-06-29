import 'phaser';
import ScrollingBackground from "../Objects/ScrollingBackground";


export default class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: "SceneGameOver" });
    }
    preload() {
        this.load.audio("sndBtnDown", "src/assets/shooter/sndBtnDown.wav");
        this.load.audio("sndBtnOver", "src/assets/shooter/sndBtnOver.wav");

        this.load.image("sprBg0", "src/assets/shooter/sprBg0.png");
        this.load.image("sprBg1", "src/assets/shooter/sprBg1.png");

        this.load.image("sprBtnRestart", "src/assets/shooter/sprBtnRestart.png");
        this.load.image("sprBtnRestartDown", "src/assets/shooter/sprBtnRestartDown.png");
        this.load.image("sprBtnRestartHover", "src/assets/shooter/sprBtnRestartHover.png");
    }

    create() {
        this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnRestart"
        );

        this.btnRestart.setInteractive();

        this.btnRestart.on("pointerover", function() {
            this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
            this.sfx.btnOver.play(); // play the button over sound
        }, this);

        this.btnRestart.on("pointerout", function() {
            this.setTexture("sprBtnRestart");
        });

        this.btnRestart.on("pointerdown", function() {
            this.btnRestart.setTexture("sprBtnRestartDown");
            this.sfx.btnDown.play();
        }, this);

        this.btnRestart.on("pointerup", function() {
            this.btnRestart.setTexture("sprBtnRestart");
            this.scene.start("Game");
        }, this);

        this.backgrounds = [];
        for (var i = 0; i < 5; i++) {
            var keys = ["sprBg0", "sprBg1"];
            var key = keys[Phaser.Math.Between(0, keys.length - 1)];
            var bg = new ScrollingBackground(this, key, i * 10);
            this.backgrounds.push(bg);
        }
    }

    update() {
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }
}