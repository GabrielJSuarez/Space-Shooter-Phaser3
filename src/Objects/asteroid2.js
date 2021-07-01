import Entity from "./Entities";

export default class Asteroid2 extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "asteroid2-anim", "Asteroid2");
        this.play("asteroid2-anim");

        this.body.setVelocityX(Phaser.Math.Between(100, 200));

        this.body.setVelocityY(Phaser.Math.Between(100, 200));
    }
}