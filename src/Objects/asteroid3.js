import Entity from "./Entities";

export default class Asteroid3 extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "asteroid3-anim", "Asteroid3");
        this.play("asteroid3-anim");

        this.body.velocity.y = Phaser.Math.Between(50, 100);
        this.body.velocity.x = Phaser.Math.Between(-50, 100);
    }
}