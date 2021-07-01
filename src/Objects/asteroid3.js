import Entity from "./Entities";

export default class Asteroid3 extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "asteroid3-anim", "Asteroid3");
        this.play("asteroid3-anim");

        this.body.setVelocityX(Phaser.Math.Between(100, 200));

        this.body.setVelocityY(Phaser.Math.Between(100, 200));
    }
}