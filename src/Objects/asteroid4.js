import Entity from "./Entities";

export default class Asteroid4 extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "asteroid4-anim", "Asteroid4");
        this.play("asteroid4-anim");

        this.body.setVelocityX(Phaser.Math.Between(100, 200));

        this.body.setVelocityY(Phaser.Math.Between(100, 200));
    }
}