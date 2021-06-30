import Entity from "./Entities";

export default class Asteroid3 extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "asteroid2-anim", "Asteroid2");
        this.play("asteroid2-anim");

        this.body.velocity.y = Phaser.Math.Between(50, 100);
        this.body.velocity.x = Phaser.Math.Between(-50, 100);
    }
}